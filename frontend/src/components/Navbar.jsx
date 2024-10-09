import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Generate from "./Generate";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

export function Navbar() {
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleShowProfile = () => {
        navigate('/profile');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-slate-300 flex justify-between items-center px-4 h-14 ">
                <div className="logo-container hover:scale-110 flex gap-2 transition-transform">
                    <div className="logo font-bold md:text-2xl">
                        Lock
                        <span className="text-green-600">Craft </span>
                    </div>
                </div>

                {/* Hamburger Icon */}
                <button onClick={toggleMenu} className="block md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Navigation Links (visible on medium+ screens) */}
                <ul className="hidden md:flex md:gap-4 items-center">
                    <li className="flex gap-4 items-center">
                        <div className="flex gap-1 bg-green-400 rounded-2xl ring-white p-1 border-2 border-opacity-75 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link className="hover:font-bold transition-transform" target="_blank" to="https://github.com/MrJerif/LockCraft"> Github </Link>
                        </div>
                        <Link className="hover:font-bold transition-transform bg-slate-200 p-2 rounded-full border-slate-400 border" to="/generate"> Generate </Link>

                        {
                            isAuthenticated && (
                                <article className="profile cursor-pointer w-auto hover:scale-110 hover:font-bold transition-transform" >
                                    <img
                                        src={user.picture || require(`./assets/noprofile.jpg`)}
                                        alt='Profile'
                                        className="rounded-full w-12 h-12 object-cover"
                                        onClick={handleShowProfile}
                                    />
                                </article>
                            )
                        }
                    </li>
                </ul>

                {/* Mobile Menu (visible when toggled) */}
                {isMenuOpen && (
                    <ul className="absolute top-14 left-0 w-full bg-slate-200 flex justify-around items-center p-2 md:hidden">
                        <li className="gap-4 items-center">
                            <Link className="hover:font-bold transition-transform bg-slate-200 p-2 rounded-full border-slate-400 border" to="/generate"> Generate </Link>
                        </li>
                        <li>
                            {
                                isAuthenticated && (
                                    <article className="profile cursor-pointer w-auto hover:scale-110 hover:font-bold transition-transform" >
                                        <img
                                            src={user.picture || require(`./assets/noprofile.jpg`)}
                                            alt='Profile'
                                            className="rounded-full w-12 h-12 object-cover"
                                            onClick={handleShowProfile}
                                        />
                                    </article>
                                )
                            }
                        </li>
                        <li>
                            <div className="flex gap-1 bg-green-400 rounded-2xl ring-white p-1 border-2 border-opacity-75 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <Link className="hover:font-bold transition-transform" target="_blank" to="https://github.com/MrJerif/LockCraft"> Github </Link>
                            </div>
                        </li>
                    </ul>
                )}
            </nav>

            <Routes>
                <Route path="/generate" element={<Generate />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}
