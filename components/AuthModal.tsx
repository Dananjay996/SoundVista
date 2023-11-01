"use client";

import React from 'react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Modal from '@/components/Modal';
import useAuthModal from '@/hooks/useAuthModal';

const AuthModal = () => {

    const supabase = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    React.useEffect(() => {
        if(session){
            router.refresh();
            onClose();
        }
    },[session,router,onClose])

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

    return (
        <Modal
            title="Welcome back!"
            description='Login in to your account to continue.'
            isOpen={isOpen}
            OnChange={onChange}
        >
            <Auth theme="dark" magicLink supabaseClient={supabase} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: 'red',
                            brandAccent: '#FFC0CB',
                        }
                    }
                }
            }} providers={['github','google']}/>
        </Modal>
    )
}

export default AuthModal;