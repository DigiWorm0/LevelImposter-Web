import React from 'react';
import ReactDOM from 'react-dom/client';

import './style/Index.css';
import './style/Components.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Maps from './screens/Maps';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Map from './screens/Map';
import User from './screens/User';
import NotFound from './screens/NotFound';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/map/:id" element={<Map />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
