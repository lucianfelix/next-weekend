"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {LoginModal} from "@/components/LoginModal";



const Navigation = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const toggleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleLoginOpen = () => {
        setIsLoginOpen(!isLoginOpen);
    };
    return (
        <>
            <LoginModal isOpen={isLoginOpen} toggle={toggleLoginOpen} />
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebarOpen} />
            <Navbar isOpen={isSidebarOpen} toggle={toggleSidebarOpen} toggleLogin={toggleLoginOpen}/>

        </>
    );
};

export default Navigation;
