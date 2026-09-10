/**
 * TIENDA — port de `empaquetacion/src/Pages/Web - Client/Tienda.jsx` con el
 * diseño del boceto móvil: barra de búsqueda + botón de filtro, grid de 2
 * columnas con ProductCard y paginación (decorativa).
 *
 * Funcionalidad (igual que la web):
 *   - getProducts() al montar
 *   - searchByName(texto) al escribir  (con debounce de 300 ms: en móvil una
 *     petición por tecla se degradaría)
 *   - tocar una tarjeta abre ProductoDetalle con { id }
 *
 * El botón de filtro y la paginación salen en el boceto pero la tienda web no
 * tiene esa lógica, así que se dejan decorativos (como el dropdown de PagoCarrito).
 */
import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '@/components/ProductCard';
import useProducts from '@/hooks/useProducts';
import { Brand } from '@/theme/brand';

const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

export default function Tienda({ navigation }) {
  const { productosArray, cargando, getProducts, searchByName } = useProducts();
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const t = setTimeout(() => {
      const texto = query.trim();
      if (texto) searchByName(texto);
      else getProducts();
    }, 300);
    return () => clearTimeout(t);
  }, [query, searchByName, getProducts]);

  // Grid de 2 columnas: si el total es impar, un hueco invisible cierra la fila.
  const data =
    productosArray.length % 2 === 1
      ? [...productosArray, { _id: '__spacer__', __spacer: true }]
      : productosArray;

  return (
    <SafeAreaView className="flex-1 bg-brand-mist" edges={['top']}>
      <View className="flex-row items-center px-5 pb-3 pt-2">
        <Image source={LOGO_URL} className="h-[26px] w-32" contentFit="contain" />
        <Text className="text-[18px] font-extrabold text-brand-crumb"> • Tienda</Text>
      </View>

      <View className="flex-row items-center gap-3 px-4 pb-3">
        <View className="flex-1 flex-row items-center gap-3 rounded-2xl bg-brand-green-med px-2.5 py-2.5">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-brand-green-dark">
            <Search size={18} color={Brand.white} />
          </View>
          <TextInput
            className="flex-1 text-base font-semibold text-white"
            placeholder="Buscar..."
            placeholderTextColor="rgba(255,255,255,0.8)"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>
        <View className="h-[52px] w-[52px] items-center justify-center rounded-2xl bg-brand-green-dark">
          <Filter size={20} color={Brand.white} />
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerClassName="grow gap-3.5 px-4 pb-6 pt-1"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          item.__spacer ? (
            <View className="flex-1" />
          ) : (
            <ProductCard
              producto={item}
              onPress={() => navigation.navigate('ProductoDetalle', { id: item._id })}
            />
          )
        }
        ListEmptyComponent={
          cargando ? (
            <ActivityIndicator color={Brand.greenDark} className="py-16" />
          ) : (
            <Text className="py-16 text-center text-[15px] text-brand-muted">
              No se encontraron productos
            </Text>
          )
        }
        ListFooterComponent={
          productosArray.length > 0 ? (
            <View className="flex-row items-center justify-center gap-4 pb-1 pt-5">
              <ChevronLeft size={22} color={Brand.greenDark} />
              <View className="flex-row items-center gap-2">
                <View className="h-2.5 w-2.5 rounded-full bg-brand-green-dark" />
                <View className="h-2.5 w-2.5 rounded-full bg-brand-green-dark/30" />
                <View className="h-2.5 w-2.5 rounded-full bg-brand-green-dark/30" />
              </View>
              <ChevronRight size={22} color={Brand.greenDark} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
