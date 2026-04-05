import { FoodItem, DailyMealPlan, Meal, MealFood, ShoppingList, ShoppingListItem, Macros } from '@/types';

// High-protein foods database (USDA-based approximations)
export const highProteinFoods: FoodItem[] = [
  // Poultry
  { id: 'chicken_breast', name: 'Chicken Breast', servingSize: '4 oz', calories: 130, protein: 26, carbs: 0, fat: 3, category: 'poultry' },
  { id: 'turkey_breast', name: 'Turkey Breast', servingSize: '4 oz', calories: 120, protein: 24, carbs: 0, fat: 2, category: 'poultry' },
  { id: 'ground_turkey', name: 'Ground Turkey 93% Lean', servingSize: '4 oz', calories: 170, protein: 22, carbs: 0, fat: 9, category: 'poultry' },
  
  // Fish
  { id: 'salmon', name: 'Salmon Fillet', servingSize: '4 oz', calories: 180, protein: 23, carbs: 0, fat: 10, category: 'fish' },
  { id: 'tuna', name: 'Tuna (canned in water)', servingSize: '4 oz', calories: 120, protein: 26, carbs: 0, fat: 1, category: 'fish' },
  { id: 'tilapia', name: 'Tilapia', servingSize: '4 oz', calories: 100, protein: 22, carbs: 0, fat: 1, category: 'fish' },
  { id: 'cod', name: 'Cod', servingSize: '4 oz', calories: 85, protein: 19, carbs: 0, fat: 0.5, category: 'fish' },
  { id: 'shrimp', name: 'Shrimp', servingSize: '4 oz', calories: 100, protein: 22, carbs: 0, fat: 0.5, category: 'fish' },
  
  // Beef
  { id: 'lean_beef', name: 'Ground Beef 93% Lean', servingSize: '4 oz', calories: 170, protein: 23, carbs: 0, fat: 8, category: 'beef' },
  { id: 'sirloin', name: 'Sirloin Steak', servingSize: '4 oz', calories: 160, protein: 26, carbs: 0, fat: 6, category: 'beef' },
  { id: 'eye_of_round', name: 'Eye of Round', servingSize: '4 oz', calories: 140, protein: 25, carbs: 0, fat: 3, category: 'beef' },
  
  // Dairy
  { id: 'greek_yogurt', name: 'Greek Yogurt 0%', servingSize: '170g', calories: 100, protein: 17, carbs: 6, fat: 0, category: 'dairy' },
  { id: 'cottage_cheese', name: 'Cottage Cheese 2%', servingSize: '1 cup', calories: 180, protein: 24, carbs: 8, fat: 4, category: 'dairy' },
  { id: 'skim_milk', name: 'Skim Milk', servingSize: '1 cup', calories: 80, protein: 8, carbs: 12, fat: 0, category: 'dairy' },
  { id: 'whey_protein', name: 'Whey Protein Powder', servingSize: '1 scoop', calories: 120, protein: 24, carbs: 3, fat: 1, category: 'protein_supplement' },
  { id: 'casein_protein', name: 'Casein Protein Powder', servingSize: '1 scoop', calories: 110, protein: 24, carbs: 2, fat: 0.5, category: 'protein_supplement' },
  
  // Eggs
  { id: 'whole_egg', name: 'Whole Egg', servingSize: '1 large', calories: 70, protein: 6, carbs: 0, fat: 5, category: 'eggs' },
  { id: 'egg_whites', name: 'Egg Whites', servingSize: '1 cup', calories: 60, protein: 12, carbs: 1, fat: 0, category: 'eggs' },
  
  // Legumes
  { id: 'black_beans', name: 'Black Beans', servingSize: '1/2 cup', calories: 110, protein: 8, carbs: 20, fat: 0, category: 'legumes' },
  { id: 'lentils', name: 'Lentils', servingSize: '1/2 cup', calories: 115, protein: 9, carbs: 20, fat: 0, category: 'legumes' },
  { id: 'chickpeas', name: 'Chickpeas', servingSize: '1/2 cup', calories: 135, protein: 7, carbs: 22, fat: 2, category: 'legumes' },
  { id: 'edamame', name: 'Edamame', servingSize: '1/2 cup', calories: 95, protein: 8, carbs: 8, fat: 4, category: 'legumes' },
  
  // Grains (higher protein options)
  { id: 'quinoa', name: 'Quinoa', servingSize: '1/2 cup cooked', calories: 110, protein: 4, carbs: 20, fat: 2, category: 'grains' },
  { id: 'oatmeal', name: 'Oatmeal', servingSize: '1/2 cup dry', calories: 150, protein: 5, carbs: 27, fat: 3, category: 'grains' },
  
  // Nuts
  { id: 'almonds', name: 'Almonds', servingSize: '1 oz', calories: 160, protein: 6, carbs: 6, fat: 14, category: 'nuts' },
  { id: 'peanut_butter', name: 'Peanut Butter', servingSize: '2 tbsp', calories: 190, protein: 7, carbs: 7, fat: 16, category: 'nuts' },
];

/**
 * Get foods by category
 */
export const getFoodsByCategory = (category: FoodItem['category']): FoodItem[] => {
  return highProteinFoods.filter(food => food.category === category);
};

/**
 * Get foods sorted by protein density (protein per calorie)
 */
export const getProteinDenseFoods = (): FoodItem[] => {
  return [...highProteinFoods]
    .map(food => ({
      ...food,
      proteinPerCalorie: food.protein / food.calories,
    }))
    .sort((a, b) => b.proteinPerCalorie - a.proteinPerCalorie)
    .map(({ proteinPerCalorie, ...food }) => food);
};

/**
 * Calculate servings needed to hit protein target
 */
export const calculateServings = (food: FoodItem, targetProtein: number): number => {
  return Math.ceil(targetProtein / food.protein);
};

/**
 * Generate a day's meal plan
 */
export const generateDailyMealPlan = (
  dailyProtein: number,
  dailyCalories: number
): Meal[] => {
  const meals: Meal[] = [];
  
  // Distribute protein across meals (breakfast, lunch, dinner, snacks)
  const proteinDistribution = {
    breakfast: 0.25,  // 25% of daily protein
    lunch: 0.30,      // 30%
    dinner: 0.30,     // 30%
    snack: 0.15,      // 15%
  };

  const mealNames: Array<Meal['name']> = ['breakfast', 'lunch', 'dinner', 'snack'];

  mealNames.forEach(mealName => {
    const targetProtein = Math.round(dailyProtein * proteinDistribution[mealName]);
    
    // Select best food for this meal
    const food = selectFoodForMeal(mealName);
    
    const servings = calculateServings(food, targetProtein);
    const protein = Math.round(food.protein * servings);
    const calories = Math.round(food.calories * servings);

    meals.push({
      name: mealName,
      foods: [{
        food,
        servings,
        protein,
        calories,
      }],
      macros: {
        protein,
        carbs: food.carbs * servings,
        fat: food.fat * servings,
        calories,
      },
    });
  });

  return meals;
};

/**
 * Select appropriate food for meal type
 */
const selectFoodForMeal = (mealType: Meal['name']): FoodItem => {
  const proteinDenseFoods = getProteinDenseFoods();
  
  switch (mealType) {
    case 'breakfast':
      // Prefer eggs and dairy for breakfast
      const breakfastOptions = proteinDenseFoods.filter(
        f => f.category === 'eggs' || f.category === 'dairy' || f.category === 'protein_supplement'
      );
      return breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)] || proteinDenseFoods[0];
    
    case 'lunch':
      // Prefer poultry and fish
      const lunchOptions = proteinDenseFoods.filter(
        f => f.category === 'poultry' || f.category === 'fish'
      );
      return lunchOptions[Math.floor(Math.random() * lunchOptions.length)] || proteinDenseFoods[0];
    
    case 'dinner':
      // Mix of everything
      return proteinDenseFoods[Math.floor(Math.random() * Math.min(proteinDenseFoods.length, 10))];
    
    case 'snack':
      // Protein supplements or dairy
      const snackOptions = proteinDenseFoods.filter(
        f => f.category === 'protein_supplement' || f.category === 'dairy'
      );
      return snackOptions[Math.floor(Math.random() * snackOptions.length)] || proteinDenseFoods[0];
    
    default:
      return proteinDenseFoods[0];
  }
};

/**
 * Generate a week's meal plan
 */
export const generateWeeklyMealPlan = (
  dailyMacros: Macros
): DailyMealPlan[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealPlans: DailyMealPlan[] = [];

  days.forEach(day => {
    const meals = generateDailyMealPlan(dailyMacros.protein, dailyMacros.calories);
    
    const totalMacros = meals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fat: acc.fat + meal.macros.fat,
        calories: acc.calories + meal.macros.calories,
      }),
      { protein: 0, carbs: 0, fat: 0, calories: 0 }
    );

    mealPlans.push({
      day,
      meals,
      totalMacros,
    });
  });

  return mealPlans;
};

/**
 * Generate shopping list from weekly meal plan
 */
export const generateShoppingList = (weeklyPlan: DailyMealPlan[]): ShoppingList => {
  const itemCounts: Record<string, { item: FoodItem; totalServings: number }> = {};

  // Aggregate all foods across the week
  weeklyPlan.forEach(day => {
    day.meals.forEach(meal => {
      meal.foods.forEach(mealFood => {
        const existing = itemCounts[mealFood.food.id];
        if (existing) {
          existing.totalServings += mealFood.servings;
        } else {
          itemCounts[mealFood.food.id] = {
            item: mealFood.food,
            totalServings: mealFood.servings,
          };
        }
      });
    });
  });

  // Convert to shopping list items
  const items: ShoppingListItem[] = Object.values(itemCounts).map(({ item, totalServings }) => ({
    id: item.id,
    name: item.name,
    quantity: totalServings,
    unit: item.servingSize,
    category: item.category,
  }));

  const totalProtein = weeklyPlan.reduce((sum, day) => sum + day.totalMacros.protein, 0);

  return {
    items,
    totalProtein,
  };
};

/**
 * Format shopping list for Instacart API
 */
export const formatForInstacart = (list: ShoppingList): {
  title: string;
  instructions: string[];
  line_items: Array<{ name: string; quantity: number; unit: string }>;
} => {
  return {
    title: 'FitLocal - Weekly High Protein Shopping List',
    instructions: [
      `Shopping for approximately ${list.totalProtein}g of protein this week.`,
      'Look for the freshest options available.',
      'Frozen proteins are a great budget-friendly alternative.',
    ],
    line_items: list.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
    })),
  };
};

/**
 * Calculate estimated cost of shopping list (rough estimates)
 */
export const estimateShoppingCost = (list: ShoppingList): number => {
  // Very rough cost estimates per serving
  const costPerServing: Record<string, number> = {
    chicken_breast: 2.50,
    turkey_breast: 2.50,
    ground_turkey: 3.00,
    salmon: 4.00,
    tuna: 1.00,
    tilapia: 2.00,
    cod: 3.00,
    shrimp: 4.00,
    lean_beef: 3.50,
    sirloin: 4.00,
    eye_of_round: 3.00,
    greek_yogurt: 1.50,
    cottage_cheese: 2.00,
    skim_milk: 0.50,
    whey_protein: 1.00,
    casein_protein: 1.00,
    whole_egg: 0.30,
    egg_whites: 1.00,
    black_beans: 0.75,
    lentils: 0.75,
    chickpeas: 0.75,
    edamame: 1.50,
    quinoa: 1.00,
    oatmeal: 0.75,
    almonds: 1.50,
    peanut_butter: 1.00,
  };

  return list.items.reduce((total, item) => {
    const costPer = costPerServing[item.id] || 1.50;
    return total + costPer * item.quantity;
  }, 0);
};
