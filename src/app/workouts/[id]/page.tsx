import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getWorkout } from '../../../utils/api';
import PlanButtons from '../../../components/PlanButtons';

const WorkoutDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  return (
    <div className='py-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={700}
            height={600}
            className='w-full h-[350px] lg:h-[500px] object-cover rounded-2xl'
          />
        </div>

        <div>
          <h1 className='text-3xl font-bold uppercase'>
            {workout.name}
          </h1>

          <p className='text-[#9CA3AF] mt-2 leading-7'>
            {workout.description}
          </p>

          <div className='flex flex-wrap gap-2 my-3'>
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className='badge bg-[#C2F800] text-black border-0 rounded-full font-semibold'
              >
                {group}
              </span>
            ))}
          </div>

          <div className='border border-[#303030] rounded-xl overflow-hidden my-4'>
            <table className='w-full'>
              <tbody>
                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    EQUIPMENT
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.equipment}
                  </td>
                </tr>

                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    DIFFICULTY
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.difficulty}
                  </td>
                </tr>

                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    SETS
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.sets}
                  </td>
                </tr>

                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    REPS
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.reps}
                  </td>
                </tr>

                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    DURATION
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.duration} min
                  </td>
                </tr>

                <tr className='border-b border-[#303030]'>
                  <td className='p-4 text-[#9CA3AF]'>
                    CALORIES
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    {workout.caloriesBurned} kcal
                  </td>
                </tr>

                <tr>
                  <td className='p-4 text-[#9CA3AF]'>
                    RATING
                  </td>
                  <td className='p-4 text-right font-semibold'>
                    ⭐ {workout.rating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className='text-xl font-bold mb-4'>
            INSTRUCTIONS
          </h2>

          <ol className='space-y-4'>
            {workout.instructions.map((instruction, index) => (
              <li
                key={index}
                className='flex gap-4'
              >
                <span className='text-[#9CA3AF] font-bold text-lg'>
                  {index + 1}.
                </span>

                <p className='text-[#9CA3AF]'>
                  {instruction}
                </p>
              </li>
            ))}
          </ol>

          <PlanButtons id={workout.id} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;