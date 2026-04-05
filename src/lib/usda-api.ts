// USDA FoodData Central API integration
// Free API: https://fdc.nal.usda.gov/api-guide.html

const USDA_API_KEY = process.env.USDA_API_KEY || '';
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export interface USDAFoodItem {
  fdcId: number;
  description: string;
  brandOwner?: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
}

export interface SearchResult {
  foods: USDAFoodItem[];
  totalHits: number;
}

// Nutrient IDs for macros
export const NUTRIENTS = {
  PROTEIN: 1003,
  CARBS: 1005,
  FAT: 1004,
  CALORIES: 1008,
} as const;

/**
 * Search foods in USDA database
 */
export async function searchFoods(query: string, pageSize: number = 10): Promise<SearchResult> {
  const url = `${USDA_BASE_URL}/foods/search`;
  
  try {
    const params = new URLSearchParams({
      api_key: USDA_API_KEY || 'DEMO_KEY', // DEMO_KEY works but limited
      query,
      pageSize: pageSize.toString(),
      dataType: 'Foundation,SR Legacy,Branded',
    });

    const response = await fetch(`${url}?${params}`);
    
    if (!response.ok) {
      throw new Error(`USDA API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      foods: data.foods || [],
      totalHits: data.totalHits || 0,
    };
  } catch (error) {
    console.error('USDA search error:', error);
    return { foods: [], totalHits: 0 };
  }
}

/**
 * Get detailed food info by ID
 */
export async function getFoodDetails(fdcId: number): Promise<USDAFoodItem | null> {
  const url = `${USDA_BASE_URL}/food/${fdcId}`;
  
  try {
    const params = new URLSearchParams({
      api_key: USDA_API_KEY || 'DEMO_KEY',
    });

    const response = await fetch(`${url}?${params}`);
    
    if (!response.ok) {
      throw new Error(`USDA API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('USDA food details error:', error);
    return null;
  }
}

/**
 * Extract macro nutrients from USDA food item
 */
export function extractMacros(food: USDAFoodItem): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
} {
  const getNutrient = (id: number): number => {
    const nutrient = food.foodNutrients.find(n => n.nutrientId === id);
    return nutrient?.value || 0;
  };

  return {
    calories: getNutrient(NUTRIENTS.CALORIES),
    protein: getNutrient(NUTRIENTS.PROTEIN),
    carbs: getNutrient(NUTRIENTS.CARBS),
    fat: getNutrient(NUTRIENTS.FAT),
  };
}

/**
 * Search for high-protein foods
 */
export async function searchHighProteinFoods(query: string): Promise<Array<{
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}>> {
  const result = await searchFoods(query, 15);
  
  return result.foods.map(food => {
    const macros = extractMacros(food);
    return {
      id: food.fdcId,
      name: food.description.substring(0, 100),
      ...macros,
    };
  }).filter(f => f.protein > 0); // Filter out items with no protein data
}

/**
 * Common high-protein search queries
 */
export const HIGH_PROTEIN_SEARCHES = [
  'chicken breast',
  'salmon',
  'turkey',
  'tuna',
  'eggs',
  'greek yogurt',
  'cottage cheese',
  'beef',
  'protein powder',
  'shrimp',
  'tofu',
  'tempeh',
  'pork tenderloin',
];

/**
 * Pre-load common high-protein foods (can be cached)
 */
export async function loadHighProteinFoods(): Promise<Array<{
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}>> {
  const allFoods: Array<{
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }> = [];

  // Search for common high-protein foods
  for (const query of HIGH_PROTEIN_SEARCHES) {
    const results = await searchHighProteinFoods(query);
    allFoods.push(...results);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Remove duplicates by ID
  const uniqueFoods = allFoods.filter((food, index, self) => 
    index === self.findIndex(f => f.id === food.id)
  );

  // Sort by protein density
  return uniqueFoods.sort((a, b) => {
    const densityA = a.protein / (a.calories || 1);
    const densityB = b.protein / (b.calories || 1);
    return densityB - densityA;
  });
}
