/**
 * INICIO (dashboard del cliente) — port de `empaquetacion/src/Pages/Web - Client/Dashboard.jsx`.
 *
 * El dashboard en web todavía usa datos mock (Array1/Array2, sin fetch al backend),
 * así que este port mantiene el mismo estado: es un boceto funcional de navegación,
 * no una integración nueva con la API.
 *
 * Cambios de layout obligados por la pantalla angosta:
 *   - La fila "bienvenida + carrito" era un grid 5fr/2fr en web -> aquí son dos
 *     tarjetas apiladas, mismo contenido.
 *   - CardProductDashClient ocultaba el botón "Ver detalles" fuera de /client/tienda;
 *     aquí toda la tarjeta es pulsable hacia el detalle de producto, que ya existe como stub.
 */
import { Image } from 'expo-image';
import { Dumbbell, MapPin, ShoppingCart } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/theme/brand';
import { useAuth } from '@/context/session-context';

const CARRITO_MOCK = [
  { id: 'PR001', name: 'Botella de Agua 250ml', precioUni: 25.0, cantidad: 1 },
  { id: 'PR002', name: 'Camiseta Deportiva', precioUni: 15.0, cantidad: 2 },
];

const PRODUCTOS_MOCK = [
  {
    id: 'PR001',
    image:
      'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png',
    name: 'Botella de Agua 250ml',
    precioUni: 25.0,
  },
  {
    id: 'PR002',
    image:
      'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png',
    name: 'Camiseta Deportiva',
    precioUni: 15.0,
  },
  {
    id: 'PR003',
    image:
      'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png',
    name: 'Camiseta Deportiva',
    precioUni: 15.0,
  },
  {
    id: 'PR004',
    image:
      'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png',
    name: 'Camiseta Deportiva',
    precioUni: 15.0,
  },
];

export default function Inicio({ navigation }) {
  const { Nombre } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.welcomeCard}>
          <View>
            <Text style={styles.welcomeHint}>¡Bienvenido de vuelta!</Text>
            <Text style={styles.welcomeName}>{Nombre || 'Cliente'}</Text>
          </View>
          <Text style={styles.pillButton} onPress={() => navigation.navigate('Perfil')}>
            Mi perfil
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.cartCard, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Carrito')}>
          <View style={styles.cartIcon}>
            <ShoppingCart color={Brand.white} size={22} />
          </View>
          <View>
            <Text style={styles.cartTitle}>Completa tu pedido</Text>
            <Text style={styles.cartHint}>
              {CARRITO_MOCK.length} {CARRITO_MOCK.length > 1 ? 'Productos' : 'Producto'} en
              carrito
            </Text>
          </View>
        </Pressable>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tu Membresía</Text>
            <Text style={styles.sectionLink}>Ver más</Text>
          </View>
          <View style={styles.membershipCard}>
            <View style={styles.membershipTop}>
              <Text style={styles.membershipName}>Fitness Fusion</Text>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipBadgeText}>Platino</Text>
              </View>
            </View>
            <View style={styles.membershipLocation}>
              <MapPin color={Brand.white} size={14} />
              <Text style={styles.membershipLocationText}>San Salvador, Apopa</Text>
            </View>
            <View style={styles.membershipBottom}>
              <View>
                <Text style={styles.membershipLabel}>PERIODO</Text>
                <View style={styles.membershipPriceRow}>
                  <Text style={styles.membershipPrice}>$8.99</Text>
                  <Text style={styles.membershipPeriod}>/mes</Text>
                </View>
              </View>
              <View style={styles.membershipNext}>
                <Text style={styles.membershipLabel}>Siguiente pago</Text>
                <Text style={styles.membershipNextDate}>15 mar, 2026</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos que podrían ser de tu interés</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productRow}>
            {PRODUCTOS_MOCK.map((producto) => (
              <Pressable
                key={producto.id}
                style={({ pressed }) => [styles.productCard, pressed && styles.pressed]}
                onPress={() =>
                  navigation.navigate('Tienda', {
                    screen: 'ProductoDetalle',
                    params: { id: producto.id },
                  })
                }>
                <Image source={{ uri: producto.image }} style={styles.productImage} contentFit="cover" />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {producto.name}
                  </Text>
                  <Text style={styles.productPrice}>${producto.precioUni.toFixed(2)}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Pressable
          style={({ pressed }) => [styles.gymShortcut, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Gimnasios')}>
          <Dumbbell color={Brand.heading} size={16} />
          <Text style={styles.gymShortcutText}>Ver gimnasios cercanos</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.pageBg },
  scroll: { padding: 20, gap: 16 },
  pressed: { opacity: 0.85 },

  welcomeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#BAC9BC',
    borderRadius: 16,
    padding: 18,
  },
  welcomeHint: { color: Brand.textGray, fontSize: 13 },
  welcomeName: { color: Brand.heading, fontSize: 26, fontWeight: '700' },
  pillButton: {
    color: Brand.white,
    backgroundColor: Brand.green,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },

  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#BAC9BC',
    borderRadius: 16,
    padding: 16,
  },
  cartIcon: {
    backgroundColor: Brand.green,
    borderRadius: 999,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartTitle: { color: Brand.heading, fontSize: 17, fontWeight: '700' },
  cartHint: { color: Brand.textGray, fontSize: 13 },

  section: { gap: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sectionTitle: { color: Brand.heading, fontSize: 15, fontWeight: '600' },
  sectionLink: { color: Brand.green, fontSize: 13 },

  membershipCard: { backgroundColor: Brand.green, borderRadius: 18, padding: 18, gap: 10 },
  membershipTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  membershipName: { color: Brand.white, fontSize: 22, fontWeight: '700' },
  membershipBadge: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  membershipBadgeText: { color: Brand.white, fontSize: 11, fontWeight: '600' },
  membershipLocation: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  membershipLocationText: { color: Brand.white, fontSize: 13 },
  membershipBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  membershipLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
  membershipPriceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  membershipPrice: { color: Brand.white, fontSize: 22, fontWeight: '700' },
  membershipPeriod: { color: 'rgba(255,255,255,0.75)', fontSize: 13 },
  membershipNext: { alignItems: 'flex-end' },
  membershipNextDate: { color: Brand.white, fontSize: 16, fontWeight: '700' },

  productRow: { flexDirection: 'row' },
  productCard: {
    backgroundColor: Brand.green,
    borderRadius: 16,
    overflow: 'hidden',
    width: 150,
    marginRight: 12,
  },
  productImage: { width: '100%', height: 100 },
  productInfo: { padding: 10, gap: 2 },
  productName: { color: Brand.white, fontSize: 13, fontWeight: '600' },
  productPrice: { color: Brand.white, fontSize: 13 },

  gymShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  gymShortcutText: { color: Brand.heading, fontSize: 13, fontWeight: '600' },
});
