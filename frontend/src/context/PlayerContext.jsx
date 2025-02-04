import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null); // Initialize track as null
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const selectedTrack = songsData.find((item) => item._id === id);
    if (selectedTrack) {
      await setTrack(selectedTrack);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex > 0) {
      const previousTrack = songsData[currentIndex - 1];
      await setTrack(previousTrack);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex + 1];
      await setTrack(nextTrack);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const seekSong = async (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data && response.data.data) {
        setSongsData(response.data.data);
        if (response.data.data.length > 0) {
          setTrack(response.data.data[0]);
        }
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data && response.data.albums) {
        setAlbumsData(response.data.albums);
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching albums data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current && seekBar.current) {
        audioRef.current.ontimeupdate = () => {
          if (seekBar.current) {
            seekBar.current.style.width =
              Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
              ) + "%";
            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    }, 1000);
  }, []);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
