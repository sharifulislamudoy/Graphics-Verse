import React from 'react';

const Footer = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15 '>
            <div className='rounded-[3rem] bg-[#DEF29B] p-15'>
                <div className='flex'>
                    <div className='md:w-3/4 flex flex-col justify-between'>
                        <h2 className='text-5xl font-semibold text-[#022F2B] text-left'>
                            Lets Start Making Something Amazing Together.
                        </h2>
                        <div className='flex items-center gap-40'>
                            <div>
                                <h4 className='text-3xl text-[#022F2B] font-semibold'>Email</h4>
                                <p className='text-gray-600 text-xl mt-5'>contact@selaraswp.com</p>
                            </div>
                            <div>
                                <h4 className='text-3xl text-[#022F2B] font-semibold'>Phone</h4>
                                <p className='text-gray-600 text-xl mt-5'>+62 8901234567</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className='mt-8 px-10 py-3 bg-[#FF7536] text-white font-semibold rounded-full text-lg shadow-md hover:bg-[#012F2B] hover:text-[#FF7536] transition-all'>
                                Start A Project
                            </button>
                        </div>
                        <ul className='mt-15'>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>Home</li>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>About</li>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>Services</li>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>Portfolio</li>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>Pricing</li>
                            <li className='text-gray-600 text-xl mt-3 ml-15'>Testimonials</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h5 className=' text-xl mt-10 font-semibold text-[#022F2B]' >COPYRIGHT © ZOROX 2025. ALL RIGHTS RESERVED</h5>
                </div>
            </div>

        </div>
    );
};

export default Footer;