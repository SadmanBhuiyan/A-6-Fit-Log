'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import logo from '../../public/logo.png';

const Navbar = () => {
    const pathName = usePathname();

    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    const updateCounts = () => {
        const plan = JSON.parse(
            localStorage.getItem('fitlogPlan') || '[]'
        );

        const saved = JSON.parse(
            localStorage.getItem('fitlogSaved') || '[]'
        );

        setPlanCount(plan.length);
        setSavedCount(saved.length);
    };

    useEffect(() => {
        updateCounts();

        window.addEventListener(
            'fitlogUpdate',
            updateCounts
        );

        return () => {
            window.removeEventListener(
                'fitlogUpdate',
                updateCounts
            );
        };
    }, []);

    const links = (
        <>
            <li>
                <Link
                    href='/workouts'
                    className={
                        pathName === '/workouts'
                            ? 'text-[#C2F800] bg-[#1A2312] rounded-4xl'
                            : ''
                    }
                >
                    Workouts
                </Link>
            </li>

            <li>
                <Link
                    href='/my-plan'
                    className={
                        pathName === '/my-plan'
                            ? 'text-[#C2F800] bg-[#1A2312] rounded-4xl'
                            : ''
                    }
                >
                    My Plan
                </Link>
            </li>
        </>
    );

    return (
        <div className='navbar bg-black'>
            <div className='navbar-start'>
                <div className='dropdown'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn btn-ghost lg:hidden'
                    >
                        <svg
                            aria-label='Menu'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h8m-8 6h16'
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={-1}
                        className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
                    >
                        {links}
                    </ul>
                </div>

                <div className='flex items-center justify-center'>
                    <Image
                        src={logo}
                        alt='logo'
                        width={30}
                        height={30}
                    />

                    <Link
                        href='/'
                        className='font-bold text-2xl mx-[5px]'
                    >
                        FITLOG
                    </Link>
                </div>
            </div>

            <div className='navbar-center hidden lg:flex'>
                <ul className='menu menu-horizontal px-1'>
                    {links}
                </ul>
            </div>

            <div className='navbar-end'>
                <div className='flex justify-between gap-3 sm:gap-5'>
                    <Link
                        href='/my-plan'
                        className='flex items-center gap-2'
                    >
                        <p>Plan</p>

                        <p className='flex justify-center items-center text-center bg-[#C2F800] text-black rounded-xl w-6 h-6 font-semibold'>
                            {planCount}
                        </p>
                    </Link>

                    <Link
                        href='/my-plan'
                        className='flex items-center gap-2'
                    >
                        <p>Saved</p>

                        <p className='flex justify-center items-center border border-gray-400 rounded-xl w-6 h-6 font-semibold'>
                            {savedCount}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;