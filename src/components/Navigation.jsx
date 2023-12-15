"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';
import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import {LoginModal} from "@/components/LoginModal";

const LoginModal = dynamic(() => import('@/components/LoginModal'), {
    ssr: false,
});

const Sidebar = dynamic(() => import('./Sidebar'), {
    ssr: false,
});




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
            {isLoginOpen && (<LoginModal isOpen={isLoginOpen} toggle={toggleLoginOpen} />)}
            {isSidebarOpen && (<Sidebar isOpen={isSidebarOpen} toggle={toggleSidebarOpen} />)}
            <Navbar isOpen={isSidebarOpen} toggle={toggleSidebarOpen} toggleLogin={toggleLoginOpen}/>
        </>
    );
};

export default Navigation;
