import { NextRequest, NextResponse } from 'next/server';
import { searchFoods, extractMacros, HIGH_PROTEIN_SEARCHES } from '@/lib/usda-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const pageSize = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const result = await searchFoods(query, pageSize);
    
    // Format results to include just what we need
    const foods = result.foods.map(food => ({
      id: food.fdcId,
      name: food.description,
      brand: food.brandOwner || null,
      macros: extractMacros(food),
    }));

    return NextResponse.json({
      foods,
      totalHits: result.totalHits,
    });
  } catch (error) {
    console.error('Food search error:', error);
    return NextResponse.json({ error: 'Failed to search foods' }, { status: 500 });
  }
}
