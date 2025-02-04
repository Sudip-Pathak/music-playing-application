// // Creating context API
// import { createContext, useEffect, useRef, useState } from "react";
// // import { songsData } from "../assets/assets";
// import axios from "axios";

// export const PlayerContext = createContext();
// const PlayerContextProvider = (props) => {
//   const audioRef = useRef();
//   const seekBg = useRef();
//   const seekBar = useRef();

//   const url = "http://localhost:4000";

//   // State variables songsdata and albumsdata, here data comming from api is stored.
//   const [songsData, setSongsData] = useState([]);
//   const [albumsdata, setAlbumsData] = useState([]);

//   const [track, setTrack] = useState(songsData[0]); // this state manages the project state
//   const [playStatus, setPlayStatus] = useState(false); // manages the player status
//   // state to get total duration and current time
//   const [time, setTime] = useState({
//     currentTime: {
//       second: 0,
//       minute: 0,
//     },
//     totalTime: {
//       second: 0,
//       minute: 0,
//     },
//   });

//   // Function to play/pause the music
//   const play = () => {
//     audioRef.current.play();
//     setPlayStatus(true);
//   };
//   const pause = () => {
//     audioRef.current.pause();
//     setPlayStatus(false);
//   };

//   // Playing the song using the song id.
//   const playWithId = async (id) => {
//     await setTrack(songsData[id]);
//     await audioRef.current.play();
//     setPlayStatus(true);
//   };

//   // Finction to go to previous track.
//   const previous = async () => {
//     if (track.id > 0) {
//       await setTrack(songsData[track.id - 1]);
//       await audioRef.current.play();
//       setPlayStatus(true);
//     }
//   };

//   // Function to go to next track
//   const next = async () => {
//     if (track.id < songsData.length - 1) {
//       await setTrack(songsData[track.id + 1]);
//       await audioRef.current.play();
//       setPlayStatus(true);
//     }
//   };

//   // Function to seek the song in the seekbar.
//   const seekSong = async (e) => {
//     audioRef.current.currentTime =
//       (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
//       audioRef.current.duration;
//   };

//   // Function to get SongsData
//   const getSongsData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/song/list`);
//       setSongsData(response.data.songs);
//       setTrack(response.data.songs[0]);
//     } catch (error) {}
//   };

//   // Function to get AlbumsData
//   const getAlbumsData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/album/list`);
//       setAlbumsData(response.data.albums);
//     } catch (error) {}
//   };

//   // Function to show the time and increase time while playing the music.
//   useEffect(() => {
//     setTimeout(() => {
//       audioRef.current.ontimeupdate = () => {
//         seekBar.current.style.width =
//           Math.floor(
//             (audioRef.current.currentTime / audioRef.current.duration) * 100
//           ) + "%";
//         setTime({
//           currentTime: {
//             second: Math.floor(audioRef.current.currentTime % 60),
//             minute: Math.floor(audioRef.current.currentTime / 60),
//           },
//           totalTime: {
//             second: Math.floor(audioRef.current.duration % 60),
//             minute: Math.floor(audioRef.current.duration / 60),
//           },
//         });
//       };
//     }, 1000);
//   });

//   // calling the function created for get albumsdata and songsdata
//   useEffect(() => {
//     getSongsData();
//     getAlbumsData();
//   });

//   const contextValue = {
//     audioRef,
//     seekBar,
//     seekBg,
//     track,
//     setTrack,
//     playStatus,
//     setPlayStatus,
//     time,
//     setTime,
//     play,
//     pause,
//     playWithId,
//     previous,
//     next,
//     seekSong,
//     songsData,
//     albumsdata,
//   };
//   return (
//     <PlayerContext.Provider value={contextValue}>
//       {props.children}
//     </PlayerContext.Provider>
//   );
// };

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
    const selectedTrack = songsData[id];
    if (selectedTrack) {
      await setTrack(selectedTrack);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const previous = async () => {
    if (track && track.id > 0) {
      const previousTrack = songsData[track.id - 1];
      if (previousTrack) {
        await setTrack(previousTrack);
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }
    }
  };

  const next = async () => {
    if (track && track.id < songsData.length - 1) {
      const nextTrack = songsData[track.id + 1];
      if (nextTrack) {
        await setTrack(nextTrack);
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
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
