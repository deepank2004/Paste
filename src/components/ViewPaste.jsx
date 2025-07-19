import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => String(p._id) === String(id));

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [paste]);

  if (!paste) {
    return (
      <div className="p-4 text-red-500 text-center">
        Paste not found or still loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[68%] pl-4"
          type="text"
          placeholder="Enter title here"
          value={title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
