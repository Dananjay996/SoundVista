"use client";

import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import ListItem from './ListItem';
import { MediaItem } from './MediaItem';

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({songs}) => {

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const {user} = useUser();

    const onClick = () => {
        if(!user) return authModal.onOpen();

        //@todo : Check for Subscription
        return uploadModal.onOpen();
    }
  return (
    <div className='flex flex-col'>
        <div className='flex items-center justify-between px-5 pt-4'>
            <div className='inline-flex items-center gap-x-2'>
                <TbPlaylist size={26} className='text-neutral-400'/>
                <p className='text-neutral-400 hover:text-white cursor-pointer transition font-medium text-md'>
                    Your Library
                </p>
            </div>
            <AiOutlinePlus onClick={onClick} size={20} className='cursor-pointer text-neutral-400 hover:text-white transition' />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
            {songs.map((song) => {
                return(
                   <MediaItem onClick={()=> {}} key={song.id} data={song} />
                )
            })}
        </div>
    </div>
  )
}

export default Library