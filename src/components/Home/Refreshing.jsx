import React from 'react';
import image from '../../assets/img-vision.png'
import CountUp from 'react-countup';

const Refreshing = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15 '>
            <div className='rounded-[3rem] bg-[#DEF29B] p-15'>
                <div className='grid grid-cols-2 '>
                    <div className=''>
                        <h2 className='text-5xl font-semibold text-[#022F2B]'>Creative Design with Refreshing Ideas</h2>
                    </div>
                    <div className='space-y-13'>
                        <div className='flex justify-between items-center  gap-15 '>
                            <div>
                                <img src={image} alt="vision image" className='rounded-2xl 
                                w-[500px] h-auto' />
                            </div>
                            <div>
                                <h4 className='text-3xl font-semibold '>Mission</h4>
                                <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center  gap-15 '>
                            <div>
                                <img src={image} alt="vision image" className='rounded-2xl 
                                w-[500px] h-auto' />
                            </div>
                            <div>
                                <h4 className='text-3xl font-semibold '>Vision</h4>
                                <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-4 grid-cols-2 mt-20'>
                    <div>
                        <p className='text-8xl text-[#FF7537] font-semibold'>
                            <CountUp start={0} end={80} duration={5} />+
                        </p>
                        <p className='text-xl'>Complete Project</p>
                    </div>
                    <div>
                        <p className='text-8xl text-[#FF7537] font-semibold'>
                            <CountUp start={0} end={10} duration={5} />+
                        </p>
                        <p className='text-xl'>Years Experience</p>
                    </div>
                    <div>
                        <p className='text-8xl text-[#FF7537] font-semibold'>
                            <CountUp start={0} end={75} duration={5} />+
                        </p>
                        <p className='text-xl'>Happy Clients</p>
                    </div>
                    <div>
                        <p className='text-8xl text-[#FF7537] font-semibold'>
                            <CountUp start={0} end={4} duration={5} />+
                        </p>
                        <p className='text-xl'>Awards Winning</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Refreshing;