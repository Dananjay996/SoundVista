"use client";

import { Song } from '@/types';
import React from 'react'
import SongListItem from '../../../components/SongListItem';
import useOnPlay from '@/hooks/useOnPlay';

interface SongListProps {
    songs: Song[];
}

const SongList: React.FC<SongListProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs);

    if(songs.length === 0) {
        return (
            <div className='text-neutral-400 mt-3'>
                mhm, no songs here!
            </div>
        )
    }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
        {songs.map((song) => (
            <SongListItem key={song.id} onClick = {(id:string) => onPlay(id)} data={song} />
        ))}
        
    </div>
  )
}

export default SongList