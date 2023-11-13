"use client"

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string,
    songName:string
}

const LikeButton:React.FC<LikeButtonProps> = ({
    songId,
    songName
}) => {

    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authModal = useAuthModal();
    const {user} = useUser();

    const [isLiked,setIsLiked] = React.useState(false);

    const handleLike = async () => {
        if(!user){
            return authModal.onOpen();
        }

        if(isLiked){
            const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id',user.id).eq('song_id',songId);
            if(error){
                toast.error(error.message)
            }else{
                setIsLiked(false)
                toast.success(`${songName} removed from your liked songs!`)
            }
        }else{
            const {error} = await supabaseClient.from('liked_songs').insert([{user_id: user.id, song_id: songId}]);
            if(error){
                toast.error(error.message)
            }else{
                setIsLiked(true)
                toast.success(`${songName} added to your liked songs!`)
            }
        }
        
        router.refresh();
    }

    React.useEffect(()=> {
        if(!user?.id){
            return;
        }

        const fetchData = async () => {
            const {data,error} = await supabaseClient.from('liked_songs').select('*').eq('user_id',user.id).eq('song_id',songId).single();

            if(error){
                console.log(error);
                return;
            }

            if(data) setIsLiked(true);
        }

        fetchData();
    },[songId,user?.id,supabaseClient])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <button className="hover:opacity-75 transition" onClick={handleLike}>
            <Icon color={isLiked? '#22c55e': 'white' } />
        </button>
    )
}


export default LikeButton; 