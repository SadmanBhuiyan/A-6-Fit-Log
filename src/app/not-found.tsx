import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='min-h-[60vh] flex justify-center items-center text-center'>

            <div>

                <p className='text-[#C2F800] text-6xl font-bold'>
                    404
                </p>

                <h1 className='text-3xl font-bold mt-4'>
                    NOTHING HERE
                </h1>

                <p className='text-[#9CA3AF] mt-2'>
                    The page you are looking for does not exist.
                </p>

                <Link
                    href='/workouts'
                    className='btn bg-[#C2F800] text-black border-0 mt-6'
                >
                    BACK TO WORKOUTS
                </Link>

            </div>

        </div>
    );
};

export default NotFound;