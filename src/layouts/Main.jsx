import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';

const Main = () => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;