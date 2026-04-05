import { NextRequest, NextResponse } from 'next/server';
import { createInstacartShoppingList, formatItemsForInstacart, buildInstacartSearchUrl } from '@/lib/instacart-api';

interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, store, title } = body as {
      items: ShoppingItem[];
      store: string;
      title?: string;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 });
    }

    // Try to create Instacart link
    const instacartUrl = await createInstacartShoppingList(
      formatItemsForInstacart(items),
      title || 'FitLocal Shopping List'
    );

    // Also provide fallback URLs
    const fallbackUrl = buildInstacartSearchUrl(items);

    return NextResponse.json({
      success: true,
      links: {
        instacart: instacartUrl,
        instacartSearch: fallbackUrl,
        // Add direct store URLs based on selection
        storeSearch: store ? `/api/shopping/store?items=${encodeURIComponent(JSON.stringify(items))}&store=${store}` : null,
      },
    });
  } catch (error) {
    console.error('Shopping list error:', error);
    return NextResponse.json({ error: 'Failed to create shopping list' }, { status: 500 });
  }
}
