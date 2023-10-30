import React from 'react';
import {IconType} from 'react-icons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href,
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
                flex
                flex-row
                items-center
                h-auto
                w-full
                gap-x-4
                text-md
                font-medium
                cursor-pointer
                hover:text-white
                transition
                text-gray-400
                py-1
            `, active && 'text-white')}
        >
            <Icon size={20} />
            <p className='truncate w-100'>{label}</p>
        </Link>
    )
}

export default SidebarItem;