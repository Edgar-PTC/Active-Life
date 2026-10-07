/**
 * MIS PEDIDOS — historial de compras del cliente.
 *
 * Se abre desde Perfil ("Mis pedidos"). Lista los pedidos de POST /sales/salesClient,
 * con filtro por estado, pull-to-refresh y un modal con el detalle del pedido.
 * Se recarga cada vez que la pantalla gana foco (ej. después de pagar el carrito).
 */
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight, Package, X } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/session-context';
import usePedidos from '@/hooks/usePedidos';
import { Brand } from '@/theme/brand';

const FILTROS = ['Todos', 'Pendiente', 'Completado', 'Cancelado'];

// Estados que maneja el admin (salesController.updateStatus) + los del statusMap viejo
const ESTILO_ESTADO = {
  Pendiente: { bg: 'bg-[#F3E3B5]', text: 'text-[#7A5B12]' },
  'En camino': { bg: 'bg-[#CFE0F0]', text: 'text-[#28506F]' },
  Completado: { bg: 'bg-brand-button/30', text: 'text-brand-green-dark' },
  Entregado: { bg: 'bg-brand-button/30', text: 'text-brand-green-dark' },
  Cancelado: { bg: 'bg-brand-salmon/30', text: 'text-brand-danger' },
};

const formatoMoneda = (n) => `$${Number(n || 0).toFixed(2)}`;

const formatoFecha = (pedido) => {
  const raw = pedido.createdAt || pedido.date;
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString('es-SV', { day: '2-digit', month: 'short', year: 'numeric' });
};

function EstadoChip({ status }) {
  const estilo = ESTILO_ESTADO[status] ?? ESTILO_ESTADO.Pendiente;
  return (
    <View className={`rounded-full px-3 py-1 ${estilo.bg}`}>
      <Text className={`text-[12px] font-bold ${estilo.text}`}>{status}</Text>
    </View>
  );
}

function PedidoCard({ pedido, onPress }) {
  const items = pedido.items ?? [];
  const extra = items.length > 1 ? ` y ${items.length - 1} más` : '';
  return (
    <TouchableOpacity
      className="rounded-2xl bg-brand-surface p-4"
      activeOpacity={0.85}
      onPress={() => onPress(pedido)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-[15px] font-extrabold text-brand-green-forest">{pedido.id}</Text>
        <EstadoChip status={pedido.status} />
      </View>
      <Text className="mt-2 text-[14px] font-semibold text-brand-ink" numberOfLines={1}>
        {pedido.product}
        {extra}
      </Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-[13px] text-brand-muted">{formatoFecha(pedido)}</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-[15px] font-bold text-brand-green-dark">
            {formatoMoneda(pedido.amount)}
          </Text>
          <ChevronRight size={16} color={Brand.muted} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Fila({ label, value }) {
  if (!value) return null;
  return (
    <View className="mb-2 flex-row justify-between gap-4">
      <Text className="text-[13px] text-brand-muted">{label}</Text>
      <Text className="flex-1 text-right text-[13px] font-semibold text-brand-ink">{value}</Text>
    </View>
  );
}

function PedidoDetalleModal({ pedido, onClose }) {
  const items = pedido.items ?? [];
  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-brand-ink/50">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="max-h-[85%] rounded-t-3xl bg-brand-surface px-5 pb-8 pt-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
                Pedido
              </Text>
              <Text className="text-[20px] font-bold text-brand-green-forest">{pedido.id}</Text>
            </View>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
              <X size={24} color={Brand.greenForest} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[13px] text-brand-muted">Estado</Text>
              <EstadoChip status={pedido.status} />
            </View>
            <Fila label="Fecha" value={formatoFecha(pedido)} />
            <Fila label="Dirección de entrega" value={pedido.deliveryAddress} />
            <Fila label="Método de pago" value={pedido.paymentMethod} />

            <Text className="mb-2 mt-4 text-[15px] font-bold text-brand-green-forest">
              Productos
            </Text>
            {items.length === 0 ? (
              <Text className="text-[14px] text-brand-ink">{pedido.product}</Text>
            ) : (
              items.map((item, i) => (
                <View
                  key={`${item.productId ?? i}`}
                  className="mb-2 flex-row items-center gap-3 rounded-2xl bg-white p-3">
                  {item.image ? (
                    <Image
                      source={item.image}
                      className="h-12 w-12 rounded-xl"
                      contentFit="cover"
                    />
                  ) : (
                    <View className="h-12 w-12 items-center justify-center rounded-xl bg-brand-chip">
                      <Package size={20} color={Brand.muted} />
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="text-[14px] font-semibold text-brand-ink" numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text className="text-[12px] text-brand-muted">
                      {item.amount} x {formatoMoneda(item.unitPrice)}
                    </Text>
                  </View>
                  <Text className="text-[14px] font-bold text-brand-green-dark">
                    {formatoMoneda(item.subtotal)}
                  </Text>
                </View>
              ))
            )}

            <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-brand-green-deep px-4 py-3">
              <Text className="text-[15px] font-bold text-white">Total</Text>
              <Text className="text-[17px] font-extrabold text-white">
                {formatoMoneda(pedido.amount)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function Pedidos({ navigation }) {
  const { Id } = useAuth();
  const { pedidos, cargando, error, cargar } = usePedidos();
  const [filtro, setFiltro] = useState('Todos');
  const [seleccionado, setSeleccionado] = useState(null);
  const [refrescando, setRefrescando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      cargar(Id);
    }, [Id, cargar]),
  );

  const refrescar = async () => {
    setRefrescando(true);
    await cargar(Id);
    setRefrescando(false);
  };

  const visibles = useMemo(
    () => (filtro === 'Todos' ? pedidos : pedidos.filter((p) => p.status === filtro)),
    [pedidos, filtro],
  );

  const vacio = cargando && !refrescando ? (
    <ActivityIndicator color={Brand.greenDark} className="py-[70px]" />
  ) : (
    <View className="items-center justify-center gap-2 py-[70px]">
      <Package size={40} color={Brand.muted} />
      <Text className="text-center text-[15px] text-brand-muted">
        {error ||
          (filtro === 'Todos'
            ? 'Aún no tienes pedidos'
            : `No tienes pedidos con estado "${filtro}"`)}
      </Text>
      {!error && filtro === 'Todos' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Tienda')} activeOpacity={0.7}>
          <Text className="text-[15px] font-bold text-brand-green-dark">Ir a la tienda</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-brand-mist" edges={['top']}>
      <View className="flex-row items-center px-3 pb-3 pt-2">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="p-1">
          <ChevronLeft size={26} color={Brand.greenForest} />
        </TouchableOpacity>
        <Text className="ml-1 text-[20px] font-extrabold text-brand-green-forest">
          Mis pedidos
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-4 pb-3">
          {FILTROS.map((f) => {
            const activo = f === filtro;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFiltro(f)}
                activeOpacity={0.8}
                className={`rounded-full px-4 py-2 ${activo ? 'bg-brand-green-forest' : 'bg-brand-surface'}`}>
                <Text
                  className={`text-[13px] font-semibold ${activo ? 'text-white' : 'text-brand-green-forest'}`}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={visibles}
        keyExtractor={(item) => String(item._id ?? item.id)}
        contentContainerClassName="grow px-4 pb-8"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <PedidoCard pedido={item} onPress={setSeleccionado} />}
        ListEmptyComponent={vacio}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={refrescar}
            tintColor={Brand.greenDark}
            colors={[Brand.greenDark]}
          />
        }
      />

      {seleccionado ? (
        <PedidoDetalleModal pedido={seleccionado} onClose={() => setSeleccionado(null)} />
      ) : null}
    </SafeAreaView>
  );
}
