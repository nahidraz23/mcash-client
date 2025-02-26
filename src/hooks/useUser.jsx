import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/Auth';

const useUser = (email) => {
    const {setUser} = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${email}`);
            setUser(res?.data);
            return res?.data;
        }
    })

    return [userInfo];
};

export default useUser;