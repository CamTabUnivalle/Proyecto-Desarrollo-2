import { create } from "zustand";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => {
    const observeAuthState = () => {
        onAuthStateChanged (auth, (user) => {
            user? set({userLogged: user}) : set({userLogged: null});
        });
    };
    observeAuthState();

    
    return{
        userLogged: null,

        loginGoogleWithPopUp: async () => {
            try{
                return await signInWithPopup( auth, provider);                
            } catch (error) {
                console.error ("error Logging in: ", error)
            }
        },

        logout: async () => {
            return await signOut(auth)
            .then(() => set({userLogged: null}))
            .catch((error) => console.error ("error Logging out: ", error));
        }
    }
  
});

export default useAuthStore;