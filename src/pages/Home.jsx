import React from 'react';
import Hero from '../components/Home/Hero';
import WhatIDo from '../components/Home/WhatIDo';
import Experience from '../components/Home/Experience';
import Recent from '../components/Home/Recent';
import ClientReview from '../components/Home/ClientReview';
import News from '../components/Home/News';
import About from '../components/Home/about';


const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <WhatIDo />
            <Experience />
            <Recent />
            <ClientReview />
        </div>
    );
};

export default Home;