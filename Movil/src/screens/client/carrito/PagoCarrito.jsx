/**
 * MÉTODO DE PAGO — diseño del boceto móvil.
 *
 * Al entrar sincroniza el carrito local con el servidor (POST /carShop/sync) para
 * obtener el cartId y el resumen. "Finalizar Pago" dispara el flujo Wompi de prueba
 * (usePagoCarrito) y, si aprueba, registra la venta y vuelve a Inicio.
 */
import { ChevronDown, ChevronLeft, Lock, ShoppingCart } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCarShop } from '@/context/cart-context';
import { useAuth } from '@/context/session-context';
import usePagoCarrito from '@/hooks/usePagoCarrito';
import { Brand } from '@/theme/brand';

const PICKUP_POINT = 'Sucursal San Salvador';

export default function PagoCarrito({ navigation }) {
  const { Id } = useAuth();
  const { sincronizarConServidor, vaciarCarrito } = useCarShop();
  const { procesando, procesarPago } = usePagoCarrito();

  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (!Id) {
        setCargando(false);
        return;
      }
      const data = await sincronizarConServidor(Id);
      if (!vivo) return;
      if (data) {
        setProductos(data.products || []);
        setCartId(data._id);
        setTotal(data.total || 0);
      }
      setCargando(false);
    })();
    return () => {
      vivo = false;
    };
  }, [Id, sincronizarConServidor]);

  const finalizarPago = async () => {
    const exitoso = await procesarPago({
      clientId: Id,
      cartId,
      monto: total,
      deliveryAddress: PICKUP_POINT,
    });
    if (exitoso) {
      vaciarCarrito();
      navigation.popToTop();
      navigation.navigate('Inicio');
      Alert.alert('¡Pago exitoso!', 'Tu pedido ha sido registrado.');
    }
  };

  const bloqueado = procesando || cargando || productos.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.brand}>ACTIVELIFE</Text>
        <Text style={styles.crumb}> • Carrito • Metodo de pago</Text>
      </View>

      <View style={styles.subHeader}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={18} color={Brand.muted} />
          <Text style={styles.backText}>Regresar</Text>
        </TouchableOpacity>
        <View style={styles.secure}>
          <Lock size={13} color={Brand.muted} />
          <Text style={styles.secureText}>Pago seguro y encriptado</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Resumen de compra */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHead}>
            <View style={styles.headIcon}>
              <ShoppingCart size={18} color={Brand.greenDeep} />
            </View>
            <Text style={styles.summaryTitle}>Carrito de compra</Text>
          </View>

          <View style={styles.summaryList}>
            {cargando ? (
              <ActivityIndicator color={Brand.white} style={{ marginVertical: 20 }} />
            ) : productos.length === 0 ? (
              <Text style={styles.emptyLine}>No hay productos en el carrito.</Text>
            ) : (
              productos.map((item, i) => (
                <View
                  key={String(item.productId?._id ?? item.productId ?? i)}
                  style={[styles.line, i > 0 && styles.lineBorder]}>
                  <Text style={styles.lineName} numberOfLines={1}>
                    {(item.productId?.name || 'Producto')} - {item.quantity}{' '}
                    {item.quantity > 1 ? 'unidades' : 'unidad'}
                  </Text>
                  <Text style={styles.linePrice}>${Number(item.subtotal || 0).toFixed(2)}</Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Punto de retiro */}
        <Text style={styles.sectionLabel}>Punto de retiro</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{PICKUP_POINT}</Text>
          <ChevronDown size={20} color={Brand.white} />
        </View>

        {/* Métodos de pago (informativo) */}
        <View style={styles.methods}>
          <View style={styles.methodCell}>
            <Text style={styles.methodG}>G</Text>
            <Text style={styles.methodText}>Pay</Text>
          </View>
          <View style={styles.methodDivider} />
          <View style={styles.methodCell}>
            <Text style={styles.methodText}>Mastercard / VISA</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, bloqueado && styles.payDisabled]}
          disabled={bloqueado}
          activeOpacity={0.85}
          onPress={finalizarPago}>
          {procesando ? (
            <View style={styles.payRow}>
              <ActivityIndicator color={Brand.white} />
              <Text style={styles.payText}>Procesando...</Text>
            </View>
          ) : (
            <Text style={styles.payText}>Finalizar Pago</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.sage },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  brand: { fontSize: 18, fontWeight: '900', color: '#5C5140' },
  crumb: { fontSize: 15, fontWeight: '800', color: '#5C5140' },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  back: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  backText: { color: Brand.muted, fontSize: 14, fontWeight: '600' },
  secure: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  secureText: { color: Brand.muted, fontSize: 12 },
  content: { paddingHorizontal: 16, paddingBottom: 16 },

  summaryCard: { borderRadius: 16, overflow: 'hidden', backgroundColor: Brand.greenDeep },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Brand.greenMed,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  headIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Brand.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: { flex: 1, textAlign: 'center', fontSize: 22, fontWeight: '900', color: Brand.white },
  summaryList: { minHeight: 150, paddingVertical: 4 },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  lineBorder: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
  lineName: { flex: 1, fontSize: 14, color: Brand.white, marginRight: 10 },
  linePrice: { fontSize: 14, fontWeight: '700', color: Brand.white },
  emptyLine: { color: 'rgba(255,255,255,0.8)', textAlign: 'center', paddingVertical: 24 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Brand.greenMed,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  totalLabel: { fontSize: 17, fontWeight: '900', color: Brand.white },
  totalValue: { fontSize: 17, fontWeight: '900', color: Brand.white },

  sectionLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: Brand.greenDark,
    marginTop: 22,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Brand.greenMed,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  dropdownText: { fontSize: 16, fontWeight: '800', color: Brand.white },

  methods: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Brand.greenMed,
    borderRadius: 14,
    marginTop: 16,
    paddingVertical: 18,
  },
  methodCell: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  methodDivider: { width: 1, alignSelf: 'stretch', backgroundColor: 'rgba(255,255,255,0.35)' },
  methodG: { fontSize: 18, fontWeight: '900', color: '#EA4335' },
  methodText: { fontSize: 15, fontWeight: '700', color: Brand.white },

  footer: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12 },
  payButton: {
    backgroundColor: Brand.button,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payDisabled: { opacity: 0.5 },
  payRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  payText: { color: Brand.white, fontSize: 18, fontWeight: '800' },
});
