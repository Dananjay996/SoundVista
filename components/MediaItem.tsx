"use client"

import React from 'react'

import { Song } from '@/types'
import useLoadImage from '@/hooks/useLoadImage'
import Image from 'next/image'

interface MediaItemProps {
    onClick?: (id: string) => void,
    data: Song
}

export const MediaItem: React.FC<MediaItemProps> = ({
    onClick,
    data
}) => {
    const imageUrl = useLoadImage(data);
    const handleClick = () => {
        if(onClick){
            return onClick(data.id); 
        }

        //@todo : Add some other functionality.
    }
  return (
    <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/90 w-full p-2 rounded-md' >
        <div className='relative rounded-md min-h-[40px] min-w-[48px] overflow-hidden'>
            <Image fill src={imageUrl || '/images/liked.png'} alt="Media Item" className='object-cover'/>

        </div>
        <div className='flex flex-col gap-y-1 overflow-hidden'>
            <p className='text-white truncate'>
                {data.title}
            </p>
            <p className='text-neutral-400 text-sm truncate'>
                {data.other}
            </p>

        </div>
    </div>
  )
}
