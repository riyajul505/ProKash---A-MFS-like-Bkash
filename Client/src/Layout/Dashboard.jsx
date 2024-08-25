import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbarr from '../Components/Navbarr';

const Dashboard = () => {
    return (
        <div>
            <Navbarr/>
            <Outlet/>
        </div>
    );
};

export default Dashboard;