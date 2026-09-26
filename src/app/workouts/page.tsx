import React from 'react';
import Banner from '../../components/Banner';
import WorkoutCard from '../../components/WorkoutCard';
import {getWorkouts} from '../../utils/api';

export const dynamic = 'force-dynamic';

const WorkoutsPage = async () => {
    const workouts = await getWorkouts();

    return (
        <div>
            <Banner />
            <div className='my-2'>
                <p className='text-4xl font-bold'>THE LIBRARY</p>
                <p className='text-[#9CA3AF]'>Twelve lifts covering every major muscle group.</p>
            </div>
            <div id='workouts' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2'>
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
};

export default WorkoutsPage;