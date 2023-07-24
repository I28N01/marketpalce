import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Profile from '../pages/Profile/Profile';
import Advert from '../pages/Advert/Advert';



function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/ads/:id' element={<Advert />} />
        </Routes>
    );
}

export default Routing;
