import React, { useEffect, useState } from "react";
import logo from '../assets/img/passionAirLogo.png';
import { Link } from "react-router-dom";
// react icons
import { FaXmark, FaBars } from "react-icons/fa6";

const SiteNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // set toggle menu 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100){
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    });

    // navitems array
    const navItems = [
        {link: "Home", path: "/home", id:"1"},
        {link: "Service", path: "/home", id:"2"},
        {link: "About", path: "/home", id:"3"},
        {link: "FAQ", path: "/home", id:"4"}
    ];
    

    return (
        <>
        <header className="w-full bg-white md:bg-transparent fixed top-0 right-0 z-50">
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-blue-400 duration-300" : ""}`}>
                <div className="flex justify-between items-center text-base gap-8 md:mx-24">
                    <Link to="/home">
                        <img src={logo} alt="logo" className="w-96 inline-block items-center"/>
                    </Link>
                    {/* nav items for large devices */}
                    <ul className="md:flex space-x-12 hidden">
                        {
                            // run npm i react-scroll to make the following work
                            navItems.map(({link, path, id}) => <Link to={path} offset={-100} key={id} className="block text-base text-gray900 hover:text-passionGreen first: font-medium">{link}</Link>)
                        }
                    </ul>
                    

                    {/* menu btn for only mogile devices */}
                    <div className="md:hidden">
                        {/* run "npm install react-icons --save" to get access to icons*/}
                        <button 
                        onClick={toggleMenu}
                        className="text-gray-600 focus:outline-none focus:text-gray-500">
                            {
                                isMenuOpen ? (<FaXmark className="h-6 w-6"/>) : (<FaBars className="h-6 w-6"/>)
                            }
                        </button>
                    </div>
                </div>
                {/* nav items for mobile devices only */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-passionBrown ${isMenuOpen ? "block fixed top-0 right-0 left-0": "hidden"}`}>
                    {
                        navItems.map(({link, path, id}) => <Link to={path} offset={-100} key={id} className="block text-base text-white hover:text-passionBeige first: font-medium">{link}</Link>)
                    }
                </div>
            </nav>
        </header>
        </>
    )
};

export default SiteNavBar