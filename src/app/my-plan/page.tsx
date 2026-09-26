'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getWorkouts, type Workout } from '../../utils/api';

const MyPlanPage = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
    const [planIds, setPlanIds] = useState<number[]>([]);
    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [doneIds, setDoneIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('duration');

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await getWorkouts();
                setWorkouts(data);

                const plan = JSON.parse(localStorage.getItem('fitlogPlan') || '[]');
                const saved = JSON.parse(localStorage.getItem('fitlogSaved') || '[]');
                const done = JSON.parse(localStorage.getItem('fitlogDone') || '[]');

                setPlanIds(plan);
                setSavedIds(saved);
                setDoneIds(done);
            } catch {
                toast.error('Failed to load workouts');
            } finally {
                setLoading(false);
            }
        };

        loadWorkouts();
    }, []);

    useEffect(() => {
        const updateData = () => {
            const plan = JSON.parse(localStorage.getItem('fitlogPlan') || '[]');
            const saved = JSON.parse(localStorage.getItem('fitlogSaved') || '[]');
            const done = JSON.parse(localStorage.getItem('fitlogDone') || '[]');

            setPlanIds(plan);
            setSavedIds(saved);
            setDoneIds(done);
        };

        window.addEventListener('fitlogUpdate', updateData);

        return () => {
            window.removeEventListener('fitlogUpdate', updateData);
        };
    }, []);

    const planWorkouts = workouts.filter((workout) => planIds.includes(workout.id));
    const savedWorkouts = workouts.filter((workout) => savedIds.includes(workout.id));

    const currentWorkouts = [...(activeTab === 'plan' ? planWorkouts : savedWorkouts)].sort((a, b) => {
        if (sortBy === 'duration') {
            return b.duration - a.duration;
        }

        if (sortBy === 'calories') {
            return b.caloriesBurned - a.caloriesBurned;
        }

        return b.rating - a.rating;
    });
    const totalExercises = planWorkouts.length;
    const totalMinutes = planWorkouts.reduce((total, workout) => total + workout.duration, 0);
    const totalCalories = planWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);

    const removeWorkout = (id: number) => {
        if (activeTab === 'plan') {
            const updatedPlanIds = planIds.filter((workoutId) => workoutId !== id);
            setPlanIds(updatedPlanIds);
            localStorage.setItem('fitlogPlan', JSON.stringify(updatedPlanIds));
        } else {
            const updatedSavedIds = savedIds.filter((workoutId) => workoutId !== id);
            setSavedIds(updatedSavedIds);
            localStorage.setItem('fitlogSaved', JSON.stringify(updatedSavedIds));
        }

        window.dispatchEvent(new Event('fitlogUpdate'));
        toast.success('Workout removed');
    };

    const markAsDone = (id: number) => {
        if (doneIds.includes(id)) {
            return;
        }

        const updatedDoneIds = [...doneIds, id];
        setDoneIds(updatedDoneIds);
        localStorage.setItem('fitlogDone', JSON.stringify(updatedDoneIds));
        toast.success('Workout marked as done');
    };

    const addToPlan = (id: number) => {
        if (planIds.includes(id)) {
            toast.error("Already in today's plan");
            return;
        }

        if (planIds.length >= 5) {
            toast.error("Today's plan can have maximum 5 workouts");
            return;
        }

        const updatedPlanIds = [...planIds, id];
        setPlanIds(updatedPlanIds);
        localStorage.setItem('fitlogPlan', JSON.stringify(updatedPlanIds));

        window.dispatchEvent(new Event('fitlogUpdate'));
        toast.success("Added to today's plan");
    };

    if (loading) {
        return (
            <div className='min-h-[500px] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg text-[#C2F800]'></span>
            </div>
        );
    }

    return (
        <div className='min-h-[calc(100vh-120px)] text-white'>
            <div className='mx-auto px-6 py-10'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-black tracking-tight'>MY PLAN</h1>
                    <p className='text-[#777D87] text-sm mt-1'>Cap of five lifts for today. Finish them, then load more.</p>
                </div>

                <div className='border border-[#242830] bg-[#13161C] rounded-xl mb-7 px-5 md:px-6 py-6'>
                    <div className='grid grid-cols-3 divide-x divide-[#242830]'>
                        <div className='px-4 first:pl-0'>
                            <p className='text-xs text-[#777D87] mb-1'>Exercises</p>
                            <p className='text-3xl font-black text-[#C2F800]'>{totalExercises}</p>
                        </div>

                        <div className='px-6'>
                            <p className='text-xs text-[#777D87] mb-1'>Minutes</p>
                            <p className='text-3xl font-black'>{totalMinutes}</p>
                        </div>

                        <div className='px-6 last:pr-0'>
                            <p className='text-xs text-[#777D87] mb-1'>Calories</p>
                            <p className='text-3xl font-black'>{totalCalories}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-5'>
                    <div className='flex border border-[#242830] bg-[#13161C] rounded-lg overflow-hidden'>
                        <button onClick={() => setActiveTab('plan')} className={`px-5 py-2.5 text-xs font-semibold ${activeTab === 'plan' ? 'bg-[#20242C] text-white' : 'text-[#777D87]'}`}>
                            Today's Plan
                        </button>

                        <button onClick={() => setActiveTab('saved')} className={`px-5 py-2.5 text-xs font-semibold ${activeTab === 'saved' ? 'bg-[#20242C] text-white' : 'text-[#777D87]'}`}>
                            Saved
                        </button>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-xs text-[#777D87]'>Sort By</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='select select-sm min-h-0 h-9 w-24 bg-[#13161C] border-[#242830] text-xs text-white'>
                            <option value='duration'>Duration</option>
                            <option value='calories'>Calories</option>
                            <option value='rating'>Rating</option>
                        </select>
                    </div>
                </div>

                {currentWorkouts.length === 0 ? (
                    <div className='border border-[#242830] bg-[#13161C] rounded-xl min-h-[300px] flex flex-col justify-center items-center text-center'>
                        <h2 className='text-xl font-bold'>NOTHING HERE YET</h2>
                        <p className='text-[#777D87] text-sm mt-2'>Browse the library and add a lift to get today moving.</p>
                        <Link href='/workouts' className='btn btn-sm bg-[#C2F800] text-black border-0 mt-5 rounded-lg text-sm'>
                            GO TO WORKOUTS
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {currentWorkouts.map((workout) => (
                            <div key={workout.id} className='border border-[#242830] bg-[#13161C] rounded-xl p-4 flex items-center gap-4'>
                                <Image src={workout.image} alt={workout.name} width={125} height={75} className='w-[125px] h-[75px] object-cover rounded-lg shrink-0' />

                                <div className='min-w-0 flex-1'>
                                    <h2 className='text-sm md:text-base font-black uppercase truncate'>{workout.name}</h2>
                                    <p className='text-xs text-[#777D87] mt-1'>{workout.equipment}</p>

                                    <div className='flex items-center gap-4 mt-2 text-xs text-[#A2A7AF]'>
                                        <span className='flex items-center gap-1.5'><span className='text-[#C2F800]'>◷</span>{workout.duration} min</span>
                                        <span className='flex items-center gap-1.5'><span className='text-[#C2F800]'>♦</span>{workout.caloriesBurned} kcal</span>
                                        <span className='flex items-center gap-1.5'><span className='text-[#C2F800]'>★</span>{workout.rating}</span>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2 shrink-0'>
                                    <Link href={`/workouts/${workout.id}`} className='hidden sm:flex h-9 px-4 items-center justify-center rounded-full border border-[#303641] text-xs text-white hover:bg-[#20242C]'>
                                        View Details
                                    </Link>

                                    {activeTab === 'plan' && (
                                        <button onClick={() => markAsDone(workout.id)} disabled={doneIds.includes(workout.id)} className={`h-9 px-4 rounded-full text-xs font-semibold ${doneIds.includes(workout.id) ? 'bg-[#252A31] text-[#777D87]' : 'bg-[#C2F800] text-black'}`}>
                                            {doneIds.includes(workout.id) ? '✓ Done' : '✓ Mark as Done'}
                                        </button>
                                    )}

                                    {activeTab === 'saved' && (
                                        <button onClick={() => addToPlan(workout.id)} className='h-9 px-4 rounded-full bg-[#C2F800] text-black text-xs font-semibold'>
                                            Add to Plan
                                        </button>
                                    )}

                                    <button onClick={() => removeWorkout(workout.id)} className='w-7 h-8 text-[#777D87] hover:text-white text-lg'>
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPlanPage;