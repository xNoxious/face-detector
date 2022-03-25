import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2vh' }}>
                <Logo />
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                <Logo />
            </nav>
        );
    }
}

export default Navigation;