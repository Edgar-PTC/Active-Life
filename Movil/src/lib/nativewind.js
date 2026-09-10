/**
 * Registra `className` en componentes de terceros que no son de react-native.
 * NativeWind ya entiende los componentes nativos (View, Text, ...); para librerías
 * externas hay que declarar que su prop `className` debe convertirse a `style`.
 * Se importa una sola vez en App.jsx.
 */
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });
cssInterop(BlurView, { className: 'style' });
