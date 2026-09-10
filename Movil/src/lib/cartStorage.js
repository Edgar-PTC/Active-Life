/**
 * Persistencia local del carrito (equivalente a localStorage["authCarShop"] de la web).
 * Forma guardada: { productos: [{ productId, quantity, name?, image?, precioUni?, subtotal? }], total? }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'authCarShop';
const EMPTY_CART = { productos: [] };

export async function getLocalCart() {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    if (!raw) return { ...EMPTY_CART };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.productos)) return { ...EMPTY_CART };
    return parsed;
  } catch (error) {
    console.log('Error leyendo carrito local:', error);
    return { ...EMPTY_CART };
  }
}

export async function setLocalCart(cart) {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart ?? EMPTY_CART));
  } catch (error) {
    console.log('Error guardando carrito local:', error);
  }
}

export async function clearLocalCart() {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.log('Error limpiando carrito local:', error);
  }
}
