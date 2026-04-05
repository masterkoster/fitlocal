// ExerciseDB API integration
// Free API: https://exercisedb.io/

const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const EXERCISE_DB_KEY = process.env.EXERCISE_DB_KEY || '';

export interface ExerciseDBExercise {
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  equipment: string;
  gifUrl: string;
  instructions: string[];
  bodyPart: string;
}

export interface ExerciseFilters {
  muscle?: string;
  equipment?: string;
  difficulty?: string;
  name?: string;
}

/**
 * Search exercises from ExerciseDB
 */
export async function searchExercises(filters: ExerciseFilters = {}): Promise<ExerciseDBExercise[]> {
  const headers: HeadersInit = {
    'X-RapidAPI-Key': EXERCISE_DB_KEY || 'demo',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  };

  try {
    // If searching by name
    if (filters.name) {
      const response = await fetch(
        `${EXERCISE_DB_BASE_URL}/exercises/name/${encodeURIComponent(filters.name)}`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`ExerciseDB error: ${response.status}`);
      }
      
      return await response.json();
    }

    // If searching all with filters
    const params = new URLSearchParams();
    if (filters.muscle) params.set('muscle', filters.muscle);
    if (filters.equipment) params.set('equipment', filters.equipment);

    const url = params.toString() 
      ? `${EXERCISE_DB_BASE_URL}/exercises?${params}`
      : `${EXERCISE_DB_BASE_URL}/exercises`;

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`ExerciseDB error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ExerciseDB search error:', error);
    return [];
  }
}

/**
 * Get exercise by ID
 */
export async function getExerciseById(id: string): Promise<ExerciseDBExercise | null> {
  try {
    const response = await fetch(`${EXERCISE_DB_BASE_URL}/exercises/exercise/${id}`, {
      headers: {
        'X-RapidAPI-Key': EXERCISE_DB_KEY || 'demo',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    
    if (!response.ok) {
      throw new Error(`ExerciseDB error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ExerciseDB get by ID error:', error);
    return null;
  }
}

/**
 * Get exercises by muscle group
 */
export async function getExercisesByMuscle(muscle: string): Promise<ExerciseDBExercise[]> {
  return searchExercises({ muscle });
}

/**
 * Get exercises by equipment
 */
export async function getExercisesByEquipment(equipment: string): Promise<ExerciseDBExercise[]> {
  return searchExercises({ equipment });
}

// Equipment mapping to ExerciseDB format
export const EQUIPMENT_MAP: Record<string, string> = {
  barbell: 'barbell',
  dumbbell: 'dumbbell',
  smith_machine: 'smith machine',
  cable_machine: 'cable',
  leg_press: 'leverage machine',
  leg_curl: 'leverage machine',
  leg_extension: 'leverage machine',
  lat_pulldown: 'cable',
  seated_row: 'cable',
  chest_press: 'leverage machine',
  shoulder_press: 'leverage machine',
  dip_station: 'body weight',
  pullup_bar: 'body weight',
  ez_curl_bar: 'e-z hook barbell',
  calf_raise_machine: 'leverage machine',
  hack_squat: 'leverage machine',
  pec_dec: 'leverage machine',
  fly_machine: 'leverage machine',
  assisted_pullup: 'assisted',
};

// Muscle mapping
export const MUSCLE_MAP: Record<string, string> = {
  chest: 'chest',
  back: 'back',
  shoulders: 'shoulders',
  biceps: 'biceps',
  triceps: 'triceps',
  forearms: 'forearms',
  quads: 'quads',
  hamstrings: 'hamstrings',
  glutes: 'glutes',
  calves: 'calves',
  abs: 'abs',
  traps: 'traps',
  lats: 'lats',
};

/**
 * Get exercises for gym equipment
 */
export async function getExercisesForEquipment(equipmentList: string[]): Promise<ExerciseDBExercise[]> {
  const exercises: ExerciseDBExercise[] = [];
  
  for (const equipment of equipmentList) {
    const dbEquipment = EQUIPMENT_MAP[equipment] || equipment;
    const results = await getExercisesByEquipment(dbEquipment);
    exercises.push(...results);
  }

  // Remove duplicates
  const unique = exercises.filter((ex, index, self) => 
    index === self.findIndex(e => e.id === ex.id)
  );

  return unique;
}

/**
 * Get exercises for push/pull/legs
 */
export async function getExercisesForSplit(split: 'push' | 'pull' | 'legs'): Promise<ExerciseDBExercise[]> {
  const muscleGroups: Record<string, string[]> = {
    push: ['chest', 'shoulders', 'triceps'],
    pull: ['back', 'biceps', 'traps'],
    legs: ['quads', 'hamstrings', 'glutes', 'calves'],
  };

  const muscles = muscleGroups[split];
  const exercises: ExerciseDBExercise[] = [];

  for (const muscle of muscles) {
    const dbMuscle = MUSCLE_MAP[muscle] || muscle;
    const results = await getExercisesByMuscle(dbMuscle);
    exercises.push(...results);
  }

  // Remove duplicates and limit
  const unique = exercises.filter((ex, index, self) => 
    index === self.findIndex(e => e.id === ex.id)
  );

  return unique.slice(0, 50); // Limit to prevent too many results
}
