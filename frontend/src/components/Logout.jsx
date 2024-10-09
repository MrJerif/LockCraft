import { useAuth0 } from "@auth0/auth0-react";
import React from 'react'

const Logout = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() =>  logout({ logoutParams: { returnTo: window.location.origin }}) }>
                Sign Out
            </button>
        )
    )
}

export default Logout