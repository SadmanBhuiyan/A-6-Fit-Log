import React from 'react';
import Image from 'next/image';
import banner from '../../public/banner.png'

const Banner = () => {
    return (
        <div className='my-10'>
            <div className="hero bg-base-200 rounded-2xl py-10">
                <div className="hero-content flex-col gap-40 lg:flex-row-reverse">
                    <Image src={banner} alt='banner photo' width={334}></Image>
                    <div>
                        <h1 className="text-5xl font-bold">TRAIN WITH INTENT. LOG <br /> EVERY SET.</h1>
                        <p className="py-6">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br /> into today's plan, and watch the week's work add up.
                        </p>
                        <a href='#workouts'><button className="btn bg-[#C2F800] text-black">BROWSE WORKOUTS</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;