import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.get('/user-details')
        .then(res => {setUser(res.data)})
    },[axiosSecure, setUser])
    if(!user){
        return navigate('/login')
    }
    return (
        <div>
            {user.name}
        </div>
    );
};

export default Home;