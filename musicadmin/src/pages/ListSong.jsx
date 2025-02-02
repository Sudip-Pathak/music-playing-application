import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.data); // Update this line to match the backend response
      }
    } catch (error) {
      toast.error("Error Occurred While Listing Songs");
    }
  };

  const removeSong = async (id) => {
    try {
      // console.log("Removing song with id:", id); // Add this line
      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success("Song Delete");
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error Cccured While Deleting Song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <>
      <div>
        <p>List of All Songs</p>
        <br />
        <div>
          <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-green-100">
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Duration</b>
            <b>Action</b>
          </div>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
              >
                <img className="w-12" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => removeSong(item._id)}
                >
                  Delete
                </p>
              </div>
            ))
          ) : (
            <p>No songs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListSong;
