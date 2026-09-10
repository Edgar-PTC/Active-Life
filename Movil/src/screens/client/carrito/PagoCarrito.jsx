/**
 * MÉTODO DE PAGO — diseño del boceto móvil.
 *
 * Al entrar sincroniza el carrito local con el servidor (POST /carShop/sync) para
 * obtener el cartId y el resumen. "Finalizar Pago" dispara el flujo Wompi de prueba
 * (usePagoCarrito) y, si aprueba, registra la venta y vuelve a Inicio.
 */
import { ChevronDown, ChevronLeft, Lock, ShoppingCart } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-brand-sage" edges={['top']}>
      <View className="flex-row items-baseline px-5 pb-2 pt-2">
        <Text className="text-[18px] font-black text-brand-crumb">ACTIVELIFE</Text>
        <Text className="text-[15px] font-extrabold text-brand-crumb"> • Carrito • Metodo de pago</Text>
      </View>

      <View className="flex-row items-center justify-between px-5 pb-3">
        <TouchableOpacity
          className="flex-row items-center gap-0.5"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <ChevronLeft size={18} color={Brand.muted} />
          <Text className="text-sm font-semibold text-brand-muted">Regresar</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-[5px]">
          <Lock size={13} color={Brand.muted} />
          <Text className="text-xs text-brand-muted">Pago seguro y encriptado</Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="px-4 pb-4" showsVerticalScrollIndicator={false}>
        {/* Resumen de compra */}
        <View className="overflow-hidden rounded-2xl bg-brand-green-deep">
          <View className="flex-row items-center gap-3 bg-brand-green-med px-3.5 py-3.5">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-sage">
              <ShoppingCart size={18} color={Brand.greenDeep} />
            </View>
            <Text className="flex-1 text-center text-[22px] font-black text-white">
              Carrito de compra
            </Text>
          </View>

          <View className="min-h-[150px] py-1">
            {cargando ? (
              <ActivityIndicator color={Brand.white} className="my-5" />
            ) : productos.length === 0 ? (
              <Text className="py-6 text-center text-white/80">No hay productos en el carrito.</Text>
            ) : (
              productos.map((item, i) => (
                <View
                  key={String(item.productId?._id ?? item.productId ?? i)}
                  className={`flex-row items-center justify-between px-4 py-3.5 ${
                    i > 0 ? 'border-t border-white/15' : ''
                  }`}>
                  <Text className="mr-2.5 flex-1 text-sm text-white" numberOfLines={1}>
                    {(item.productId?.name || 'Producto')} - {item.quantity}{' '}
                    {item.quantity > 1 ? 'unidades' : 'unidad'}
                  </Text>
                  <Text className="text-sm font-bold text-white">
                    ${Number(item.subtotal || 0).toFixed(2)}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View className="flex-row justify-between bg-brand-green-med px-4 py-4">
            <Text className="text-[17px] font-black text-white">Total a pagar:</Text>
            <Text className="text-[17px] font-black text-white">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Punto de retiro */}
        <Text className="mb-2.5 mt-[22px] text-base font-black text-brand-green-dark">
          Punto de retiro
        </Text>
        <View className="flex-row items-center justify-between rounded-[14px] bg-brand-green-med px-[18px] py-[18px]">
          <Text className="text-base font-extrabold text-white">{PICKUP_POINT}</Text>
          <ChevronDown size={20} color={Brand.white} />
        </View>

        {/* Métodos de pago (informativo) */}
        <View className="mt-4 flex-row items-center rounded-[14px] bg-brand-green-med py-[18px]">
          <View className="flex-1 flex-row items-center justify-center gap-1">
            <Text className="text-[18px] font-black text-brand-google">G</Text>
            <Text className="text-[15px] font-bold text-white">Pay</Text>
          </View>
          <View className="w-px self-stretch bg-white/35" />
          <View className="flex-1 flex-row items-center justify-center gap-1">
            <Text className="text-[15px] font-bold text-white">Mastercard / VISA</Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-4 pb-3 pt-1.5">
        <TouchableOpacity
          className={`items-center justify-center rounded-[18px] bg-brand-button py-[17px] ${
            bloqueado ? 'opacity-50' : ''
          }`}
          disabled={bloqueado}
          activeOpacity={0.85}
          onPress={finalizarPago}>
          {procesando ? (
            <View className="flex-row items-center gap-2.5">
              <ActivityIndicator color={Brand.white} />
              <Text className="text-[18px] font-extrabold text-white">Procesando...</Text>
            </View>
          ) : (
            <Text className="text-[18px] font-extrabold text-white">Finalizar Pago</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
