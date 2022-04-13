import React from "react";
import Logo from "../Logo/Logo";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2vh' }}>
                <Logo />
                <ProfileIcon toggleModal={toggleModal} onRouteChange={onRouteChange} />
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