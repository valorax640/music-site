import { useEffect, useState } from "react";
import { CONTACT } from '../constants';
import { motion } from 'framer-motion';
import FeedBackForm from './FeedBackForm'; // Import the new FeedbackForm component
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";

const Contact = () => {
    const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchLinks = async () => {
      const querySnapshot = await getDocs(collection(db, "links"));
      const linksData = querySnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().url; // Create an object with ids as keys
        return acc;
      }, {});
      setLinks(linksData);
      console.log(links);

    };

    fetchLinks();
  }, []);

    return (
        <div className="pb-10">
            <motion.h1
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="my-10 text-center text-4xl font-bold"
            >
                Get In Touch
            </motion.h1>

            <div className="flex lg:flex-row flex-col justify-around items-center lg:space-x-10">
                {/* Contact Info */}
                <div className="lg:text-start text-center tracking-tighter">
                    <motion.div
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: -100, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className='my-2'>
                            {CONTACT.address}
                        </p>

                        <p className='my-2'>
                            {CONTACT.phoneNo}
                        </p>

                        <p className='my-2'>
                            {CONTACT.email}
                        </p>
                    </motion.div>
                    <motion.div
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: -100, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className='text-2xl font-bold my-4 mt-8'>Follow me</p>
                        <div className=' flex gap-4 text-4xl justify-center lg:justify-start'>
                            {links.facebook && (
                                <a
                                    href={links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {links.instagram && (
                                <a
                                    href={links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram />
                                </a>
                            )}
                            {links.twitter && (
                                <a
                                    href={links.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaSquareXTwitter />
                                </a>
                            )}
                        </div>
                    </motion.div>

                </div>

                {/* Feedback Form */}
                <FeedBackForm />
            </div>
            <p className='mt-10 text-center text-xs lg:text-base'>© 2024 Pritam Roy. All rights reserved.</p>
        </div>
    );
};

export default Contact;
