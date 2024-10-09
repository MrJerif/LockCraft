# LockCraft
## A Complete Password Manager
The Password Manager is a secure web application designed to help users manage their passwords efficiently. It allows users to save, retrieve, update, and delete passwords for various accounts securely. The application employs encryption to protect data and uses Auth0 for authentication, ensuring that only authorized users can access their information.

# Features:
## Password Manager
- User Authentication: Secure user login and authentication through Auth0.
  <img src='https://github.com/MrJerif/LockCraft/blob/main/public/img1.png?raw=true' alt='login' width="500px" heigh="500px">
  
- Password Storage: Save passwords and other information securly.
- Encryption: All passwords and sensitive data are encrypted before being stored in the database, enhancing security.
- User-specific Access: Each user's passwords are isolated, ensuring privacy and data protection.
- Editable Records: Update or delete existing passwords with ease.
  <img src='https://github.com/MrJerif/LockCraft/blob/main/public/img2.png?raw=true' alt='password-table' width="700px" heigh="700px">
  
- Search Functionality: Users can search for specific passwords by any value except password to quickly locate entries.
  <img src='https://github.com/MrJerif/LockCraft/blob/main/public/img4.png?raw=true' alt='search' width="700px" heigh="700px">
  
- Password Strength Checker: Integrated password strength checker that evaluates the strength of passwords as they are being created or updated.
- Visual Feedback(colored borders): Colored Border for each password entry indicates its strength, helping users to create secure passwords.
  <img src='https://github.com/MrJerif/LockCraft/blob/main/public/img3.png?raw=true' alt='Strength-checker' width="700px" heigh="700px">
  
- Responsive Design: The user interface is designed to work seamlessly on various devices.
  <img src='https://github.com/MrJerif/LockCraft/blob/main/public/img6.jpg?raw=true' alt='mobile-view' width="200px" heigh="200px">
  
- Password Generator: Generate strong and unique passwords based on your desired length and selected options.

 ## Security Features
- Data Encryption: Utilizes AES-256 encryption for storing information.
- JWT Authentication: Employs JSON Web Tokens (JWT) for secure authentication.
- CORS Support: Configured to allow requests only from trusted origins.
- Environment Variables: Use of Environment Variables to store sensitive information, enhancing security.

# Technologies Used:
## Frontend
- React for building the user interface and handling state management.
- Tailwind CSS for styling and layout.
- React Toastify for displaying notifications and alerts.
- UUID for generating unique identifiers.
## Backend
- Node.js: For building the backend server.
- Express: For handling HTTP requests and middleware.
- Mongoose: For MongoDB object modeling and schema definition.
- JWT: For secure user authentication.
- Crypto: For encrypting sensitive data.
- Auth0: For user authentication services.

# How the Project Works
1. Frontend: Built with React, the frontend communicates with the backend using RESTful API calls. It uses Auth0 for authentication and displays the user's passwords in a user-friendly manner.
2. Backend: Built with Express and Mongoose, the backend handles all CRUD operations (Create, Read, Update, Delete) for password records. It employs encryption to secure data before saving it to MongoDB.
3. Database: MongoDB is used to store user passwords securely. The application uses Mongoose to define schemas and interact with the database.
4. Encryption: Sensitive information is encrypted using AES-256 before storage. This ensures that even if the database is compromised, user data remains secure.
5. Search Functionality: The application allows users to search for passwords by any value except password, improving the user experience by making it easier to find specific entries.
6. Password Strength Checker: When adding or updating a password, the application evaluates the strength of the password. The visual feedback (colored borders) for each password entry indicates its strength, helping users to create secure passwords.
7. Deployment: The application is deployed on platform Render, allowing for easy accessibility.

# Step-by-Step Guide
### How to Log In
1. Open the application in your web browser.
2. Click on the "Login" button, which redirects you to the Auth0 login page.
3. Enter your credentials (email and password or use available Auth providers) and click "Log In".
4. After successful authentication, you will be redirected back to the application, where you can manage your passwords.

### How to Add a Password
1. Once logged in you will be navigated to the main dashboard.
2. Fill in the details, including the site name, username, and password.
3. If there are any additional fields, you can specify them and indicate if they are sensitive.
4. The password strength checker will evaluate the entered password and display its strength visually.
5. Click "Save" to store the password securely.

### How to View Passwords
1. On the dashboard, you will see a list of saved passwords(if any passwords were saved before).
2. Each entry will show the site name and username. Click on an entry to view more details.
3. Sensitive information will be encrypted and displayed appropriately.
4. The table entries will have borders colored according to the strength of the password:
    - Weak: Red border
    - Medium: Yellow border
    - Good: Light Blue border
    - Strong: Light Green border

### How to Update a Password
1. Find the password entry you want to update from the list or search it.
2. Click on the "Edit" button next to the entry.
3. Make the necessary changes and click "Save" to update the record.

### How to Delete a Password
1. Locate the password entry you wish to delete or search it.
2. Click on the "Delete" button next to the entry.
3. Confirm the deletion when prompted.

### How to Search for a Password
1. Use the search bar on the dashboard to search.
2. The list of passwords will dynamically filter to show only those that match the search criteria.

# Getting Started/ Installation:
### Step 1: Clone the repository:
* To run the project locally, follow these steps:
  - git clone https://github.com/MrJerif/LockCraft.git

### Step 2: Set up the Backend:
* Navigate to the backend folder.
  - cd backend
* Create a .env file and add the necessary environment variables:
  - AUTH0_DOMAIN=your_auth0_domain
  - AUTH0_AUDIENCE=your_auth0_audience
  - MONGO_URI=your_mongo_uri
  - ENCRYPTION_KEY=your_encryption_key
  - PORT=5000
* Install dependencies:
  - npm install

### Step 3: Run the Backend:
  - npm start

### Step 4: Set up the Frontend:
* Navigate to the frontend folder.
  - cd frontend
* Install dependencies:
  - npm install

### Step 5: Run the Frontend:
  - npm run dev

### Access the application
  - Open your web browser and navigate to http://localhost:5173.

# Acknowledgments
* Auth0 for authentication services
    - https://auth0.com/
* Express for the backend framework.
    - https://expressjs.com/
* Mongoose for MongoDB object modeling.
    - https://mongoosejs.com/
* React for building the user interface.
    - https://reactjs.org/


# Contributions:
Contributions are welcome! If you'd like to report a bug or suggest a feature, please open an issue or submit a pull request.
