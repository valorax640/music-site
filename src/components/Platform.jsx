import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";


const Platform = () => {
    const iconVariants = (duration) => ({
        initial: { y: -10 },
        animate: {
            y: [10, -10],
            transition: {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            },
        },
    })

    const [links, setLinks] = useState({});

    useEffect(() => {
        const fetchLinks = async () => {
            const querySnapshot = await getDocs(collection(db, "playlist"));
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
        <div className='pb-10'>
            <motion.h1
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='my-20 text-center text-4xl font-bold'>Listen Me On</motion.h1>

            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{ duration: 1 }}
                className='flex flex-wrap items-center justify-evenly gap-4'>

                <motion.div
                    variants={iconVariants(3)}
                    initial="initial"
                    animate="animate"
                    className='rounded-xl border-4 border-neutral-800 p-4'>
                    {links.youtube && (
                        <a
                            href={links.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaYoutube className='text-7xl text-red-600' />
                        </a>
                    )}

                </motion.div>

                <motion.div
                    variants={iconVariants(5)}
                    initial="initial"
                    animate="animate"
                    className='rounded-xl border-4 border-neutral-800 p-4'>
                    {links.spotify && (
                        <a
                            href={links.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaSpotify className='text-7xl text-green-400' />
                        </a>
                    )}
                </motion.div>

                <motion.div
                    variants={iconVariants(3)}
                    initial="initial"
                    animate="animate"
                    className='rounded-xl border-4 border-neutral-800 p-4'>
                    {links.apple_music && (
                        <a
                            href={links.apple_music}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaApple className='text-7xl text-white-400' />
                        </a>
                    )}

                </motion.div>

            </motion.div>
            <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{ duration: 1 }}
                className="mt-20 flex justify-center">
                {links.prebook && (
                    <a
                        
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="flex items-center gap-2 px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                            Pre Book <MdBookmarkBorder size={20} />
                        </button>
                    </a>
                )}

            </motion.div>
        </div>
    )
}

export default Platform
