import { useLocalSearchParams } from 'expo-router';

import { ScreenPlaceholder } from '@/components/screen-placeholder';

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams();
  return (
    <ScreenPlaceholder
      title={`Producto ${id ?? ''}`}
      owner="Edgar"
      source="Web - Client/ProductoDetalle.jsx"
      note="El :id llega por useLocalSearchParams(). Usa useCarShop() para 'Agregar al carrito'."
    />
  );
}
