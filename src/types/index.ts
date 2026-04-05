// User Profile Types
export interface UserProfile {
  height: {
    feet: number;
    inches: number;
  };
  weight: number; // in lbs
  age: number;
  sex: 'male' | 'female';
  currentBodyFat: number; // percentage
  targetBodyFat: number; // percentage
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
}

export type ActivityLevel = 
  | 'sedentary' 
  | 'light' 
  | 'moderate' 
  | 'active' 
  | 'very_active';

export type FitnessGoal = 
  | 'cut'           // Lose fat
  | 'lean_bulk'     // Build muscle with minimal fat gain
  | 'bulk'          // Build muscle (may gain some fat)
  | 'recomp'        // Simultaneously build muscle and lose fat
  | 'maintain';     // Maintain current state

// Body Composition Results
export interface BodyMetrics {
  heightCm: number;
  weightKg: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  leanMass: number;
  targetWeight: number;
  weightChangeNeeded: number;
  macros: Macros;
}

export interface Macros {
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
  calories: number;
}

// Workout Types
export interface GymChain {
  id: string;
  name: string;
  equipment: Equipment[];
  description: string;
}

export type Equipment = 
  | 'barbell'
  | 'dumbbell'
  | 'smith_machine'
  | 'cable_machine'
  | 'leg_press'
  | 'leg_curl'
  | 'leg_extension'
  | 'lat_pulldown'
  | 'seated_row'
  | 'chest_press'
  | 'shoulder_press'
  | 'dip_station'
  | 'pullup_bar'
  | 'ez_curl_bar'
  | 'calf_raise_machine'
  | 'hack_squat'
  | 'hack_squat_machine'
  | 'romanian_deadlift_machine'
  | 'glute_machine'
  | 'ab_wheel'
  | 'cable_row'
  | 'pec_dec'
  | 'fly_machine'
  | 'assisted_pullup'
  | 'smith_squat'
  | 'smith_leg_press';

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: MuscleGroup[];
  equipment: Equipment[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string;
}

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'abs'
  | 'traps'
  | 'lats';

export type WorkoutDay = 'push' | 'pull' | 'legs' | 'rest';

export interface WorkoutPlan {
  days: WorkoutDayPlan[];
}

export interface WorkoutDayPlan {
  day: number;
  name: string;
  type: WorkoutDay;
  exercises: ExerciseAssignment[];
}

export interface ExerciseAssignment {
  exercise: Exercise;
  sets: number;
  reps: string; // e.g., "8-12" or "AMRAP"
  rest: number; // seconds
  notes?: string;
}

// Food/Nutrition Types
export interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbs: number;  // grams
  fat: number;    // grams
  category: FoodCategory;
}

export type FoodCategory = 
  | 'poultry'
  | 'fish'
  | 'beef'
  | 'pork'
  | 'dairy'
  | 'eggs'
  | 'legumes'
  | 'protein_supplement'
  | 'grains'
  | 'vegetables'
  | 'fruits'
  | 'nuts';

export interface DailyMealPlan {
  day: string;
  meals: Meal[];
  totalMacros: Macros;
}

export interface Meal {
  name: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: MealFood[];
  macros: Macros;
}

export interface MealFood {
  food: FoodItem;
  servings: number;
  protein: number;
  calories: number;
}

// Shopping Types
export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: FoodCategory;
  estimatedPrice?: number;
}

export interface ShoppingList {
  items: ShoppingListItem[];
  totalProtein: number;
  estimatedTotal?: number;
  instacartUrl?: string;
}

// Store Types
export interface Store {
  id: string;
  name: string;
  logoUrl: string;
  affiliateUrl?: string;
  availableOnInstacart: boolean;
}
