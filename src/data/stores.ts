import { Store } from '@/types';

export const stores: Store[] = [
  {
    id: 'walmart',
    name: 'Walmart',
    logoUrl: '/stores/walmart.svg',
    affiliateUrl: 'https://goto.walmart.com/',
    availableOnInstacart: true,
  },
  {
    id: 'target',
    name: 'Target',
    logoUrl: '/stores/target.svg',
    affiliateUrl: 'https://partner.target.com/',
    availableOnInstacart: true,
  },
  {
    id: 'kroger',
    name: 'Kroger',
    logoUrl: '/stores/kroger.svg',
    affiliateUrl: 'https://www.kroger.com/',
    availableOnInstacart: true,
  },
  {
    id: 'costco',
    name: 'Costco',
    logoUrl: '/stores/costco.svg',
    affiliateUrl: 'https://www.costco.com/',
    availableOnInstacart: true,
  },
  {
    id: 'aldi',
    name: 'Aldi',
    logoUrl: '/stores/aldi.svg',
    availableOnInstacart: false, // Limited availability
  },
  {
    id: 'trader_joes',
    name: "Trader Joe's",
    logoUrl: '/stores/trader-joes.svg',
    availableOnInstacart: true,
  },
  {
    id: 'whole_foods',
    name: 'Whole Foods',
    logoUrl: '/stores/whole-foods.svg',
    affiliateUrl: 'https://www.wholefoodsmarket.com/',
    availableOnInstacart: true,
  },
  {
    id: 'amazon_fresh',
    name: 'Amazon Fresh',
    logoUrl: '/stores/amazon-fresh.svg',
    affiliateUrl: 'https://www.amazon.com/fresh',
    availableOnInstacart: false,
  },
  {
    id: 'instacart',
    name: 'Instacart (Multi-Store)',
    logoUrl: '/stores/instacart.svg',
    availableOnInstacart: true,
    affiliateUrl: 'https://www.instacart.com/',
  },
  {
    id: 'local_other',
    name: 'Local Store / Other',
    logoUrl: '/stores/generic.svg',
    availableOnInstacart: false,
  },
];

export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};

export const getInstacartStores = (): Store[] => {
  return stores.filter(store => store.availableOnInstacart);
};
