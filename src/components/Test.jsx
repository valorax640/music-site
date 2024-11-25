import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { motion } from "framer-motion";
import profilePic from "../assets/img.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageScale, setImageScale] = useState(1); // For bass animation effect
  const [music, setMusic] = useState([]); // Dynamically fetched songs
  const audioRef = useRef(null);

  // Fetch songs from Firestore
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songs = querySnapshot.docs.map((doc) => ({
          title: doc.data().title,
          src: doc.data().url,
        }));
        setMusic(songs);
      } catch (error) {
        console.error("Error fetching songs: ", error);
      }
    };

    fetchSongs();
  }, []);

  // Play/Pause functionality
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Seek to a specific time
  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle song duration
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Change to the next or previous song
  const changeSong = (direction) => {
    if (direction === "next") {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % music.length);
    } else if (direction === "prev") {
      setCurrentSongIndex(
        (prevIndex) => (prevIndex - 1 + music.length) % music.length
      );
    }

    setCurrentTime(0);

    setTimeout(() => {
      audioRef.current.load(); // Reload the new song
      audioRef.current.play(); // Start playing the new song
    }, 0);

    setIsPlaying(true); // Update the play/pause state
  };

  // Handle song selection from the list
  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);

    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
    }, 0);

    setIsPlaying(true);
  };

  // Bass animation effect based on current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setImageScale(1 + 0.05 * Math.sin(currentTime * Math.PI * 5));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentTime, isPlaying]);

  return (
    <motion.div
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 100, opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col sm:flex-row justify-around items-start gap-8 p-6 max-w-5xl mx-auto items-center"
    >
      

      {/* Music Player */}
      <div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-xl shadow-xl w-full sm:w-[30%] h-[450px] p-4">
        {music.length > 0 && (
          <>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => changeSong("next")}
              src={music[currentSongIndex].src}
            />
            <div className="flex flex-col h-full p-4 space-y-4">
              {/* Image Section */}
              <div className="flex justify-center items-center flex-grow">
                <img
                  src={profilePic}
                  alt="Album Cover"
                  className="rounded-full shadow-lg w-36 h-36 object-cover transition-all duration-300"
                  style={{
                    transform: `scale(${imageScale})`,
                  }}
                />
              </div>

              {/* Song Title */}
              <div className="text-white text-xl font-semibold text-center mb-2">
                {music[currentSongIndex].title}
              </div>

              {/* Time & Progress Bar */}
              <div className="text-white text-sm">
                <div className="flex justify-between">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full mt-2"
                />
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-6 text-white">
                <button
                  onClick={() => changeSong("prev")}
                  className="p-4 rounded-full"
                >
                  <FaBackward size={28} />
                </button>

                <button onClick={handlePlayPause} className="p-6 rounded-full">
                  {isPlaying ? <FaPause size={36} /> : <FaPlay size={36} />}
                </button>

                <button
                  onClick={() => changeSong("next")}
                  className="p-4 rounded-full"
                >
                  <FaForward size={28} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Scrollable Song List */}
      <div className="bg-white bg-opacity-30 backdrop-blur-xl p-4 rounded-xl shadow-xl w-full sm:w-[30%] h-[270px]">
        <h2 className="text-white text-xl text-center font-semibold mb-4 sticky top-0 bg-opacity-70 backdrop-blur-xl z-10">
          Upcoming
        </h2>
        <ul className="space-y-4 max-h-[200px] pr-4 overflow-y-auto">
          {music.map((song, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                index === currentSongIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleSongSelect(index)}
            >
              <div className="flex justify-between items-center">
                <span>{song.title}</span>
                <span className="text-sm text-gray-500">
                  {/* Display current time and duration */}
                  {index === currentSongIndex
                    ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                    : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
