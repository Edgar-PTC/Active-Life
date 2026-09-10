import { Redirect } from 'expo-router';

import { useAuth } from '@/context/session-context';

/** Ruta de entrada: manda al grupo correcto según haya sesión o no. */
export default function Index() {
  const { isLoggedIn } = useAuth();
  return <Redirect href={isLoggedIn ? '/(client)/inicio' : '/(auth)/acceder'} />;
}
