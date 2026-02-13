import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;