import React from 'react';
import { motion } from 'framer-motion'

const Experience = () => {

    const skills = [
        { name: "Graphic Designer", value: 92 },
        { name: "UI/UX", value: 88 },
        { name: "Branding", value: 80 },
        { name: "Web Development", value: 72 },
    ];



    return (
        <div className='px-4 py-4 md:px-6 w-full mt-15 '>
            <div className='rounded-[3rem] bg-[#DEF29B] p-15'>
                <h2 className='text-6xl font-semibold text-[#022F2B] text-center'>My Experience and Skills</h2>
                <div className='flex justify-between gap-20 mt-20'>
                    <div className='w-full space-y-10'>
                        <div>
                            <p className='text-[#FF7537] text-xl'>2014-2016</p>
                            <h4 className='text-3xl font-semibold  mt-2'>Graphic Designer</h4>
                            <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                        <div>
                            <p className='text-[#FF7537] text-xl'>2017-2020</p>
                            <h4 className='text-3xl font-semibold  mt-2'>Website Designer</h4>
                            <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                        <div>
                            <p className='text-[#FF7537] text-xl'>2021-2025</p>
                            <h4 className='text-3xl font-semibold  mt-2'>UI/UX Designer</h4>
                            <p className='text-gray-600 text-xl mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                    </div>
                    <div className="w-full space-y-10 px-5">
                        {skills.map((skill, index) => (
                            <div key={index} className="space-y-6">
                                {/* Title */}
                                <h4 className="text-3xl font-semibold text-[#0f2a2a]">
                                    {skill.name}
                                </h4>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#FF7537] rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.value}%` }}
                                        transition={{ duration: 1.4, ease: "easeOut" }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;