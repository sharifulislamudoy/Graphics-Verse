import React from 'react';
import Hero from '../components/Home/Hero';
import Refreshing from '../components/Home/Refreshing';
import WhatIDo from '../components/Home/WhatIDo';

const Home = () => {
    return (
        <div>
            <Hero />
            <Refreshing />
            <WhatIDo />
        </div>
    );
};

export default Home;