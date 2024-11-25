import { useEffect, useState } from "react";
import logo from "../assets/kevinRushLogo.png"
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";


const Navbar = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchLinks = async () => {
      const querySnapshot = await getDocs(collection(db, "links"));
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
    <div>
      <nav className=' mb-20 flex items-center justify-between py-6'>
        <div className='flex flex-shrink-0 items-center'>
          <img className='mx-2 w-10' src={logo} alt='' />
        </div>
        <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
          
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
      </nav>
    </div>
  )
}

export default Navbar
