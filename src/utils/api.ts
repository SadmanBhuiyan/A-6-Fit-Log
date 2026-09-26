export type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
};

export const getWorkouts = async (): Promise<Workout[]> => {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog');

    if (!res.ok) {
        throw new Error('Failed to fetch workouts');
    }

    return res.json();
};

export const getWorkout = async (id: string): Promise<Workout> => {
    const res = await fetch(
        `https://api.api-store.workers.dev/api/fitlog${id}`
    );

    if (!res.ok) {
        throw new Error('Workout not found');
    }

    return res.json();
};