import { createNavigationContainerRef } from "@react-navigation/native";

// Permite navegar desde fuera de un componente de pantalla (ej. SweetAlerts, authContext),
// que es donde antes se usaba window.location.pathname en la version web.
export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
};
