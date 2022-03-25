import React from "react";
import './Logo.css';
import face from './icon.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <div style={{ width: '110px' }} className="Tilt br2 shadow-2">
                <div style={{ width: '110px', height: '110px' }}>
                    <img alt='logo' style={{ paddingTop: '15px' }} src={face} />
                </div>
            </div>
        </div>
    )
}

export default Logo;