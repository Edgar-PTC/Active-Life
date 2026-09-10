import { ScreenPlaceholder } from '@/components/ScreenPlaceholder';

export default function ProductoDetalle({ route }) {
  const { id } = route.params ?? {};
  return (
    <ScreenPlaceholder
      title={`Producto ${id ?? ''}`}
      owner="Edgar"
      source="Web - Client/ProductoDetalle.jsx"
      note="El id llega por route.params. Usa useCarShop() para 'Agregar al carrito'."
    />
  );
}
