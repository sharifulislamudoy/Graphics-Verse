import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';

const Main = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;