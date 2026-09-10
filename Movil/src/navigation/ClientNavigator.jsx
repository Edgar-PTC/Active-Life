/**
 * LA NAV del cliente — port de `empaquetacion/src/Components/Nav2_web.jsx`.
 *
 * En web era una barra superior con enlaces (Inicio · Gimnasios · Tienda · Carrito)
 * + píldora de perfil. En native es la barra de tabs inferior, que es lo que
 * muestran los bocetos. Mismos 5 destinos, sin añadir ninguno.
 *
 * Cada tab con pantallas de detalle lleva su propio stack anidado, así el detalle
 * (GimnasioDetalle, ProductoDetalle, PagoCarrito...) se abre "encima" sin salir del tab.
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dumbbell, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native';

import { Brand } from '@/theme/brand';

import Inicio from '@/screens/client/Inicio';
import Carrito from '@/screens/client/carrito/Carrito';
import PagoCarrito from '@/screens/client/carrito/PagoCarrito';
import GimnasioDetalle from '@/screens/client/gimnasios/GimnasioDetalle';
import Gimnasios from '@/screens/client/gimnasios/Gimnasios';
import PagoMembresia from '@/screens/client/gimnasios/PagoMembresia';
import Perfil from '@/screens/client/perfil/Perfil';
import ProductoDetalle from '@/screens/client/tienda/ProductoDetalle';
import Tienda from '@/screens/client/tienda/Tienda';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function GimnasiosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GimnasiosLista" component={Gimnasios} />
      <Stack.Screen name="GimnasioDetalle" component={GimnasioDetalle} />
      <Stack.Screen
        name="PagoMembresia"
        component={PagoMembresia}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

function TiendaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TiendaLista" component={Tienda} />
      <Stack.Screen name="ProductoDetalle" component={ProductoDetalle} />
    </Stack.Navigator>
  );
}

function CarritoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CarritoResumen" component={Carrito} />
      <Stack.Screen name="PagoCarrito" component={PagoCarrito} />
    </Stack.Navigator>
  );
}

export default function ClientNavigator() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Gimnasios"
        component={GimnasiosStack}
        options={{ tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Tienda"
        component={TiendaStack}
        options={{ tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Carrito"
        component={CarritoStack}
        options={{ tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
