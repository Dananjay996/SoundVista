import React from 'react'
import {User} from '@supabase/auth-helpers-nextjs'
import { useSessionContext, useUser as useSupabaseUser } from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types'

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = React.createContext<UserContextType | undefined>(
    undefined
);

export interface Props{
    [propname: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const {session, isLoading: isLoadingUser, supabaseClient: supabase} = useSessionContext();

    const user = useSupabaseUser();
    const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
    const [subscription, setSubscription] = React.useState<Subscription | null>(null);
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = React.useState<boolean>(false);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscriptions = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status',['trialing', 'active']).single();

    React.useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscriptions()]).then((result) => {
                const userDetailsPromise = result[0];
                const subscriptionPromise = result[1];

                if(userDetailsPromise.status === 'fulfilled'){
                    setUserDetails(userDetailsPromise.value.data);
                }
                if(subscriptionPromise.status === 'fulfilled'){
                    setSubscription(subscriptionPromise.value.data);
                }

                setIsLoadingData(false);
            })
        }else if(!user && !isLoadingUser && !isLoadingData){
            setUserDetails(null);
            setSubscription(null);
        }

    },[user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return (
        <UserContext.Provider value={value} {...props} />
    )
};

export const useUser = () => {
    const context = React.useContext(UserContext);

    if(!context){
        throw new Error('useUser must be used within a UserContextProvider')
    }

    return context;
}