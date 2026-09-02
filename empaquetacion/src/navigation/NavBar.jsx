import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Tienda from '../screens/Tienda';
import ProductoDetalle from '../screens/ProductoDetalle';
import PaqueteDetalle from '../screens/PaqueteDetalle';
import Carrito from '../screens/Carrito';
import PagoCarrito from '../screens/PagoCarrito';

export default function NavBar() {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: colors.rosa,
                tabBarInactiveTintColor: colors.morado,
                tabBarStyle: {
                    position: 'absolute',
                    height: 40,
                    borderTopLeftRadius: 999,
                    borderTopRightRadius: 999,
                    backgroundColor: 'rgba(69,89,66,1)', // bg-white/70
                    borderWidth: 1,
                    elevation: 10,
                },
                headerShown: false,
                tabBarShowLabel: false, // acá sacás el texto, solo queda el icono
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={iconosPorTab[route.name]} size={size} color={color} />
                ),
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Tienda" component={Tienda} />
            <Tab.Screen name="Carrito" component={Carrito} />
            <Tab.Screen
                name="ProductoDetalle"
                component={ProductoDetalle}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
                name="PaqueteDetalle"
                component={PaqueteDetalle}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
                name="PagoCarrito"
                component={PagoCarrito}
                options={{ tabBarButton: () => null }}
            />
        </Tab.Navigator>
    )
}