import React from 'react';
import image1 from '../../assets/uiux.png'
import image2 from '../../assets/graphic-Design.png'
import image3 from '../../assets/Branding.png'
import image4 from '../../assets/Web-Design.png'
import image5 from '../../assets/Logo-Design.png'

const WhatIDo = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15 '>
            <h2 className='text-6xl font-semibold text-[#022F2B] text-center'>What I Do?</h2>
            <div className='grid grid-cols-3 gap-8 mt-10'>
                <div className='flex justify-between flex-col bg-white rounded-4xl p-10  gap-15 '>
                    <div>
                        <img src={image1} alt="vision image" className='rounded-2xl 
                                w-[70px] h-auto' />
                    </div>
                    <div>
                        <h4 className='text-3xl font-semibold '>UI/UX Design</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex justify-between flex-col bg-white rounded-4xl p-10  gap-15 '>
                    <div>
                        <img src={image2} alt="vision image" className='rounded-2xl 
                                w-[70px] h-auto' />
                    </div>
                    <div>
                        <h4 className='text-3xl font-semibold '>Graphic Design</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex justify-between flex-col bg-white rounded-4xl p-10  gap-15 '>
                    <div>
                        <img src={image3} alt="vision image" className='rounded-2xl 
                                w-[70px] h-auto' />
                    </div>
                    <div>
                        <h4 className='text-3xl font-semibold '>Branding</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex justify-between flex-col bg-white rounded-4xl p-10  gap-15 '>
                    <div>
                        <img src={image4} alt="vision image" className='rounded-2xl 
                                w-[70px] h-auto' />
                    </div>
                    <div>
                        <h4 className='text-3xl font-semibold '>Website Design</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex justify-between flex-col bg-white rounded-4xl p-10  gap-15 '>
                    <div>
                        <img src={image5} alt="vision image" className='rounded-2xl 
                                w-[70px] h-auto' />
                    </div>
                    <div>
                        <h4 className='text-3xl font-semibold '>Logo Design</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex justify-between flex-col bg-[#FF7537] rounded-4xl p-10  gap-15 '>
                    <div>
                        <p className='text-white text-xl'>Request for more</p>
                        <h4 className='text-3xl font-semibold text-white '>Have project?</h4>
                    </div>
                    <div>
                        <button className='px-10 py-3 bg-white text-black font-semibold rounded-full text-lg hover:bg-[#012F2B] hover:text-white transition-all'>
                            Let's Talk!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatIDo;