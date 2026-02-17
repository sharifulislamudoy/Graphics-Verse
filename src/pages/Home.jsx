import React from 'react';
import Hero from '../components/Home/Hero';
import Refreshing from '../components/Home/Refreshing';
import WhatIDo from '../components/Home/WhatIDo';
import Experience from '../components/Home/Experience';
import Recent from '../components/Home/Recent';
import ClientReview from '../components/Home/ClientReview';
import News from '../components/Home/News';

const Home = () => {
    return (
        <div>
            <Hero />
            <Refreshing />
            <WhatIDo />
            <Experience />
            <Recent />
            <ClientReview />
            <News />
        </div>
    );
};

export default Home;