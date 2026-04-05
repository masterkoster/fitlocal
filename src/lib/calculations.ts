import { UserProfile, BodyMetrics, Macros, ActivityLevel, FitnessGoal } from '@/types';

// Activity level multipliers for TDEE calculation
const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Caloric adjustments based on goal
const goalAdjustments: Record<FitnessGoal, number> = {
  cut: -500,           // 500 calorie deficit
  lean_bulk: 250,      // 250 calorie surplus (minimal fat gain)
  bulk: 500,           // 500 calorie surplus (may gain more fat)
  recomp: 0,           // Maintenance calories
  maintain: 0,         // Maintenance calories
};

// Protein per kg bodyweight based on goal
const proteinMultipliers: Record<FitnessGoal, number> = {
  cut: 2.2,            // Higher protein during cut to preserve muscle
  lean_bulk: 2.0,
  bulk: 1.8,
  recomp: 2.2,
  maintain: 1.6,
};

/**
 * Convert height from feet/inches to centimeters
 */
export const heightToCm = (feet: number, inches: number): number => {
  return (feet * 12 + inches) * 2.54;
};

/**
 * Convert weight from pounds to kilograms
 */
export const lbsToKg = (lbs: number): number => {
  return lbs * 0.453592;
};

/**
 * Convert weight from kilograms to pounds
 */
export const kgToLbs = (kg: number): number => {
  return kg * 2.20462;
};

/**
 * Calculate BMR using Mifflin-St Jeor equation
 * Most accurate formula for most people
 */
export const calculateBMR = (
  heightCm: number,
  weightKg: number,
  age: number,
  sex: 'male' | 'female'
): number => {
  // Mifflin-St Jeor Equation
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  
  // Adjust for sex
  return sex === 'male' ? baseBMR + 5 : baseBMR - 161;
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return Math.round(bmr * activityMultipliers[activityLevel]);
};

/**
 * Calculate target calories based on goal
 */
export const calculateTargetCalories = (
  tdee: number,
  goal: FitnessGoal
): number => {
  return Math.round(tdee + goalAdjustments[goal]);
};

/**
 * Calculate lean body mass
 */
export const calculateLeanMass = (
  weightKg: number,
  bodyFatPercent: number
): number => {
  return weightKg * (1 - bodyFatPercent / 100);
};

/**
 * Calculate target weight based on target body fat percentage
 */
export const calculateTargetWeight = (
  leanMassKg: number,
  targetBodyFatPercent: number
): number => {
  return leanMassKg / (1 - targetBodyFatPercent / 100);
};

/**
 * Calculate macronutrient targets
 */
export const calculateMacros = (
  targetCalories: number,
  weightKg: number,
  goal: FitnessGoal
): Macros => {
  // Protein: based on bodyweight and goal
  const proteinPerKg = proteinMultipliers[goal];
  const protein = Math.round(weightKg * proteinPerKg);
  const proteinCalories = protein * 4;

  // Fat: 0.8-1g per kg bodyweight (hormone support)
  const fat = Math.round(weightKg * 0.9);
  const fatCalories = fat * 9;

  // Carbs: remainder of calories
  const carbsCalories = targetCalories - proteinCalories - fatCalories;
  const carbs = Math.round(carbsCalories / 4);

  return {
    protein,
    carbs,
    fat,
    calories: targetCalories,
  };
};

/**
 * Calculate estimated time to reach goal based on weight change rate
 */
export const calculateTimeToGoal = (
  currentWeightKg: number,
  targetWeightKg: number,
  goal: FitnessGoal
): { weeks: number; months: number; description: string } => {
  const weightDiff = Math.abs(currentWeightKg - targetWeightKg);
  
  // Weight change rates per week
  const weeklyRates: Record<FitnessGoal, number> = {
    cut: 0.5,          // 0.5kg/week safe fat loss
    lean_bulk: 0.25,    // 0.25kg/week lean muscle gain
    bulk: 0.5,          // 0.5kg/week muscle + some fat
    recomp: 0.1,        // Very slow recomposition
    maintain: 0,
  };

  const weeklyRate = weeklyRates[goal];
  
  if (weeklyRate === 0 || weightDiff < 0.1) {
    return {
      weeks: 0,
      months: 0,
      description: 'You are at or near your target!',
    };
  }

  const weeks = Math.ceil(weightDiff / weeklyRate);
  const months = Math.round(weeks / 4);

  return {
    weeks,
    months,
    description: months < 1 
      ? `Approximately ${weeks} weeks`
      : `Approximately ${months} month${months > 1 ? 's' : ''}`,
  };
};

/**
 * Calculate weekly protein target
 */
export const calculateWeeklyProtein = (dailyProtein: number): number => {
  return dailyProtein * 7;
};

/**
 * Main function to calculate all body metrics
 */
export const calculateBodyMetrics = (profile: UserProfile): BodyMetrics => {
  // Convert measurements
  const heightCm = heightToCm(profile.height.feet, profile.height.inches);
  const weightKg = lbsToKg(profile.weight);

  // Calculate BMR
  const bmr = Math.round(calculateBMR(heightCm, weightKg, profile.age, profile.sex));

  // Calculate TDEE
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  // Calculate target calories
  const targetCalories = calculateTargetCalories(tdee, profile.goal);

  // Calculate lean mass
  const leanMass = calculateLeanMass(weightKg, profile.currentBodyFat);

  // Calculate target weight
  const targetWeightKg = calculateTargetWeight(leanMass, profile.targetBodyFat);
  const targetWeightLbs = kgToLbs(targetWeightKg);

  // Calculate macros
  const macros = calculateMacros(targetCalories, weightKg, profile.goal);

  // Calculate weight change needed
  const weightChangeNeeded = targetWeightLbs - profile.weight;

  return {
    heightCm,
    weightKg,
    bmr,
    tdee,
    targetCalories,
    leanMass: Math.round(leanMass * 10) / 10,
    targetWeight: Math.round(targetWeightLbs * 10) / 10,
    weightChangeNeeded: Math.round(weightChangeNeeded * 10) / 10,
    macros,
  };
};

/**
 * Get activity level description
 */
export const getActivityDescription = (level: ActivityLevel): string => {
  const descriptions: Record<ActivityLevel, string> = {
    sedentary: 'Little or no exercise, desk job',
    light: 'Light exercise 1-3 days/week',
    moderate: 'Moderate exercise 3-5 days/week',
    active: 'Hard exercise 6-7 days/week',
    very_active: 'Very hard exercise, physical job',
  };
  return descriptions[level];
};

/**
 * Get goal description
 */
export const getGoalDescription = (goal: FitnessGoal): string => {
  const descriptions: Record<FitnessGoal, string> = {
    cut: 'Lose fat while preserving muscle',
    lean_bulk: 'Build muscle with minimal fat gain',
    bulk: 'Build muscle (may gain some fat)',
    recomp: 'Build muscle and lose fat simultaneously',
    maintain: 'Maintain current physique',
  };
  return descriptions[goal];
};

/**
 * Format body fat percentage to display string
 */
export const formatBodyFat = (bf: number): string => {
  return `${bf.toFixed(1)}%`;
};

/**
 * Get body fat category
 */
export const getBodyFatCategory = (bf: number, sex: 'male' | 'female'): string => {
  if (sex === 'male') {
    if (bf < 10) return 'Essential';
    if (bf < 15) return 'Athletic';
    if (bf < 20) return 'Fitness';
    if (bf < 25) return 'Average';
    return 'Above Average';
  } else {
    if (bf < 14) return 'Essential';
    if (bf < 20) return 'Athletic';
    if (bf < 25) return 'Fitness';
    if (bf < 32) return 'Average';
    return 'Above Average';
  }
};
