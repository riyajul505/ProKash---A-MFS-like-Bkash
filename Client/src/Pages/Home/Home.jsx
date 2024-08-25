import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.get('/user-details')
        .then(res => {setUser(res.data)})
    },[axiosSecure, setUser])
    // if(!user){
    //    return navigate('/')
    // }
    return (
        <div>
            {user && user.name}
        </div>
    );
};

export default Home;