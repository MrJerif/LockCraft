import React from 'react';
import { Link, Route, Routes } from "react-router-dom";

export function NavbarGenerate() {
    return (
        <>
            <nav className="bg-slate-300 flex justify-between items-center px-4 h-14 ">
                <div className="logo-container hover:scale-110 flex gap-2">
                    <div className="logo font-bold text-2xl">
                        Lock
                        <span className="text-green-600">Craft </span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="green" fill="none">
                        <path d="M3.43934 8.56066C3.87868 9 4.58579 9 6 9C7.41421 9 8.12132 9 8.56066 8.56066C9 8.12132 9 7.41421 9 6C9 4.58579 9 3.87868 8.56066 3.43934C8.12132 3 7.41421 3 6 3C4.58579 3 3.87868 3 3.43934 3.43934C3 3.87868 3 4.58579 3 6C3 7.41421 3 8.12132 3.43934 8.56066Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.4393 8.56066C15.8787 9 16.5858 9 18 9C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6C21 4.58579 21 3.87868 20.5607 3.43934C20.1213 3 19.4142 3 18 3C16.5858 3 15.8787 3 15.4393 3.43934C15 3.87868 15 4.58579 15 6C15 7.41421 15 8.12132 15.4393 8.56066Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.4393 20.5607C15.8787 21 16.5858 21 18 21C19.4142 21 20.1213 21 20.5607 20.5607C21 20.1213 21 19.4142 21 18C21 16.5858 21 15.8787 20.5607 15.4393C20.1213 15 19.4142 15 18 15C16.5858 15 15.8787 15 15.4393 15.4393C15 15.8787 15 16.5858 15 18C15 19.4142 15 20.1213 15.4393 20.5607Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.43934 20.5607C3.87868 21 4.58579 21 6 21C7.41421 21 8.12132 21 8.56066 20.5607C9 20.1213 9 19.4142 9 18C9 16.5858 9 15.8787 8.56066 15.4393C8.12132 15 7.41421 15 6 15C4.58579 15 3.87868 15 3.43934 15.4393C3 15.8787 3 16.5858 3 18C3 19.4142 3 20.1213 3.43934 20.5607Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 18H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18 12L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 15L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <ul>
                    <div className="navigation-contaiener">
                        <li className="flex gap-4 items-center">
                            <div className="flex gap-1 bg-green-400 rounded-2xl ring-white p-1 border-2 border-opacity-75 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <Link className="hover:font-bold" target="_blank" to="https://github.com/MrJerif/LockCraft"> Github </Link>
                            </div>
                            <Link className="hover:font-bold bg-slate-200 p-2 rounded-full border-slate-400 border transition-transform" to="/"> Manager </Link>
                        </li>
                    </div>
                </ul>


            </nav>
        </>
    )
}