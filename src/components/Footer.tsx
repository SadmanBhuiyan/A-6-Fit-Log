import React from 'react';
import logo from '../../public/logo.png'
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 flex justify-between">
            <div className='flex justify-center items-center'>
                <Image src={logo} alt='logo' width={20}></Image>
                <p className='font-semibold mx-1'>FITLOG</p>
            </div>
            <div>
                <p>© {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
};

export default Footer;