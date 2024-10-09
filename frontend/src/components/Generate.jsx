import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { NavbarGenerate } from './NavbarGenerate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';

const Generate = () => {

    // useState hook to store length
    const [length, setLength] = useState(20);

    // useState hook to store generated password
    const [generatedPassword, setGeneratedPassword] = useState('');

    // State for checkboxes
    const [upperchecked, setUpperChecked] = useState(true);
    const [lowerchecked, setLowerChecked] = useState(true);
    const [numberchecked, setNumberChecked] = useState(true);
    const [symbolchecked, setSymbolChecked] = useState(true);

    // show sign up and login message if user is not Authenticated
    const { isAuthenticated } = useAuth0();

    //handle length of password
    const handleLength = (e) => {
        setLength(e.target.value);
    }

    // handle checkbox toggle
    const handleUpperCaseToggle = () => {
        setUpperChecked(!upperchecked);
    }

    const handleLowerCaseToggle = () => {
        setLowerChecked(!lowerchecked);
    }


    const handleNumberToggle = () => {
        setNumberChecked(!numberchecked);
    }

    const handleSymbolToggle = () => {
        setSymbolChecked(!symbolchecked);
    }

    // event handler for copy text
    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);

        // show toast
        toast.success('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }


    // useEffect hook to initialize the state variables when component mounts
    useEffect(() => {
        const upperCaseChecbox = document.getElementById('uppercase-checkbox');
        const lowerCaseCheckbox = document.getElementById('lowercase-checkbox');
        const numberChecbox = document.getElementById('number-checkbox');
        const symbolChecbox = document.getElementById('symbol-checkbox');

        setUpperChecked(upperCaseChecbox.checked);
        setLowerChecked(lowerCaseCheckbox.checked);
        setNumberChecked(numberChecbox.checked);
        setSymbolChecked(symbolChecbox.checked);
    }, []);

    // Generate random values
    const getRandomUpperCase = () => {
        const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return upperCaseChar[Math.floor(Math.random() * upperCaseChar.length)];
    }

    const getRandomLowerCase = () => {
        const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
        return lowerCaseChar[Math.floor(Math.random() * lowerCaseChar.length)];
    }

    const getRandomNumber = () => {
        const numbers = '0123456789';
        return numbers[Math.floor(Math.random() * numbers.length)];
    }

    const getRandomSymbol = () => {
        let symbols = '!@#$%^&*(){}[]/,.~=+-';
        let randomSymbol = Math.floor(Math.random() * symbols.length);
        return symbols[randomSymbol];
    }


    // generate password
    const handleGeneratePassword = (length, upperchecked, lowerchecked, numberchecked, symbolchecked) => {
        let password = [];
        let charSets = [];


        if (upperchecked) {
            charSets.push(() => getRandomUpperCase());
        }

        if (lowerchecked) {
            charSets.push(() => getRandomLowerCase());
        }

        if (numberchecked) {
            charSets.push(() => getRandomNumber());
        }

        if (symbolchecked) {
            charSets.push(() => getRandomSymbol());
        }

        if (charSets.length === 0) {
            toast.error('No checbox selected', {
                position: 'top-center',
                closeOnClick: true,
                autoClose: 2000,
                pauseOnHover: false
            });

            // for loop to generate password based on length given
        } else if (length <= 5) {
            toast.error('Password length must be atleast 6', {
                position: 'top-center',
                closeOnClick: true,
                autoClose: 2000,
                pauseOnHover: false
            });
        } else if (length >= 36) {
            toast.error('Password Length limit is 35', {
                position: 'top-center',
                closeOnClick: true,
                autoClose: 2000,
                pauseOnHover: false
            });
        } else {
            for (let i = 0; i < length; i++) {
                const randomCharSetIndex = Math.floor(Math.random() * charSets.length);
                const randomChar = charSets[randomCharSetIndex]();
                password.push(randomChar);
            }
            const passwordResult = password.join('');
            document.getElementById('result').textContent = passwordResult;

            // to copy the password
            setGeneratedPassword(passwordResult);
        }
    }


    return (
        <>
            {/* Toast Notifications */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="colored"
            />
            <ToastContainer />
    
            {/* Background color and blur effect */}
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] sm:h-[500px] w-[300px] sm:w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>
    
            {/* Navbar */}
            <NavbarGenerate />
    
            {/* Content for unauthenticated users */}
            {!isAuthenticated && (
                <div>
                    {/* Welcome message */}
                    <div className="flex justify-center text-center text-xl sm:text-3xl font-semibold mt-16 sm:mt-28 hover:scale-105 transition-transform">
                        <h2> Welcome to <b>Lock</b></h2>
                        <span className="text-green-600 font-bold hover:scale-110">Craft</span>
                    </div>
                    {/* Login message */}
                    <div className="flex justify-center text-center text-base sm:text-lg mt-4 hover:scale-105 transition-transform  my-3">
                        Log in to securely manage and access your passwords.
                    </div>
                    {/* Login button */}
                    <div className="flex justify-center mt-6 sm:mt-10">
                        <div className="border border-slate-600 px-4 py-2 bg-green-400 rounded-lg font-semibold hover:scale-110 hover:bg-gray-500 hover:text-white transition-transform">
                            <Login />
                        </div>
                    </div>
                </div>
            )}
    
            {/* Generate Password container */}
            <div className="container mx-auto relative p-4 my-16 lg:mt-32 max-w-lg bg-white border border-black-800 rounded-lg shadow-lg lg:relative lg:top-1/4 lg:mb-32">
                <h2 className="font-bold text-2xl text-center mb-6 hover:scale-110 transition-transform">Password Generator</h2>
    
                {/* Password display */}
                <div className="result-container flex justify-between items-center py-2 bg-blue-100 px-4 rounded-md mb-4">
                    <span id="result" className="text-lg"></span>
                    <button className="btn bg-slate-400 px-3 py-1 rounded-md text-white" id="clipboard" onClick={() => handleCopyText(generatedPassword)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id='copyIcon' viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
    
                {/* Settings for generating password */}
                <div className="settings">
                    <div className="setting flex justify-between items-center font-semibold text-slate-600 border-b py-2 text-lg">
                        <label>Password length</label>
                        <input type="number" id="length" className="w-16 text-center" min="4" max="20" value={length} onChange={handleLength} />
                    </div>
    
                    <div className="setting flex justify-between items-center font-semibold text-slate-600 border-b py-2 text-lg">
                        <label>Include uppercase letters</label>
                        <input type="checkbox" id="uppercase-checkbox" defaultChecked onClick={handleUpperCaseToggle} className='cursor-pointer' />
                    </div>
    
                    <div className="setting flex justify-between items-center font-semibold text-slate-600 border-b py-2 text-lg">
                        <label>Include lowercase letters</label>
                        <input type="checkbox" id="lowercase-checkbox" defaultChecked onClick={handleLowerCaseToggle} className='cursor-pointer' />
                    </div>
    
                    <div className="setting flex justify-between items-center font-semibold text-slate-600 border-b py-2 text-lg">
                        <label>Include numbers</label>
                        <input type="checkbox" id="number-checkbox" defaultChecked onClick={handleNumberToggle} className='cursor-pointer' />
                    </div>
    
                    <div className="setting flex justify-between items-center font-semibold text-slate-600 border-b py-2 text-lg">
                        <label>Include symbols</label>
                        <input type="checkbox" id="symbol-checkbox" defaultChecked onClick={handleSymbolToggle} className='cursor-pointer' />
                    </div>
                </div>
    
                {/* Generate Button */}
                <button className="block mx-auto bg-slate-500 rounded-full px-6 py-2 mt-6 text-white hover:bg-slate-700 hover:scale-110 transition-transform"
                    onClick={() => handleGeneratePassword(length, upperchecked, lowerchecked, numberchecked, symbolchecked)}
                    id="generate">
                    Generate
                </button>
            </div>
        </>
    )     
}

export default Generate