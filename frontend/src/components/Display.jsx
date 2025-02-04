// import React, { useContext, useEffect, useRef } from "react"; // importing the reference hook
// import { Route, Routes, useLocation } from "react-router";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { albumsData } from "../assets/assets";
// import { PlayerContext } from "../context/PlayerContext";

// const Display = () => {
//   const { albumsData } = useContext(PlayerContext);

//   const displayRef = useRef();
//   const location = useLocation();
//   const isAlbum = location.pathname.includes("album");
//   // const albumID = isAlbum ? location.pathname.slice(-1) : ""; // Storing the id here in this line of code
//   // Get the album id if we open any album.
//   const albumID = isAlbum ? location.pathname.split("/").pop() : "";
//   // const bgColor = albumsData[Number(albumID)].bgColor;
//   const bgColor = isAlbum
//     ? albumsData.find((x) => x._id == albumID).bgColour
//     : "#121212";

//   // using above refrence we will set the background for the below <div>
//   useEffect(() => {
//     if (isAlbum) {
//       displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
//     } else {
//       displayRef.current.style.background = `#121212`;
//     }
//   });

//   return (
//     <div
//       ref={displayRef}
//       className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
//     >
//       <Routes>
//         <Route path="/" element={<DisplayHome />} />
//         <Route
//           path="/album/:id"
//           element={
//             <DisplayAlbum album={albumsData.find((x) => x._id == albumID)} />
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default Display;

import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumID = isAlbum ? location.pathname.split("/").pop() : "";
  const album = albumsData ? albumsData.find((x) => x._id == albumID) : null;
  const bgColor = album ? album.bgColour : "#121212";

  useEffect(() => {
    if (isAlbum && album) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, album, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
      </Routes>
    </div>
  );
};

export default Display;
