import React from 'react';
import { useRef, useState, useEffect } from "react";
import PasswordTable from "./PasswordTable";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { StrengthMeter } from './StrengthMeter';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE;


export function Manager() {
    const [iconState, setIconState] = useState("hover-lashes"); //eye closed useState hook
    const [typeInput, setTypeInput] = useState("password");  // show password useState hook
    const ref = useRef();
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    });
    const [inputFields, setInputFields] = useState([]); // store additional Inputs 
    const [passwordArray, setPasswordArray] = useState([]);
    const [editMode, setEditMode] = useState(null);   // Track if we are editing
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);  // Button loading animation
    const [loadingPasswords, setLoadingPasswords] = useState(false);  // Password fetching animation
    const [search, setSearch] = useState(""); // Search passwords
    const searchKeys = ["site", "username"];

    // fetch passwords from database
    const getPasswords = async () => {
        setLoadingPasswords(true);
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("https://lockcraft-backend.onrender.com", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setPasswordArray([]);
                return;
            }

            // Retrieve and set passwords
            let passwords = await response.json();
            if (Array.isArray(passwords) && passwords.length > 0) {
                setPasswordArray(passwords);
            } else {
                console.log('No passwords found');
                // Set empty array if no passwords were found
                setPasswordArray([]);
            }
            // setPasswordArray(response.data);
        } catch (error) {
            console.log('Error fetching passwords!', error);
        } finally {
            setLoadingPasswords(false);
        }

    }

    // fetch passwords on component mount
    useEffect(() => {
        getPasswords();
    }, [])


    // Search Passwords 
    const handleSearch = (data) => {
        return data.filter((item) => {
            // Search site and username
            const matchSiteOrUsername = searchKeys.some(key =>
                item[key]?.toLowerCase().includes(search.toLowerCase())
            );

            // Search additonal fields (type and value)
            const matchAdditionalFields = item.additionalFields.some(field =>
                field.type?.toLowerCase().includes(search.toLowerCase()) ||
                field.value?.toLowerCase().includes(search.toLowerCase())
            );

            return matchSiteOrUsername || matchAdditionalFields;
        });
    }

    // Toggle show password
    const handleShowPassword = () => {
        setIconState(iconState === "morph-lashes-close" ? "morph-lashes" : "morph-lashes-close");
        setTypeInput(typeInput === "password" ? "text" : "password");
    }


    // function to add new inputs
    const handleInputAdd = () => {
        // add a new set of input fields
        setInputFields([...inputFields, { type: "", value: "", isSensitive: false }]);
    }

    // function to remove a particular input fields
    const handleRemoveField = (index) => {
        if (confirm('Are you sure you want to remove this field? This action cannot be undone.')) {
            const removeField = inputFields.filter((_, i) => i !== index);
            setInputFields(removeField);
        }
    }

    const handleInputChange = (index, e) => {
        const updatedFields = [...inputFields];
        updatedFields[index] = { ...updatedFields[index], [e.target.name]: e.target.value };
        setInputFields(updatedFields);
    }

    // handle sensitive checkbox
    const handleSensitiveChange = (index) => {
        const updatedFields = [...inputFields];
        updatedFields[index].isSensitive = !updatedFields[index].isSensitive;
        setInputFields(updatedFields);
    }

    // Save or Update password
    const handleSavePassword = async () => {
        // check input length
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {

            // Start loading animation
            setIsLoading(true);

            try {
                const token = await getAccessTokenSilently();

                // store duplicate values
                const existingPassword = passwordArray.find((item) =>
                    item.site === form.site &&
                    item.username === form.username &&
                    item.password === form.password
                )

                // check if values already exist and is not Edit mode
                if (existingPassword && !editMode) {
                    // toast
                    toast.error('Password already exists!', {
                        position: "top-center",
                        pauseOnFocusLoss: false,
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        theme: "light"
                    });
                } else if (editMode) {
                    // Update existing password
                    const updatedPassword = { ...form, additionalFields: inputFields, _id: editMode };
                    await fetch(`https://lockcraft-backend.onrender.com`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedPassword)
                    })
                    // Toast
                    toast.success('Password updated!', {
                        position: "top-center",
                        pauseOnFocusLoss: false,
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        theme: "light"
                    });

                    setPasswordArray((prev) =>
                        prev.map((password) =>
                            password._id === editMode ? updatedPassword : password
                        ))
                    setEditMode(null) // Reset edit mode after saving
                    // Reset the input elements
                    setForm({ site: "", username: "", password: "" });
                    // Reset additional fields to one empty set
                    setInputFields([]);
                } else {
                    const newPassword = { ...form, additionalFields: inputFields, id: uuidv4() };

                    await fetch("https://lockcraft-backend.onrender.com", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newPassword)
                    })
                    setPasswordArray([...passwordArray, newPassword]);

                    // Toast
                    toast.success('Password saved!', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        theme: "colored"
                    });

                    // Reset the input elements
                    setForm({ site: "", username: "", password: "" });
                    // Reset additional fields to one empty set
                    setInputFields([]);

                }
            } catch (error) {
                console.error("Error Saving password", error);
            } finally {
                // Stop loading animation 
                setIsLoading(false);
            }

        } else {
            // toast
            toast.warning("Please fill in all fields!", {
                position: "top-center",
                pauseOnFocusLoss: false,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                theme: "light"
            });
        }

    }


    // input fields 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Background-color with radial gradient */}
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <Navbar />

            <div className="container mx-auto max-w-4xl text-center py-5 overflow-y-auto scrollbar-hide">
                <h1 className="text-4xl font-bold hover:scale-110">
                    Lock<span className="text-green-600">Craft</span>
                </h1>
                <p className="text-green-900 text-lg text-center hover:scale-105 md:pb-3">
                    Crafting Your Security
                </p>

                {/* Input Form */}
                <div className="flex flex-col p-4 text-black md:gap-8 gap-3 items-center relative mx-2">

                    <span className='md:w-1/3 px-2 py-1 hover:scale-y-110 h-auto bg-white flex justify-between rounded-full items-center'>
                        <lord-icon
                            src="https://cdn.lordicon.com/wjyqkiew.json"
                            trigger="click"
                            colors="primary:#121331,secondary:#a39cf4"
                            style={{ "width": "25px", "height": "25px" }}
                        >
                        </lord-icon>
                        
                        <input
                            placeholder="Search Password..."
                            onChange={(e) => setSearch(e.target.value)}
                            name="search"
                            className="rounded-full w-full px-1"
                            type="text"
                        />

                    </span>

                    <input
                        placeholder="Enter URL"
                        value={form.site}
                        onChange={handleChange}
                        name="site"
                        className="rounded-xl border border-slate-500 w-full px-4 py-1 hover:scale-y-110 h-8"
                        type="text"
                    />

                    <div className="md:flex w-full justify-between gap-7">
                        <input
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            className="rounded-xl border border-slate-500 w-full px-4 py-1 hover:scale-y-110 h-8"
                            type="text"
                        />

                        <div className="relative md:w-2/4 md:py-0 py-2 mb-2">
                            <input
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                className="rounded-xl border border-slate-500 w-full px-4 py-1 hover:scale-y-110 h-8"
                                type={typeInput}
                            />
                            <span
                                className="absolute right-2 cursor-pointer"
                                onClick={handleShowPassword}
                                ref={ref}
                            >
                                <lord-icon
                                    className="show"
                                    src="https://cdn.lordicon.com/vfczflna.json"
                                    trigger="click"
                                    state={iconState}
                                ></lord-icon>
                            </span>

                            {/* Strength meter component */}
                            <StrengthMeter
                                password={form.password}
                            />
                        </div>
                    </div>

                    {/* Additional Input Fields */}
                    {inputFields.map((field, index) => (
                        <div key={index} className="md:flex w-full justify-between gap-2">
                            <label className='block'>Type</label>
                            <input
                                placeholder="e.g. Email"
                                value={field.type || ""}
                                onChange={(e) => handleInputChange(index, e)}
                                name="type"
                                className="rounded-xl border border-slate-500 md:w-1/2 w-full px-4 py-1 hover:scale-y-110 h-8"
                                type="text"
                                autoFocus
                            />

                            <label className='block'>Value</label>
                            <input
                                placeholder="yourmail@mail.com"
                                value={field.value || ""}
                                onChange={(e) => handleInputChange(index, e)}
                                name="value"
                                className="rounded-xl border border-slate-500 md:w-1/2 w-full px-4 py-1 hover:scale-y-110 h-8"
                                type={!field.isSensitive ? "text" : "password"}
                            />

                            <label htmlFor={`hide-${index}`} className='opacity-50 mx-1'>Hide</label>
                            <input id={`hide-${index}`} type="checkbox" checked={field.isSensitive} onClick={() => handleSensitiveChange(index)} className='hide cursor-pointer' />
                            <span className='mx-4 md:mx-1'>
                                <lord-icon
                                    className="deleteIcon"
                                    onClick={() => handleRemoveField(index)}
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                </lord-icon>
                            </span>
                        </div>
                    ))}

                    {/* Add More Button */}
                    <div className="flex justify-center items-center bg-zinc-400 rounded-full px-3 w-fit hover:bg-zinc-700 text-white hover:scale-y-110 gap-1 border border-slate-900 absolute left-5 bottom-12 my-3">
                        <button onClick={handleInputAdd}>Add More...</button>
                    </div>

                    {/* Save Password Button */}
                    <button
                        className="flex justify-center items-center bg-slate-500 rounded-full px-6 py-1 w-fit hover:bg-slate-700 text-white hover:scale-y-110 gap-1 border border-slate-900"
                        onClick={handleSavePassword}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span>
                                <lord-icon
                                    src="https://cdn.lordicon.com/ktsahwvc.json"
                                    trigger="loop"
                                    delay="200"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}
                                >
                                </lord-icon>
                            </span>
                        ) : (
                            <>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                ></lord-icon>
                                Save
                            </>
                        )}
                    </button>
                </div>

                {/* Show Passwords */}
                <div className="showPasswords flex flex-col justify-center items-center mx-4">
                    {loadingPasswords ?
                        <div className='md:mt-7 mt-3'>
                            <lord-icon
                                src="https://cdn.lordicon.com/ktsahwvc.json"
                                trigger="loop"
                                delay="200"
                                style={{ "width": "80px", "height": "80px", "paddingTop": "4px" }}
                            >
                            </lord-icon>
                        </div>
                        : passwordArray.length === 0 ? (
                            <div>No Passwords to show. Add Some!</div>
                        ) : (
                            <PasswordTable
                                passwordArray={handleSearch(passwordArray)}  // Pass filtered passwords
                                setPasswordArray={setPasswordArray}
                                setForm={setForm}
                                form={form}
                                setInputFields={setInputFields}
                                inputFields={inputFields}
                                getPasswords={getPasswords}
                                setEditMode={setEditMode}
                            // handleSearch={handleSearch(passwordArray)}
                            />
                        )}
                </div>
            </div>
        </>
    )
}