import React from 'react';
import Hero from '../components/Home/Hero';
import Refreshing from '../components/Home/Refreshing';
import WhatIDo from '../components/Home/WhatIDo';
import Experience from '../components/Home/Experience';

const Home = () => {
    return (
        <div>
            <Hero />
            <Refreshing />
            <WhatIDo />
            <Experience />
        </div>
    );
};

export default Home;