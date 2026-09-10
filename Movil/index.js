import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App)
// y funciona tanto en Expo Go como en un build nativo.
registerRootComponent(App);
