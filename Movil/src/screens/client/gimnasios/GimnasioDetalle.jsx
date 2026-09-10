import { ScreenPlaceholder } from '@/components/ScreenPlaceholder';

export default function GimnasioDetalle({ route }) {
  const { id } = route.params ?? {};
  return (
    <ScreenPlaceholder
      title={`Gimnasio ${id ?? ''}`}
      owner="Pablo"
      source="Web - Client/GimnasioDetalle.jsx (+ Reseñas.jsx embebido)"
      note="El id llega por route.params. Botón de membresía -> navigation.navigate('PagoMembresia', {...})"
    />
  );
}
