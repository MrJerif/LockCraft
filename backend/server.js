const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');
dotenv.config();
const bodyparser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const { type } = require('os');
const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
const mongoUri = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://lockcraft.onrender.com', 'http://localhost:5173'];


// Auth0 configuration
const checkJwt = auth({
    audience: audience,
    issuerBaseURL: `https://${domain}/`,
    tokenSigningAlg: 'RS256'
});

// CORS Middleware
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.set('trust proxy', true);

// Handle pre-flight requests
app.options('*', cors());

// Middleware
app.use(bodyparser.json());



// MongoDB connection
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error ', err))

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to mongoDB');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error', err);
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from mongoDB');
    })


// Define Encryption settings 
const algorithm = 'aes-256-cbc';  // Encryption algorithm
const secretKey = process.env.ENCRYPTION_KEY;  // Key for encryption
const iv = crypto.randomBytes(16);   // Initialization vector

// Encrypt function
function handleEncrypt (text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;  // Include IV with the encrypted data
}

// Decrypt function
function handleDecrypt (text) {
    const [ivText, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(ivText, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Password Schema
const PasswordSchema = new mongoose.Schema({
    site: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    additionalFields: [{
        type: { type: String }, 
        value: { type: String }, 
        isSensitive: { type: Boolean, default: false }
    }],
    userId: {type: String, require: true}
});

const Password = mongoose.model('Password', PasswordSchema);


// Get password
app.get('/', checkJwt, async (req, res) => {
    try{
        const userId = req.auth.payload.sub  // Auth0 user ID( Get User ID from the token)
        const passwords = await Password.find({ userId });

        if(!passwords || passwords.length === 0) {
            return res.status(404).json({ message: 'No passwords found' });
        }

        // Decrypt each password and additional field before sending it
        const decryptedPasswords = passwords.map(p => ({
            ...p._doc, // Copy other fields
            site: handleDecrypt(p.site),
            username: handleDecrypt(p.username),
            password: handleDecrypt(p.password),  // Decrypt the main password
            additionalFields: p.additionalFields.map(field => ({
                type: handleDecrypt(field.type),
                // value: field.isSensitive ? handleDecrypt(field.value) : field.value,  // Decrypt if sensitive
                value: handleDecrypt(field.value),
                isSensitive: field.isSensitive    // Keep the isSensitive flag
            }))
        }))

        res.json(decryptedPasswords);
    } catch (error){
        console.log('Error fetching passwords', error);
        res.status(500).json({ message: `Error fetching passwords`, error});
    }
})

// Save password
app.post('/', checkJwt, async (req, res) => {
    const { site, username, password, additionalFields } = req.body;
    
    try {
        const encryptedSite = handleEncrypt(site);
        const encryptedUsername = handleEncrypt(username);
        const encryptedPassword = handleEncrypt(password);
        const userId = req.auth.payload.sub;
        // console.log('post request body:-- ', req.body);
        // console.log('User authentication:-- ', req.auth.payload.sub);
        const processedAdditionalFields = additionalFields.map(field => ({
            type: handleEncrypt(field.type),
            // value: field.isSensitive ? handleEncrypt(field.value) : field.value,      // Encrypt only if sensitive,
            value: handleEncrypt(field.value),
            isSensitive: field.isSensitive  // Keep the isSensitive flag
        }))

        const newPassword = new Password({
            site: encryptedSite,
            username: encryptedUsername,
            password: encryptedPassword,  
            additionalFields: processedAdditionalFields,  
            userId
        });
        await newPassword.save();
        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({message: 'Error saving passwords', error});
    }
})


// Update password
app.put('/', checkJwt, async (req, res) => {
    const { _id, site, username, password, additionalFields } = req.body;
    try {
        const userId = req.auth.payload.sub;
        const encryptedSite = handleEncrypt(site);
        const encryptedUsername = handleEncrypt(username);
        const encryptedPassword = handleEncrypt(password);
        const processedAdditionalFields = additionalFields.map(field => ({
            type: handleEncrypt(field.type),
            // value: field.isSensitive ? handleEncrypt(field.value) : field.value,      // Encrypt only if sensitive,
            value: handleEncrypt(field.value),
            isSensitive: field.isSensitive
        }))

        const updatedPassword = await Password.findOneAndUpdate(
            { _id, userId },   // Only update if the user owns the password
            { site: encryptedSite, username: encryptedUsername, password: encryptedPassword, additionalFields: processedAdditionalFields },
            { new: true }
        );

        if(!updatedPassword) {
            return res.status(404).json({ message: 'Password not found'});
        }

        res.json(updatedPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
})

// Delete password by ID
app.delete('/', checkJwt, async (req, res) => {
    const { _id } = req.body; // Take the ID from the request body

    try {
        const userId = req.auth.payload.sub  // Auth0 user ID
        const deletedPassword = await Password.findOneAndDelete({ _id, userId });

        if (!deletedPassword) {
            return res.status(404).json({ message: `Password not found` });
        }
        
        res.json({ message: `Password deleted successfully` });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: `Error deleting password`, error });
    }
})

// Start the server 
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
