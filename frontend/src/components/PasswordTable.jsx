import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuth0 } from '@auth0/auth0-react';

export default function PasswordTable({ passwordArray, setPasswordArray, setForm, setInputFields, setEditMode, getPasswords }) {

    const [iconState, setIconState] = useState("hover-lashes");
    const [showPassword, setShowPassword] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const [visibleFields, setVisibleFields] = useState({});


    // Color according password strength
    function getStrengthBarColor(strength) {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lightblue';
            case 5: return 'lightgreen';
            default: return 'gray';
        }
    }

    // Calculate strength of password
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 9) strength += 1;
        if (password.match(/[a-z]+/)) strength += 1;
        if (password.match(/[A-Z]+/)) strength += 1;
        if (password.match(/[0-9]+/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
        return strength;
    }

    // Toggle show password
    const handleShowPassword = () => {
        setIconState(iconState === "morph-lashes-close" ? "morph-lashes" : "morph-lashes-close");
        setShowPassword(!showPassword);
    }

    // Toggle show Field Values for each field
    const handleShowFieldValues = (fieldIndex) => {
        setVisibleFields((prev) => ({
            ...prev,
            [fieldIndex]: !prev[fieldIndex]  // Toggle visibility for specific field
        }))
    }


    // handle copy function 
    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);

        // show toast
        toast('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }


    //delete password
    const handleDeletePassword = async (id) => {
        let confirmation = confirm('Are you sure you want to remove this password? This action cannot be undone.')
        if (confirmation) {
            const token = await getAccessTokenSilently();
            try {
                const response = await fetch("https://lockcraft-backend.onrender.com", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ _id: id })
                });

                if (response.ok) {
                    setPasswordArray(passwordArray.filter(item => item._id !== id));
                    toast.success('Password deleted!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                    // Refresh the list after deletion
                    getPasswords();
                } else {
                    toast.error('Failed to delete password', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                }
            } catch (error) {
                toast.error('An error occurred!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        }
    }

    // Handle edit password
    const handleEditPassword = (password) => {
        setForm({
            site: password.site,
            username: password.username,
            password: password.password
        });
        setInputFields(password.additionalFields || []);
        // Set the current password being edited
        setEditMode(password._id);
    }

    return (
        <>
            <h2 className="font-bold text-xl py-4 hover:scale-110">Your Passwords</h2>
            {Array.isArray(passwordArray) && passwordArray.length > 0 && (
                passwordArray.map((item, index) => {
                    const strength = calculatePasswordStrength(item.password);
                    const menuColor = getStrengthBarColor(strength);

                    return (
                        <Menu as="div" className="relative inline-block text-left w-full max-w-3xl py-1 mx-2" key={item._id}>
                            <div>
                                <MenuButton className="flex justify-between w-full gap-x-1.5 rounded-xl bg-slate-200 px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-300 hover:scale-105"
                                    style={{ borderColor: menuColor, borderWidth: '1px', filter: `drop-shadow( 0 0 0 ${menuColor})` }}
                                >
                                    <div className="dropdown-Menu">
                                        <span className="font-semibold text-base">{item.site}</span>
                                        <div>{item.username}</div>
                                    </div>

                                    <div className="dropdown-Logo my-auto">
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                                    </div>
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute z-10 mt-2 w-full origin-top-right divide-y divide-slate-300 rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >

                                {/* Site */}
                                <div className="flex justify-between items-center p-2 hover:bg-slate-200">
                                    <span className="font-semibold text-base">Site:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700">{item.site}</span>
                                        <div className="copyIcon cursor-pointer" onClick={() => { handleCopyText(item.site) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                            </lord-icon>
                                        </div>
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="flex justify-between items-center p-2 hover:bg-slate-200">
                                    <span className="font-semibold text-base">Username:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700">{item.username}</span>
                                        <div className="copyIcon cursor-pointer" onClick={() => { handleCopyText(item.username) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                            </lord-icon>
                                        </div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="flex justify-between items-center p-2 hover:bg-slate-200">
                                    <span className="font-semibold text-base">Password:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700"
                                            style={{ textDecoration: "underline", textDecorationColor: menuColor}}
                                        >
                                            {showPassword ? item.password : "*".repeat(item.password.length)}
                                        </span>

                                        <div className="copyIcon cursor-pointer" onClick={() => { handleCopyText(item.password) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                            </lord-icon>
                                        </div>

                                        <span
                                            className='showIcon cursor-pointer'
                                            onClick={handleShowPassword}
                                        // ref={refPassword}
                                        >
                                            <lord-icon
                                                className="show"
                                                src="https://cdn.lordicon.com/vfczflna.json"
                                                trigger="click"
                                                state={iconState}
                                            ></lord-icon>
                                        </span>
                                    </div>
                                </div>

                                {/* Additional Fields */}
                                {item.additionalFields.map((field, idx) => (
                                    <div className="flex justify-between items-center p-2 hover:bg-slate-200" key={idx}>
                                        <span className="font-semibold text-base">{field.type}:</span>
                                        <div className="flex items-center gap-2">

                                            <span className="text-gray-700">
                                                {field.isSensitive && !visibleFields[idx] ? "*".repeat(field.value.length) : field.value}
                                            </span>
                                            <div className="copyIcon cursor-pointer" onClick={() => { handleCopyText(field.value) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                                </lord-icon>
                                            </div>

                                            {/* If isSensitive is true than show icon */}
                                            {field.isSensitive && (
                                                <span
                                                    className='showIcon cursor-pointer'
                                                    onClick={() => handleShowFieldValues(idx)}
                                                // ref={refField}
                                                >
                                                    <lord-icon
                                                        className="show"
                                                        src="https://cdn.lordicon.com/vfczflna.json"
                                                        trigger="click"
                                                        state={visibleFields[idx] ? "morph-lashes-close" : "morph-lashes"}
                                                    ></lord-icon>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Actions */}
                                <div className="actions items-center justify-center flex p-2">
                                    <div className="placeholder text-xs">
                                        <span className="opacity-50">Actions:</span>
                                        <div className="py-1 menu-password flex">
                                            <span className="px-2 cursor-pointer">
                                                <lord-icon
                                                    className="editIcon"
                                                    onClick={() => { handleEditPassword(item) }}
                                                    src="https://cdn.lordicon.com/zfzufhzk.json"
                                                    trigger="hover"
                                                    colors="primary:#121131,secondary:#242424,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#3a3347"
                                                    style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className="px-2 cursor-pointer">
                                                <lord-icon
                                                    className="deleteIcon"
                                                    onClick={() => { handleDeletePassword(item._id) }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px", paddingTop: "4px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </MenuItems>
                        </Menu>
                    )
                })
            )}
        </>
    );

}