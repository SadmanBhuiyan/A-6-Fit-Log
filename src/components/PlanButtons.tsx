'use client'

import React from 'react';
import toast from 'react-hot-toast';

type PlanButtonsProps = {
    id: number;
};

const PlanButtons = ({ id }: PlanButtonsProps) => {
    const addToPlan = () => {
        const currentPlan = JSON.parse(
            localStorage.getItem('fitlogPlan') || '[]'
        );

        if (currentPlan.includes(id)) {
            toast.error("Already in today's plan");
            return;
        }

        if (currentPlan.length >= 5) {
            toast.error("Today's plan can have maximum 5 workouts");
            return;
        }

        currentPlan.push(id);

        localStorage.setItem(
            'fitlogPlan',
            JSON.stringify(currentPlan)
        );

        window.dispatchEvent(new Event('fitlogUpdate'));

        toast.success("Added to today's plan");
    };

    const saveForLater = () => {
        const saved = JSON.parse(
            localStorage.getItem('fitlogSaved') || '[]'
        );

        if (saved.includes(id)) {
            toast.error('Already saved');
            return;
        }

        saved.push(id);

        localStorage.setItem(
            'fitlogSaved',
            JSON.stringify(saved)
        );

        window.dispatchEvent(new Event('fitlogUpdate'));

        toast.success('Saved for later');
    };

    return (
        <div className='mt-8'>
            <div className='flex flex-col sm:flex-row gap-3'>
                <button
                    onClick={addToPlan}
                    className='btn bg-[#C2F800] text-black border-0'
                >
                    ADD TO TODAY'S PLAN
                </button>

                <button
                    onClick={saveForLater}
                    className='btn btn-outline'
                >
                    SAVE FOR LATER
                </button>
            </div>
        </div>
    );
};

export default PlanButtons;