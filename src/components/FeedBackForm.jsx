import { AiOutlineUser, AiOutlineMail, AiOutlineMessage, AiOutlinePhone, AiOutlineDown } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { countries } from "../constants/countries.js";

const FeedbackForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const form = useRef();
    const [selectedCountry, setSelectedCountry] = useState("IN"); // Default country
    const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
    const dropdownRef = useRef();

    const selectedCountryData = countries.find(
        (country) => country.code === selectedCountry
    );

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        // Create a merged phone number with country code and number
        const phoneInput = form.current['from_number'];
        const fullPhoneNumber = `${selectedCountryData.dialCode}  ${phoneInput.value}`;

        // Update the form field to include the full phone number
        phoneInput.value = fullPhoneNumber;

        emailjs
            .sendForm('service_0vvz7vi', 'template_7ka6nss', form.current, {
                publicKey: 'Dl3vgmL1nA-tmY9y8',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setIsModalOpen(true);
                    setTimeout(() => setIsModalOpen(false), 700);
                    // Clear all inputs
                    form.current.reset();
                },
                (error) => {
                    console.error('Email sending failed...', error);
                }
            )
            .finally(() => {
                // Reset the phone number field to avoid modifying the input
                phoneInput.value = phoneInput.value.replace(selectedCountryData.dialCode, '');
            });
    };

    return (
        <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-lg"
        >
            <form
                className="bg-transparent p-4 rounded-lg w-full space-y-4 backdrop-blur-md"
                onSubmit={sendEmail}
                ref={form}
            >
                {/* Name Input */}
                <div className="relative">
                    <AiOutlineUser className="absolute top-2 left-2 text-white text-lg sm:text-xl" />
                    <input
                        type="text"
                        id="name"
                        name="from_name"
                        required
                        placeholder="Enter your name*"
                        className="w-full pl-10 bg-transparent border-b border-white text-white p-2 focus:outline-none text-sm sm:text-base" // Responsive font size and padding
                    />
                </div>

                {/* Number Input */}
                <div className="relative">
                    <div className="flex items-center border-b border-white">
                        <AiOutlinePhone className="absolute top-2 left-2 text-white text-lg sm:text-xl" />
                        <div className="relative pl-10 flex items-center">
                            <button
                                type="button"
                                className="bg-transparent text-white focus:outline-none flex items-center text-sm sm:text-base" // Responsive text size
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            >
                                {selectedCountryData.dialCode}
                                <AiOutlineDown className="ml-2 text-white text-xs" />
                            </button>
                            {dropdownVisible && (
                                <ul
                                    ref={dropdownRef}
                                    className="absolute left-0 bg-black text-white border border-gray-700 mt-1 w-80 max-h-40 overflow-y-auto z-10"
                                >
                                    {countries.map((country) => (
                                        <li
                                            key={country.code}
                                            onClick={() => {
                                                setSelectedCountry(country.code);
                                                setDropdownVisible(false);
                                            }}
                                            className="px-2 py-1 hover:bg-gray-700 cursor-pointer text-sm sm:text-base"
                                        >
                                            {country.dialCode} {country.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            type="text"
                            id="number"
                            name="from_number"
                            placeholder="Enter your number"
                            className="w-full ml-2 bg-transparent text-white p-2 focus:outline-none text-sm sm:text-base" // Responsive font size and padding
                            inputMode="numeric"
                            maxLength="14"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                            }}
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                    <AiOutlineMail className="absolute top-2 left-2 text-white text-lg sm:text-xl" />
                    <input
                        type="email"
                        id="email"
                        name="from_email"
                        required
                        placeholder="Enter your email*"
                        className="w-full pl-10 bg-transparent border-b border-white text-white p-2 focus:outline-none text-sm sm:text-base" // Responsive font size and padding
                    />
                </div>

                {/* Message Input */}
                <div className="relative">
                    <AiOutlineMessage className="absolute top-2 left-2 text-white text-lg sm:text-xl" />
                    <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Enter your message*"
                        rows="3"
                        className="w-full pl-10 bg-transparent border-b border-white text-white p-2 focus:outline-none text-sm sm:text-base" // Responsive font size and padding
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-white text-gray-900 font-medium rounded-md py-2 sm:py-3 hover:bg-gray-200 text-sm sm:text-base"
                >
                    Send
                </button>



            </form>

            {/* Modal */}
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
                        <motion.div className="text-green-500 text-4xl">✔️</motion.div>
                        <h2 className="text-xl font-bold text-gray-900">Feedback Submitted!</h2>
                        <p className="text-gray-600">Thank you for reaching out to us.</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default FeedbackForm;
