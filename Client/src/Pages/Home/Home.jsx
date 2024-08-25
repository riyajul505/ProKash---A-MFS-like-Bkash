import { Spinner } from "@material-tailwind/react";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const {user, setUser, setLoading, loading} = useContext(AuthContext);
    useEffect(()=>{
        setLoading(true);
        axiosSecure.get('/user-details')
        .then(res => {setUser(res.data); setLoading(false)})
    },[axiosSecure, setUser, setLoading]);
    // loading spinner
    if(loading){
        return <div className='h-[100vh] flex justify-center items-center'> <Spinner className="h-16 w-16 text-gray-900/50" /> </div>
    }
    // info for pending user
    if(user?.status == 'pending'){
       return ( <div>
            <h2>Name: {user.name} </h2>
            <h2>Account Status: Pending</h2>
       </div> )
    }
    return (
        <div>
            {user?.status == 'pending' ? <div>pending 2</div> : <div>not pending</div>}
        </div>
    );
};

export default Home;