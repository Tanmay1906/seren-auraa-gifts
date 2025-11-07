export interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  // optional free-text details entered at checkout (e.g., personalization, gift note)
  details?: string;
}

const CART_KEY = 'cart_items_v1';
const WISHLIST_KEY = 'wishlist_items_v1';

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    console.error('Error reading cart from storage', e);
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving cart to storage', e);
  }
}

export function addToCart(item: { id: string; title: string; price: number; image?: string }) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function getWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch (e) {
    console.error('Error reading wishlist from storage', e);
    return [];
  }
}

export function saveWishlist(list: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving wishlist to storage', e);
  }
}

export function isInWishlist(id: string) {
  return getWishlist().includes(id);
}

export function toggleWishlist(id: string) {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(id);
  }
  saveWishlist(list);
  return list.includes(id);
}

export {};
