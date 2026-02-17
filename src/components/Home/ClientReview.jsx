import React from 'react';
import image1 from '../../assets/img-client1.png'
import image2 from '../../assets/img-client2.png'
import image3 from '../../assets/img-client3.png'
import image4 from '../../assets/img-client4.png'

const ClientReview = () => {
    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15 '>
            <div className='rounded-[3rem] bg-[#DEF29B] p-15'>
                <h2 className='text-6xl font-semibold text-[#022F2B] text-center'>What My Client Say</h2>
                <div className='grid grid-cols-2 gap-13 mt-20'>
                    <div className='flex items-center justify-center gap-10'>
                        <div>
                            <img src={image1} alt="" className='rounded-2xl w-[550px]' />
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>Visionary Studio</h4>
                            <div className='mt-3'>
                                <i className='text-gray-600 text-xl'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</i>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <div>
                            <img src={image2} alt="" className='rounded-2xl w-[550px]' />
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>Evoke Creations</h4>
                            <div className='mt-3'>
                                <i className='text-gray-600 text-xl'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</i>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <div>
                            <img src={image3} alt="" className='rounded-2xl w-[550px]' />
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>Design Mosaic</h4>
                            <div className='mt-3'>
                                <i className='text-gray-600 text-xl'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</i>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        <div>
                            <img src={image4} alt="" className='rounded-2xl w-[550px]' />
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>Canvas Edge</h4>
                            <div className='mt-3'>
                                <i className='text-gray-600 text-xl'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClientReview;