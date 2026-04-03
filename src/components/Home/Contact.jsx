import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TbBrandFiverr } from "react-icons/tb";

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({
        type: '', // 'success', 'error', 'loading'
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Please fill in all fields',
            });
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({
                type: 'error',
                message: 'Please enter a valid email address',
            });
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            return;
        }

        setStatus({
            type: 'loading',
            message: 'Sending message...',
        });

        try {
            const response = await fetch('https://grahic-verse-server.vercel.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: data.message || 'Message sent successfully!',
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                setStatus({
                    type: 'error',
                    message: data.message || 'Failed to send message',
                });
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus({
                type: 'error',
                message: 'Network error. Please try again later.',
            });
        }

        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div id="contact" className="px-4 py-4 md:px-6 w-full mt-15">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Header */}
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]"
                    variants={itemVariants}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5 md:w-[60%]"
                    variants={itemVariants}
                >
                    Have a project in mind? We'd love to hear from you. Send us a message
                    and we'll respond as soon as possible.
                </motion.p>

                {/* Two Column Layout - Form + Right Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                    {/* Left Column - Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        variants={containerVariants}
                    >
                        {/* Name Field */}
                        <motion.div className="mb-6" variants={itemVariants}>
                            <label
                                htmlFor="name"
                                className="block text-[#022F2B] font-semibold mb-2 text-sm sm:text-base"
                            >
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF7537] focus:ring-2 focus:ring-[#FF7537] focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-800"
                                placeholder="John Doe"
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div className="mb-6" variants={itemVariants}>
                            <label
                                htmlFor="email"
                                className="block text-[#022F2B] font-semibold mb-2 text-sm sm:text-base"
                            >
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF7537] focus:ring-2 focus:ring-[#FF7537] focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-800"
                                placeholder="john@example.com"
                            />
                        </motion.div>

                        {/* Subject Field */}
                        <motion.div className="mb-6" variants={itemVariants}>
                            <label
                                htmlFor="subject"
                                className="block text-[#022F2B] font-semibold mb-2 text-sm sm:text-base"
                            >
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF7537] focus:ring-2 focus:ring-[#FF7537] focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-800"
                                placeholder="Project Inquiry"
                            />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div className="mb-8" variants={itemVariants}>
                            <label
                                htmlFor="message"
                                className="block text-[#022F2B] font-semibold mb-2 text-sm sm:text-base"
                            >
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF7537] focus:ring-2 focus:ring-[#FF7537] focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-800 resize-none"
                                placeholder="Tell us about your project..."
                            />
                        </motion.div>

                        {/* Status Message */}
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-3 rounded-lg ${status.type === 'success'
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : status.type === 'error'
                                            ? 'bg-red-100 text-red-700 border border-red-300'
                                            : 'bg-blue-100 text-blue-700 border border-blue-300'
                                    }`}
                            >
                                {status.message}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className={`px-8 py-3 bg-[#FF7537] text-white font-semibold rounded-full hover:bg-[#022F2B] transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${status.type === 'loading' ? 'opacity-75' : ''
                                }`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status.type === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message →'
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Right Column - Related Content */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                    >

                        {/* Business Hours Card */}
                        <motion.div
                            className="rounded-3xl p-6 md:p-8 border border-gray-200"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <h3 className="text-xl font-semibold text-[#022F2B] mb-4">Business Hours</h3>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span className="font-medium">Closed</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links Card - Added Fiverr & Mail Icons */}
                        <motion.div
                            className="rounded-3xl p-6 md:p-8 border border-gray-200"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <h3 className="text-xl font-semibold text-[#022F2B] mb-4">Connect With Us</h3>
                            <div className="flex flex-wrap gap-4">
                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/merazahmed21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#FF7537] text-white rounded-full flex items-center justify-center hover:bg-[#022F2B] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/meraz_ahmed21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#FF7537] text-white rounded-full flex items-center justify-center hover:bg-[#022F2B] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                                    </svg>
                                </a>
                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#FF7537] text-white rounded-full flex items-center justify-center hover:bg-[#022F2B] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
                                    </svg>
                                </a>
                                {/* Fiverr Icon */}
                                <a
                                    href="https://fiverr.com/meraz_ahmed21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#FF7537] text-white rounded-full flex items-center justify-center hover:bg-[#022F2B] transition-colors"
                                >
                                    <TbBrandFiverr className='h-6 w-auto'/>
                                </a>
                                {/* Email (Mail) Icon */}
                                <a
                                    href="mailto:hello@graphic-verse.com"
                                    className="w-12 h-12 bg-[#FF7537] text-white rounded-full flex items-center justify-center hover:bg-[#022F2B] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;