import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import Nav from '../../Component/Nav/Nav';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;