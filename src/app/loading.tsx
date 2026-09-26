import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-[60vh] flex justify-center items-center'>

            <div className='text-center'>

                <span className='loading loading-spinner loading-lg text-[#C2F800]'></span>

                <p className='mt-4 text-[#9CA3AF]'>
                    Loading workouts...
                </p>

            </div>

        </div>
    );
};

export default Loading;