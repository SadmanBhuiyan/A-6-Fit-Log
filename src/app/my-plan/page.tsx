import React from 'react';
import Link from 'next/link';

const MyPlanPage = () => {
    return (
        <div className='py-10'>

            <div className='mb-8'>

                <h1 className='text-5xl font-bold'>
                    MY PLAN
                </h1>

                <p className='text-[#9CA3AF] mt-2'>
                    Cap of five lifts for today. Finish them, then load more.
                </p>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>

                <div className='border border-[#292929] rounded-xl p-5 bg-[#111111]'>
                    <p className='text-[#9CA3AF]'>
                        EXERCISES
                    </p>

                    <p className='text-4xl font-bold mt-2'>
                        0
                    </p>
                </div>

                <div className='border border-[#292929] rounded-xl p-5 bg-[#111111]'>
                    <p className='text-[#9CA3AF]'>
                        MINUTES
                    </p>

                    <p className='text-4xl font-bold mt-2'>
                        0
                    </p>
                </div>

                <div className='border border-[#292929] rounded-xl p-5 bg-[#111111]'>
                    <p className='text-[#9CA3AF]'>
                        CALORIES
                    </p>

                    <p className='text-4xl font-bold mt-2'>
                        0
                    </p>
                </div>

            </div>

            <div className='border-b border-[#292929] mb-8'>

                <div className='flex gap-8'>

                    <button className='border-b-2 border-[#C2F800] text-[#C2F800] pb-4 font-semibold'>
                        TODAY'S PLAN
                    </button>

                    <button className='text-[#9CA3AF] pb-4'>
                        SAVED
                    </button>

                </div>

            </div>

            <div className='border border-[#292929] rounded-xl py-20 text-center bg-[#111111]'>

                <h2 className='text-2xl font-bold'>
                    NOTHING HERE YET
                </h2>

                <p className='text-[#9CA3AF] mt-2'>
                    Browse the library and add a lift to get today moving.
                </p>

                <Link
                    href='/workouts'
                    className='btn bg-[#C2F800] text-black border-0 mt-6'
                >
                    GO TO WORKOUTS
                </Link>

            </div>

        </div>
    );
};

export default MyPlanPage;