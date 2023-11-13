"use client";

import Image from 'next/image';
import React from 'react'

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import PlayButton from './PlayButton';

interface SongListItemProps {
  onClick: (id: string) => void;
  data: Song;
}

const SongListItem: React.FC<SongListItemProps> = ({
  onClick,
  data,
}) => {

  const imagePath = useLoadImage(data);
  return (
    <div
      onClick = {() => onClick(data.id)}
      className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
    >
      <div
        className='relative aspect-square w-full h-full rounded-md overflow-hidden'
      >
        <Image className='object-cover' src={imagePath || '/images/liked.png'} fill alt="image" />

      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>
          {data.title}
        </p>
        <p className='w-full text-neutral-400 text-sm truncate pb-4'>
          By {data.other}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongListItem