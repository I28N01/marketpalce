import styles from "./Seller.module.scss";
import Header from "../../components/Header/Header"
import Menu from "../../components/UI/Menu/Menu";
import SellerProfile from "../../components/SellerProfile/SellerProfile";
import Items from "../../components/Items/Items";
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer";


function Seller() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <Menu />
                        <SellerProfile />
                        
                    </div >
                </main >
            </div >
            <Footer />
        </div >
    )
}

export default Seller;