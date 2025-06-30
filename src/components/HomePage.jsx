import React, { useEffect } from 'react'
import { useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const HomePage = () => {

    const [title, setTitle] = useState('')
    const [value, setValue] = useState('');;
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch();
    const allPastes = useSelector(state => state.paste.pastes);

    // useEffect(()=>{
    //         if(pasteId){
    //             const paste = allPastes.find((p) => String(p._id) === String(pasteId))
    //             console.log(paste)
    //             setTitle(paste.title)
    //             setValue(paste.content)
    //         }
    //     },[pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            dispatch(updateToPastes(paste));
        }else{
            dispatch(addToPastes(paste));
        }

        //after creation or updation
        setTitle("");
        setValue("");
        setSearchParams({});
    }


    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between '>
                <input
                    className='p-2 rounded-2xl mt-2 w-[68%] pl-4'
                    type='text'
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>
            </div>

            <div>
                <textarea className='rounded-2xl mt-4 min-w-[500px] p-4'
                  value={value}
                  placeholder='Enter content here'
                  onChange={(e) => setValue(e.target.value)}
                  rows={20}
                />
            </div>
        </div>
    )
}

export default HomePage
