import useCurrentUser from "../../hooks/useUser";
import { Link } from "react-router-dom";
import React from "react";

export default function ProfileIcon() {
    const user = useCurrentUser();

    // Sign In Button
    if (!user)
        return (<Link to="/login" className='nav-link'>Sign in</Link>);

    return (
        <Link to="/profile" className='nav-link'>
            <img
                referrerPolicy="no-referrer"
                src={user.photoURL ? user.photoURL : '/#/logo512.png'}
                alt={user.displayName ? user.displayName : 'Profile'}
                width={40}
                height={40}
                className={"rounded-circle ms-2 me-2"}
            />
        </Link>
    );
}