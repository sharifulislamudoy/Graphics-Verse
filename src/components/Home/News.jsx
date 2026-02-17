import React from 'react';
import image1 from '../../assets/img-news1.png'

const News = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15'>
            <h2 className='text-6xl font-semibold text-[#022F2B]'>News & Articles</h2>
            <p className='text-gray-600 text-xl mt-5 md:w-[60%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <div className='grid grid-cols-2 gap-20 mt-10'>
                <div className='flex flex-col'>
                    <div>
                        <img src={image1} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Crafting seamless and intuitive digital experiences.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image1} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Shaping a brand that stands out and resonates.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;