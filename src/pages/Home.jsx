import React from 'react';
import Hero from '../components/Home/Hero';
import WhatIDo from '../components/Home/WhatIDo';
import Experience from '../components/Home/Experience';
import Recent from '../components/Home/Recent';
import ClientReview from '../components/Home/ClientReview';
import About from '../components/Home/About';
import Contact from '../components/Home/Contact';
import Chatbot from '../components/Home/Chatbot';




const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <WhatIDo />
            <Experience />
            <Recent />
            <ClientReview />
            <Contact />
            <Chatbot />
        </div>
    );
};

export default Home;