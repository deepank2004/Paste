import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[500px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="border p-4 rounded-xl" key={paste?._id}>
                <div className="font-bold">{paste.title}</div>
                <div className="text-gray-700 mt-2">{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly mt-3">
                  <NavLink
                    to={`/?pasteId=${paste?._id}`}
                    className="px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    to={`/pastes/${paste?._id}`}
                    className="px-4 py-1 bg-green-500 text-white rounded"
                  >
                    View
                  </NavLink>
                  <button
                    className="px-4 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard');
                    }}
                  >
                    Copy
                  </button>
                  <button className="px-4 py-1 bg-gray-500 text-white rounded">
                    Share
                  </button>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {paste.createdAt}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
