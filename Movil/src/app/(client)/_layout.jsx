/**
 * LA NAV del cliente — port de `empaquetacion/src/Components/Nav2_web.jsx`.
 *
 * En web era una barra superior con enlaces (Inicio · Gimnasios · Tienda · Carrito)
 * + píldora de perfil. En native se convierte en la barra de tabs inferior, que es
 * lo que muestran los bocetos. Mismos 5 destinos, sin añadir ninguno.
 *
 * Cada tab es una carpeta con su propio Stack, así las pantallas de detalle
 * (gimnasios/[id], tienda/[id], carrito/pago...) se abren "encima" sin salir del tab.
 */
import { Tabs } from 'expo-router';
import { Dumbbell, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native';

import { Brand } from '@/theme/brand';

export default function ClientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Brand.greenDark,
        tabBarInactiveTintColor: Brand.muted,
        tabBarStyle: {
          backgroundColor: Brand.white,
          borderTopColor: '#DDE4D6',
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="gimnasios"
        options={{
          title: 'Gimnasios',
          tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tienda"
        options={{
          title: 'Tienda',
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
