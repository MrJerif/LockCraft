import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import Logout from "./Logout";
import { NavbarGenerate } from "./NavbarGenerate";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
                <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

                <NavbarGenerate />
                <div className="profile p-8 m-2 w-full text-xl">
                    {user?.picture && <img src={user.picture}
                         alt={user?.name}
                         className="rounded-full w-32 h-32 object-cover z-10"
                    />}
                    <h2>Username: <span className="font-semibold">
                        {user?.name}
                    </span>
                    </h2>
                    <ul className="pl-6 md:auto list-none">
                        <li className="border-2 my-2 p-3">Email: <span className="font-semibold">
                            {user?.email}
                        </span>
                        </li>

                        <li className="border-2 my-2 p-3">
                            Nickname: <span className="font-semibold">{user?.nickname}</span>
                        </li>
                        <li className="border-2 my-2 p-3">
                            Sub: <span className="font-semibold">{user?.sub}</span>
                        </li>
                    </ul>
                    <button className="w-24 h-8 border rounded-xl m-2 bg-slate-300 hover:scale-105 transition-transform">
                        <Logout />
                    </button>
                </div>
            </>
        )
    )
}

export default Profile