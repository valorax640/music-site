import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/DSC_9496.jpg";
import { motion } from "framer-motion";
import { TbActivityHeartbeat } from "react-icons/tb"; // Import WhatsApp icon
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";


const Hero = () => {
    const container = (delay) => ({
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: delay },
        },
    });

    const [links, setLinks] = useState({});

    useEffect(() => {
        const fetchLinks = async () => {
            const querySnapshot = await getDocs(collection(db, "beat"));
            const linksData = querySnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data().url; // Create an object with ids as keys
                return acc;
            }, {});
            setLinks(linksData);
            // console.log(links);

        };

        fetchLinks();
    }, []);

    return (
        <div className="pb-4 lg-mb-35">
            <div className="flex flex-wrap justify-evenly">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <motion.h1
                            variants={container(0)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="pb-8 text-5xl font-thin tracking-tight lg:mt-16 lg:text-8xl "
                        >
                            Nniiss
                        </motion.h1>
                        <motion.span
                            variants={container(0.3)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl lg:text-4xl tracking-tight text-transparent"
                        >
                            Music Producer
                        </motion.span>
                        <motion.p
                            variants={container(0.5)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="my-2 max-w-xl py-6 font-light tracking-tighter text-justify"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                        <motion.div
                            variants={container(0.7)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mb-10">
                            {links.beat && (
                                <a
                                    
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="flex items-center gap-2 px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                                        Vibe to my Beats <TbActivityHeartbeat size={20} />
                                    </button>
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 lg:p-8">
                    <div className="flex justify-center">
                        <motion.img
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1 }}
                            className="rounded-xl"
                            src={profilePic}
                            alt="profilePic"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
