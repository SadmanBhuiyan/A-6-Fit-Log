import React from 'react';
import type { Workout } from '../utils/api';
import Image from 'next/image';
import Link from 'next/link';
type WorkoutCardProps = {
    workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link className='block' href={`/workouts/${workout.id}`}>
        <div className="card bg-base-100 shadow-sm transition-all duration-300 ease-in-out 
               hover:scale-105 hover:-translate-y-1">
            <figure>
                <Image src={workout.image} alt={workout.name} width={300} height={100} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <div className='flex justify-items-start gap-1'>
                    {workout.muscleGroups.map(group => <span key={group} className='badge rounded-2xl bg-[#C2F800] text-black font-semibold '>{group}</span>)}
                </div>
                <h2 className="card-title font-bold text-2xl">{workout.name}</h2>
                <p className='text-[#9CA3AF]'>{workout.equipment}</p>
                <div className='divider m-0'></div>
                <div className="flex justify-start gap-3 text-[#9CA3AF]">
                    <span>⏱️ {workout.duration}</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>⭐ {workout.rating}</span>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default WorkoutCard;