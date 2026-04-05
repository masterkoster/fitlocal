import { 
  WorkoutPlan, 
  WorkoutDayPlan, 
  Exercise, 
  ExerciseAssignment,
  MuscleGroup,
  Equipment
} from '@/types';
import { exercises, getExercisesByEquipment } from '@/data/exercises';
import { gymChains, getGymById } from '@/data/gyms';

interface WorkoutConfig {
  gymId: string;
  daysPerWeek: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const musclePriority: MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
];

const pushMuscles: MuscleGroup[] = ['chest', 'shoulders', 'triceps'];
const pullMuscles: MuscleGroup[] = ['back', 'biceps', 'traps'];
const legMuscles: MuscleGroup[] = ['quads', 'hamstrings', 'glutes', 'calves'];

/**
 * Get exercises for a specific muscle group that match available equipment
 */
export const getExercisesForMuscle = (
  muscle: MuscleGroup,
  equipment: Equipment[],
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
): Exercise[] => {
  return exercises.filter(ex => {
    // Check if exercise targets this muscle
    const targetsMuscle = ex.targetMuscles.includes(muscle);
    
    // Check if equipment is available
    const hasEquipment = ex.equipment.length === 0 || 
      ex.equipment.some(eq => equipment.includes(eq));
    
    // Consider difficulty - beginners get beginner exercises, everyone gets all
    const difficultyMatch = difficulty === 'beginner' 
      ? ex.difficulty === 'beginner' 
      : true;
    
    return targetsMuscle && hasEquipment && difficultyMatch;
  }).slice(0, 3); // Max 3 exercises per muscle
};

/**
 * Get equipment list for a gym
 */
export const getGymEquipment = (gymId: string): Equipment[] => {
  const gym = getGymById(gymId);
  return (gym?.equipment || ['dumbbell', 'cable_machine']) as Equipment[];
};

/**
 * Generate Push Day workout
 */
const generatePushDay = (
  equipment: Equipment[],
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ExerciseAssignment[] => {
  const assignments: ExerciseAssignment[] = [];
  const restTime = difficulty === 'beginner' ? 90 : 60;

  // Chest exercises
  const chestExercises = getExercisesForMuscle('chest', equipment, difficulty);
  chestExercises.slice(0, 2).forEach(ex => {
    assignments.push({
      exercise: ex,
      sets: 4,
      reps: difficulty === 'beginner' ? '10-12' : '8-10',
      rest: restTime,
    });
  });

  // Shoulder exercises
  const shoulderExercises = getExercisesForMuscle('shoulders', equipment, difficulty);
  shoulderExercises.slice(0, 2).forEach(ex => {
    assignments.push({
      exercise: ex,
      sets: 3,
      reps: difficulty === 'beginner' ? '12-15' : '10-12',
      rest: restTime,
    });
  });

  // Tricep exercises
  const tricepExercises = getExercisesForMuscle('triceps', equipment, difficulty);
  if (tricepExercises.length > 0) {
    assignments.push({
      exercise: tricepExercises[0],
      sets: 3,
      reps: '10-12',
      rest: 60,
    });
  }

  return assignments;
};

/**
 * Generate Pull Day workout
 */
const generatePullDay = (
  equipment: Equipment[],
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ExerciseAssignment[] => {
  const assignments: ExerciseAssignment[] = [];
  const restTime = difficulty === 'beginner' ? 90 : 60;

  // Back exercises
  const backExercises = getExercisesForMuscle('back', equipment, difficulty);
  backExercises.slice(0, 2).forEach(ex => {
    assignments.push({
      exercise: ex,
      sets: 4,
      reps: difficulty === 'beginner' ? '10-12' : '8-10',
      rest: restTime,
    });
  });

  // Bicep exercises
  const bicepExercises = getExercisesForMuscle('biceps', equipment, difficulty);
  bicepExercises.slice(0, 2).forEach(ex => {
    assignments.push({
      exercise: ex,
      sets: 3,
      reps: difficulty === 'beginner' ? '12-15' : '10-12',
      rest: 60,
    });
  });

  // Rear delts (face pulls for shoulder health)
  const rearDeltExercises = exercises.filter(
    ex => ex.name.toLowerCase().includes('face pull')
  );
  if (rearDeltExercises.length > 0) {
    assignments.push({
      exercise: rearDeltExercises[0],
      sets: 3,
      reps: '15-20',
      rest: 60,
    });
  }

  return assignments;
};

/**
 * Generate Legs Day workout
 */
const generateLegsDay = (
  equipment: Equipment[],
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ExerciseAssignment[] => {
  const assignments: ExerciseAssignment[] = [];
  const restTime = difficulty === 'beginner' ? 120 : 90;

  // Quad exercises
  const quadExercises = getExercisesForMuscle('quads', equipment, difficulty);
  if (quadExercises.length > 0) {
    assignments.push({
      exercise: quadExercises[0],
      sets: 4,
      reps: difficulty === 'beginner' ? '10-12' : '8-10',
      rest: restTime,
    });
  }

  // Hamstring exercises
  const hamstringExercises = getExercisesForMuscle('hamstrings', equipment, difficulty);
  if (hamstringExercises.length > 0) {
    assignments.push({
      exercise: hamstringExercises[0],
      sets: 4,
      reps: difficulty === 'beginner' ? '10-12' : '8-10',
      rest: restTime,
    });
  }

  // Glute exercises
  const gluteExercises = getExercisesForMuscle('glutes', equipment, difficulty);
  if (gluteExercises.length > 0) {
    assignments.push({
      exercise: gluteExercises[0],
      sets: 3,
      reps: '10-12',
      rest: 60,
    });
  }

  // Calf exercises
  const calfExercises = getExercisesForMuscle('calves', equipment, difficulty);
  if (calfExercises.length > 0) {
    assignments.push({
      exercise: calfExercises[0],
      sets: 4,
      reps: '12-15',
      rest: 60,
    });
  }

  return assignments;
};

/**
 * Generate complete workout plan
 */
export const generateWorkoutPlan = (config: WorkoutConfig): WorkoutPlan => {
  const equipment = getGymEquipment(config.gymId);
  const days: WorkoutDayPlan[] = [];

  // PPL schedule: 6 days on, 1 rest
  const schedule = [
    { day: 1, type: 'push' as const, name: 'Push Day' },
    { day: 2, type: 'pull' as const, name: 'Pull Day' },
    { day: 3, type: 'legs' as const, name: 'Legs Day' },
    { day: 4, type: 'push' as const, name: 'Push Day' },
    { day: 5, type: 'pull' as const, name: 'Pull Day' },
    { day: 6, type: 'legs' as const, name: 'Legs Day' },
    { day: 7, type: 'rest' as const, name: 'Rest Day' },
  ];

  schedule.forEach((day, index) => {
    if (index < config.daysPerWeek) {
      let exercises: ExerciseAssignment[] = [];

      switch (day.type) {
        case 'push':
          exercises = generatePushDay(equipment, config.difficulty);
          break;
        case 'pull':
          exercises = generatePullDay(equipment, config.difficulty);
          break;
        case 'legs':
          exercises = generateLegsDay(equipment, config.difficulty);
          break;
        case 'rest':
          exercises = [];
          break;
      }

      days.push({
        day: index + 1,
        name: day.name,
        type: day.type,
        exercises,
      });
    }
  });

  return { days };
};

/**
 * Format workout day for display
 */
export const formatWorkoutDay = (day: WorkoutDayPlan): string => {
  const exerciseCount = day.exercises.length;
  const totalSets = day.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  
  return `${day.name}: ${exerciseCount} exercises, ${totalSets} total sets`;
};

/**
 * Get workout summary stats
 */
export const getWorkoutStats = (plan: WorkoutPlan) => {
  const totalExercises = plan.days.reduce((sum, day) => sum + day.exercises.length, 0);
  const totalSets = plan.days.reduce(
    (sum, day) => sum + day.exercises.reduce((s, ex) => s + ex.sets, 0),
    0
  );
  const totalVolume = plan.days.reduce(
    (sum, day) => sum + day.exercises.reduce(
      (s, ex) => s + ex.sets * parseInt(ex.reps.split('-')[0]), 
      0
    ),
    0
  );

  return {
    totalExercises,
    totalSets,
    estimatedVolume: `${totalVolume}+ reps`,
    trainingDays: plan.days.filter(d => d.type !== 'rest').length,
    restDays: plan.days.filter(d => d.type === 'rest').length,
  };
};
