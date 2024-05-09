import React from "react";
import logo from "../assets/logo.png"
import search from "../assets/search.png";
import bellicon from "../assets/bellicon.png";

const NavBar = () => {
    return(
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <img className="logo-container" src={logo} alt="congnizant-logo"/>
                </div>
                <div className="navbar-icons">
                    <div>
                        <img className="icon-container" src={search} alt="search-btn"/>
                    </div>	
                    <div>
                        <img className="icon-container bellicon" src={bellicon} alt="notifications"/>
                    </div>	
                </div>
            </div>
        </>
    )
}

export default NavBar