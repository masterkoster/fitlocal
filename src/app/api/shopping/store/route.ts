import { NextRequest, NextResponse } from 'next/server';
import { buildStoreSearchUrls } from '@/lib/instacart-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const itemsParam = searchParams.get('items');
  const store = searchParams.get('store') as 'walmart' | 'target' | 'kroger' | 'costco' | 'whole_foods' | 'aldi' | 'trader_joes' | 'amazon_fresh';

  if (!itemsParam || !store) {
    return NextResponse.json({ error: 'Items and store parameters are required' }, { status: 400 });
  }

  try {
    const items = JSON.parse(itemsParam);
    
    const searchUrl = buildStoreSearchUrls(items, store);

    return NextResponse.json({
      store,
      searchUrl,
    });
  } catch (error) {
    console.error('Store search error:', error);
    return NextResponse.json({ error: 'Failed to generate store URL' }, { status: 500 });
  }
}
