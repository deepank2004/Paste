import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  if (!allPastes.length) {
    return <div className="p-4">Loading...</div>;
  }

  const paste = allPastes.filter((p) => String(p._id) === String(id))
  console.log(paste)

  if (!paste) {
    return <div className="text-red-500 p-4">Paste not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          className="p-2 rounded-2xl mt-2 w-[68%] pl-4"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
