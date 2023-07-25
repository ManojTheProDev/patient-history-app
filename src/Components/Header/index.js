import React from "react";
import StraumannLogo from '../../assets/straumann_logo.jpg'

const Header = () => {
    return (<header>
        <div className="header-top">
            <span className="logo"><img src={StraumannLogo} alt="Straumann Logo"/></span>
            <span className="icon-clock"></span>
        </div>
        <div className="header-bottom">
            <span className="icon-hamburger"></span>
            <span className="icon-help"></span>
        </div>
    </header>)
}

export default Header;