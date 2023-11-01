import React from 'react'
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import Modal from '@/components/Modal';
import useUploadModal from '@/hooks/useUploadModal';
import Input from '@/components/Input'
import Button from '@/components/Button';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const uploadModal = useUploadModal();
    const {user} = useUser();
    const supabase = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            artist: '',
            song: null,
            image: null,
        }
    });

    React.useEffect(() => {
        console.log(supabase);
    },[]);

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //Upload to Supabase
        try{
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user){
                toast.error('Missing required fields.');
                return;
            }

            const uuid = uniqid();

            const {data: songData, error: songError} = await supabase.storage.from('songs').upload(`song-${values.title}-${uuid}`,songFile, {
                cacheControl: '3600',
                upsert: false,
            });

            if(songError){
                setIsLoading(false);
                return toast.error('Something went wrong while uploading audio. Please try again.');
            }

            const {data: imageData, error: imageError} = await supabase.storage.from('images').upload(`image-${values.title}-${uuid}`,imageFile, {
                cacheControl: '3600',
                upsert: false,
            });

            if(imageError){
                setIsLoading(false);
                return toast.error('Something went wrong while uploading image. Please try again.');
            }

            const {error: supabaseError} = await supabase.from('songs').insert({
                user_id: user?.id,
                title: values.title,
                other: values.author,
                image_path: imageData?.path,
                song_path: songData?.path,
            })

            if(supabaseError){
                setIsLoading(false);
                return toast.error('Something went wrong while uploading data. Please try again.');
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song uploaded successfully.');
            reset();
            uploadModal.onClose();
        }catch(error){
            toast.error('Something went wrong. Please try again.');
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a song"
            description='Upload an MP3 file to SoundVista.'
            isOpen={uploadModal.isOpen}
            OnChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />
                <div>
                    <div className='pb-1'>
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept='.mp3'
                        {...register('song', { required: true })}
                        className='cursor-pointer'
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select an image file
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept='image/*'
                        {...register('image', { required: true })}
                        className='cursor-pointer'
                    />
                </div>
                <Button type='submit' className='text-white text-xl'>
                    Create
                </Button>
            </form>
        </Modal>
        // <div>
        //     Upload Modal
        // </div>
    )
}

export default UploadModal