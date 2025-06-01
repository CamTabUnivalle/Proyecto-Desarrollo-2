import { create } from "zustand";
import {  onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider} from "firebase/auth";
import { auth } from "../../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
  userLogged: null,

  // Iniciar sesión con Google
  loginGoogleWithPopUp: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      set({ userLogged: result.user });
      return result.user;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  // Cerrar sesión
  logoutGoogle: async () => {
    try {
      await signOut(auth);
      set({ userLogged: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  },

  // Escuchar cambios de sesión
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ userLogged: user });
    });
  }
}));

export default useAuthStore;