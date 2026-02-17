import React from 'react';
import image1 from '../../assets/img-work1.png'
import image2 from '../../assets/img-work2.png'
import image3 from '../../assets/img-work3.png'
import image4 from '../../assets/img-work4.png'
import image5 from '../../assets/img-work5.png'
import image6 from '../../assets/img-work6.png'

const Recent = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15'>
            <h2 className='text-6xl font-semibold text-[#022F2B]'>Recent Works</h2>
            <p className='text-gray-600 text-xl mt-5 md:w-[60%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <div className='grid grid-cols-3 gap-8 mt-10'>
                <div className='flex flex-col'>
                    <div>
                        <img src={image1} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Crafting seamless and intuitive digital experiences.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image2} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Telling captivating stories through art and visuals.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image3} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Shaping a brand that stands out and resonates.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image4} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Revolutionizing  user with innovative designs.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image5} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Creating a logo that speaks louder than words.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <img src={image6} alt="vision image" className='rounded-4xl w-full h-auto' />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-3xl font-semibold '>Designing user-focused and accessible interfaces.</h4>
                        <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ed do.</p>
                        <button className='text-[#FF7537] font-semibold text-xl mt-5'>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Recent;