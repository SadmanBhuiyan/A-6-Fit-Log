'use client'

import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import type { Workout } from '../utils/api';

type WorkoutListProps = {
    workouts: Workout[];
};

const WorkoutList = ({ workouts }: WorkoutListProps) => {
    const [sortBy, setSortBy] = useState('duration');

    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === 'duration') {
            return a.duration - b.duration;
        }

        if (sortBy === 'calories') {
            return a.caloriesBurned - b.caloriesBurned;
        }

        if (sortBy === 'rating') {
            return b.rating - a.rating;
        }

        return 0;
    });

    return (
        <div>
            <div className='flex justify-between items-center my-5'>
                <div>
                    <p className='text-4xl font-bold'>THE LIBRARY</p>
                    <p className='text-[#9CA3AF]'>
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='select select-bordered bg-black'
                >
                    <option value='duration'>Duration</option>
                    <option value='calories'>Calories</option>
                    <option value='rating'>Rating</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {sortedWorkouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
};

export default WorkoutList;