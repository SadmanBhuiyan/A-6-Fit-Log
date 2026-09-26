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

const getWorkouts = async (): Promise<Workout[]> => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');

    if (!res.ok) {
        throw new Error('Failed to fetch workouts');
    }

    return (await res.json()) as Promise<Workout[]>;
};

export default getWorkouts;