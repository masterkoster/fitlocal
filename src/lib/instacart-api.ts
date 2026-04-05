// Instacart Shopping List API integration
// https://docs.instacart.com/developer_platform_api/api/products/create_shopping_list_page.html

const INSTACART_API_URL = 'https://connect.instacart.com/idp/v1/products/products_link';
const INSTACART_API_KEY = process.env.INSTACART_API_KEY || '';

export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit?: string;
}

export interface InstacartLinkResponse {
  products_link_url: string;
}

/**
 * Create a shopping list page on Instacart
 */
export async function createInstacartShoppingList(
  items: ShoppingListItem[],
  title: string = 'FitLocal Shopping List'
): Promise<string | null> {
  // If no API key, return null (can't create actual link)
  if (!INSTACART_API_KEY) {
    console.log('Instacart API key not configured');
    return null;
  }

  try {
    const response = await fetch(INSTACART_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INSTACART_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title,
        link_type: 'shopping_list',
        expires_in: 30, // Days until link expires
        line_items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit || 'each',
        })),
        instructions: [
          'High-protein foods for your fitness goals',
          'Check for store brands to save money',
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Instacart API error: ${response.status}`);
    }

    const data: InstacartLinkResponse = await response.json();
    return data.products_link_url;
  } catch (error) {
    console.error('Instacart API error:', error);
    return null;
  }
}

/**
 * Format shopping items for Instacart
 */
export function formatItemsForInstacart(items: Array<{
  name: string;
  quantity: number;
  unit: string;
}>): ShoppingListItem[] {
  return items.map(item => ({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
  }));
}

/**
 * Build a simple URL that opens Instacart with search terms
 * This works without an API key as a fallback
 */
export function buildInstacartSearchUrl(items: ShoppingListItem[]): string {
  const searchTerms = items
    .map(item => `${item.quantity} ${item.name}`)
    .join(', ');
  
  return `https://www.instacart.com/store/search?q=${encodeURIComponent(searchTerms)}`;
}

/**
 * Build direct store URLs for shopping
 */
export function buildStoreSearchUrls(
  items: ShoppingListItem[],
  store: 'walmart' | 'target' | 'kroger' | 'costco' | 'whole_foods' | 'aldi' | 'trader_joes' | 'amazon_fresh'
): string {
  const baseUrls: Record<string, string> = {
    walmart: 'https://www.walmart.com/search?q=',
    target: 'https://www.target.com/search?q=',
    kroger: 'https://www.kroger.com/search?q=',
    costco: 'https://www.costco.com/CatalogSearch?keyword=',
    whole_foods: 'https://www.wholefoodsmarket.com/search?text=',
    aldi: 'https://www.aldi.us/search?searchquery=',
    trader_joes: 'https://www.traderjoes.com/search?query=',
    amazon_fresh: 'https://www.amazon.com/fresh/search?k=',
  };

  const searchTerms = items.map(item => `${item.name}`).join('+');
  return `${baseUrls[store]}${encodeURIComponent(searchTerms)}`;
}

/**
 * Generate affiliate link with tracking
 * Note: Requires affiliate program enrollment
 */
export function buildAffiliateLink(
  productUrl: string,
  affiliate: 'walmart' | 'target' | 'kroger' | 'amazon'
): string {
  // In production, use actual affiliate links
  // These are placeholders
  const affiliatePrefixes: Record<string, string> = {
    walmart: 'https://goto.walmart.com/?',
    target: 'https://partner.target.com/track?',
    kroger: 'https://www.kroger.com/?',
    amazon: 'https://www.amazon.com/?',
  };

  // For now, just return the direct URL
  return productUrl;
}
