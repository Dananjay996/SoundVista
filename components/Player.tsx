"use client"

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer'
import React from 'react'
import PlayerContent from './PlayerContent.jsx';

const Player = () => {
    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!)
    if(!song || !songUrl || !player.activeId) return null;



    return (
        <div className='fixed bottom-0 bg-black w-full py-2 h-[100px] px-4'>
            {/* Adding a key attribute here because we want to rerender the playlist everytime the url changes*/}
            <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
        </div>
    )
}

export default Player