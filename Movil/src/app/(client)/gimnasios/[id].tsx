import { useLocalSearchParams } from 'expo-router';

import { ScreenPlaceholder } from '@/components/screen-placeholder';

export default function GimnasioDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ScreenPlaceholder
      title={`Gimnasio ${id ?? ''}`}
      owner="Pablo"
      source="Web - Client/GimnasioDetalle.jsx (+ Reseñas.jsx embebido)"
      note="El :id llega por useLocalSearchParams(). Botón de membresía -> /(client)/gimnasios/pago-membresia"
    />
  );
}
