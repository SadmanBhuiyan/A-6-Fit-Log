import React from 'react';
import Image from 'next/image';
import { getWorkout } from '../../../utils/api';

const WorkoutDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <div className='py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={700}
            height={500}
            className='w-full h-[500px] object-cover rounded-lg'
          />
        </div>

        <div>
          <div className='flex gap-2 mb-4'>
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className='badge rounded-2xl bg-[#C2F800] text-black font-semibold'
              >
                {group}
              </span>
            ))}
          </div>

          <h1 className='text-4xl font-bold uppercase'>
            {workout.name}
          </h1>

          <p className='text-[#9CA3AF] mt-3'>
            {workout.description}
          </p>

          <div className='divider'></div>

          <h2 className='text-2xl font-bold mb-4'>
            KEY SPECS
          </h2>

          <div className='grid grid-cols-2 gap-4'>

            <div>
              <p className='text-[#9CA3AF]'>EQUIPMENT</p>
              <p>{workout.equipment}</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>DIFFICULTY</p>
              <p>{workout.difficulty}</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>SETS</p>
              <p>{workout.sets}</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>REPS</p>
              <p>{workout.reps}</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>DURATION</p>
              <p>{workout.duration} min</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>CALORIES</p>
              <p>{workout.caloriesBurned} kcal</p>
            </div>

            <div>
              <p className='text-[#9CA3AF]'>RATING</p>
              <p>⭐ {workout.rating}</p>
            </div>

          </div>

          <div className='divider'></div>

          <h2 className='text-2xl font-bold mb-4'>
            INSTRUCTIONS
          </h2>

          <ol className='space-y-4'>
            {workout.instructions.map((instruction, index) => (
              <li key={instruction} className='flex gap-4'>
                <span className='text-[#9CA3AF] font-bold'>
                  {index + 1}.
                </span>

                <p className='text-[#9CA3AF]'>
                  {instruction}
                </p>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;