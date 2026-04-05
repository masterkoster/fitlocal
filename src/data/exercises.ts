import { Exercise, Equipment, MuscleGroup } from '@/types';

export const exercises: Exercise[] = [
  // PUSH - Chest
  {
    id: 'bench_press_barbell',
    name: 'Barbell Bench Press',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'bench_press_db',
    name: 'Dumbbell Bench Press',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'smith_bench_press',
    name: 'Smith Machine Bench Press',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['smith_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'incline_bench_press',
    name: 'Incline Bench Press',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    equipment: ['barbell', 'dumbbell', 'smith_machine'],
    difficulty: 'intermediate',
  },
  {
    id: 'chest_press_machine',
    name: 'Chest Press Machine',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['chest_press'],
    difficulty: 'beginner',
  },
  {
    id: 'cable_crossover',
    name: 'Cable Crossover / Fly',
    targetMuscles: ['chest'],
    equipment: ['cable_machine'],
    difficulty: 'intermediate',
  },
  {
    id: 'pec_dec',
    name: 'Pec Deck / Chest Fly Machine',
    targetMuscles: ['chest'],
    equipment: ['pec_dec', 'fly_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'dips',
    name: 'Dips (Chest Focus)',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['dip_station'],
    difficulty: 'intermediate',
  },
  {
    id: 'pushups',
    name: 'Push-ups',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: [],
    difficulty: 'beginner',
  },

  // PUSH - Shoulders
  {
    id: 'ohp_barbell',
    name: 'Overhead Press (Barbell)',
    targetMuscles: ['shoulders', 'triceps'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'ohp_db',
    name: 'Dumbbell Shoulder Press',
    targetMuscles: ['shoulders', 'triceps'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'smith_ohp',
    name: 'Smith Machine Shoulder Press',
    targetMuscles: ['shoulders', 'triceps'],
    equipment: ['smith_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'lateral_raise',
    name: 'Lateral Raises',
    targetMuscles: ['shoulders'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'front_raise',
    name: 'Front Raises',
    targetMuscles: ['shoulders'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'face_pulls',
    name: 'Face Pulls',
    targetMuscles: ['shoulders', 'traps'],
    equipment: ['cable_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'upright_row',
    name: 'Upright Rows',
    targetMuscles: ['shoulders', 'traps'],
    equipment: ['barbell', 'dumbbell', 'cable_machine'],
    difficulty: 'intermediate',
  },

  // PUSH - Triceps
  {
    id: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    targetMuscles: ['triceps'],
    equipment: ['cable_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'skull_crusher',
    name: 'Skull Crushers',
    targetMuscles: ['triceps'],
    equipment: ['EZ_curl_bar', 'dumbbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'overhead_tricep',
    name: 'Overhead Tricep Extension',
    targetMuscles: ['triceps'],
    equipment: ['dumbbell', 'cable_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'tricep_dips',
    name: 'Tricep Dips',
    targetMuscles: ['triceps'],
    equipment: ['dip_station'],
    difficulty: 'intermediate',
  },

  // PULL - Back
  {
    id: 'deadlift',
    name: 'Deadlift',
    targetMuscles: ['back', 'hamstrings', 'glutes', 'traps'],
    equipment: ['barbell'],
    difficulty: 'advanced',
  },
  {
    id: 'barbell_row',
    name: 'Barbell Row',
    targetMuscles: ['back', 'biceps'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'db_row',
    name: 'Dumbbell Row',
    targetMuscles: ['back', 'biceps'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    targetMuscles: ['back', 'biceps'],
    equipment: ['lat_pulldown'],
    difficulty: 'beginner',
  },
  {
    id: 'pullups',
    name: 'Pull-ups',
    targetMuscles: ['back', 'biceps'],
    equipment: ['pullup_bar'],
    difficulty: 'intermediate',
  },
  {
    id: 'assisted_pullups',
    name: 'Assisted Pull-ups',
    targetMuscles: ['back', 'biceps'],
    equipment: ['assisted_pullup'],
    difficulty: 'beginner',
  },
  {
    id: 'seated_row',
    name: 'Seated Cable Row',
    targetMuscles: ['back', 'biceps'],
    equipment: ['seated_row', 'cable_row'],
    difficulty: 'beginner',
  },
  {
    id: 'cable_row',
    name: 'Cable Row',
    targetMuscles: ['back', 'biceps'],
    equipment: ['cable_row'],
    difficulty: 'beginner',
  },
  {
    id: 't_bar_row',
    name: 'T-Bar Row',
    targetMuscles: ['back'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'lat_pullover',
    name: 'Lat Pullover',
    targetMuscles: ['back'],
    equipment: ['dumbbell', 'cable_machine'],
    difficulty: 'intermediate',
  },

  // PULL - Biceps
  {
    id: 'barbell_curl',
    name: 'Barbell Curl',
    targetMuscles: ['biceps'],
    equipment: ['barbell', 'EZ_curl_bar'],
    difficulty: 'beginner',
  },
  {
    id: 'db_curl',
    name: 'Dumbbell Curl',
    targetMuscles: ['biceps'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'hammer_curl',
    name: 'Hammer Curls',
    targetMuscles: ['biceps', 'forearms'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'preacher_curl',
    name: 'Preacher Curls',
    targetMuscles: ['biceps'],
    equipment: ['EZ_curl_bar', 'dumbbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'cable_curl',
    name: 'Cable Curls',
    targetMuscles: ['biceps'],
    equipment: ['cable_machine'],
    difficulty: 'beginner',
  },

  // LEGS - Quads
  {
    id: 'squat_barbell',
    name: 'Barbell Squat',
    targetMuscles: ['quads', 'glutes', 'hamstrings'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'smith_squat',
    name: 'Smith Machine Squat',
    targetMuscles: ['quads', 'glutes'],
    equipment: ['smith_squat'],
    difficulty: 'beginner',
  },
  {
    id: 'leg_press',
    name: 'Leg Press',
    targetMuscles: ['quads', 'glutes'],
    equipment: ['leg_press'],
    difficulty: 'beginner',
  },
  {
    id: 'smith_leg_press',
    name: 'Smith Machine Leg Press',
    targetMuscles: ['quads', 'glutes'],
    equipment: ['smith_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'leg_extension',
    name: 'Leg Extensions',
    targetMuscles: ['quads'],
    equipment: ['leg_extension'],
    difficulty: 'beginner',
  },
  {
    id: 'hack_squat',
    name: 'Hack Squat',
    targetMuscles: ['quads', 'glutes'],
    equipment: ['hack_squat', 'hack_squat_machine'],
    difficulty: 'intermediate',
  },
  {
    id: 'front_squat',
    name: 'Front Squat',
    targetMuscles: ['quads'],
    equipment: ['barbell'],
    difficulty: 'advanced',
  },
  {
    id: 'lunges',
    name: 'Lunges',
    targetMuscles: ['quads', 'glutes'],
    equipment: ['dumbbell'],
    difficulty: 'beginner',
  },

  // LEGS - Hamstrings
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    targetMuscles: ['hamstrings', 'glutes'],
    equipment: ['barbell', 'dumbbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'leg_curl',
    name: 'Lying Leg Curl',
    targetMuscles: ['hamstrings'],
    equipment: ['leg_curl'],
    difficulty: 'beginner',
  },
  {
    id: 'stiff_leg_deadlift',
    name: 'Stiff Leg Deadlift',
    targetMuscles: ['hamstrings', 'glutes'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'good_mornings',
    name: 'Good Mornings',
    targetMuscles: ['hamstrings', 'back'],
    equipment: ['barbell'],
    difficulty: 'advanced',
  },

  // LEGS - Glutes
  {
    id: 'hip_thrust',
    name: 'Hip Thrust',
    targetMuscles: ['glutes', 'hamstrings'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
  },
  {
    id: 'glute_bridge',
    name: 'Glute Bridge',
    targetMuscles: ['glutes'],
    equipment: ['barbell', 'dumbbell'],
    difficulty: 'beginner',
  },
  {
    id: 'cable_kickback',
    name: 'Cable Kickbacks',
    targetMuscles: ['glutes'],
    equipment: ['cable_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'glute_machine',
    name: 'Glute Machine',
    targetMuscles: ['glutes'],
    equipment: ['glute_machine'],
    difficulty: 'beginner',
  },

  // LEGS - Calves
  {
    id: 'calf_raise',
    name: 'Standing Calf Raise',
    targetMuscles: ['calves'],
    equipment: ['calf_raise_machine'],
    difficulty: 'beginner',
  },
  {
    id: 'seated_calf_raise',
    name: 'Seated Calf Raise',
    targetMuscles: ['calves'],
    equipment: ['calf_raise_machine'],
    difficulty: 'beginner',
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(ex => ex.id === id);
};

export const getExercisesByEquipment = (equipment: Equipment[]): Exercise[] => {
  return exercises.filter(ex => 
    ex.equipment.length === 0 || 
    ex.equipment.some(eq => equipment.includes(eq))
  );
};

export const getExercisesByMuscle = (muscle: MuscleGroup): Exercise[] => {
  return exercises.filter(ex => ex.targetMuscles.includes(muscle));
};
