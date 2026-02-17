import React from 'react';
import Hero from '../components/Home/Hero';
import Refreshing from '../components/Home/Refreshing';
import WhatIDo from '../components/Home/WhatIDo';
import Experience from '../components/Home/Experience';
import Recent from '../components/Home/Recent';
import ClientReview from '../components/Home/ClientReview';

const Home = () => {
    return (
        <div>
            <Hero />
            <Refreshing />
            <WhatIDo />
            <Experience />
            <Recent />
            <ClientReview />
        </div>
    );
};

export default Home;