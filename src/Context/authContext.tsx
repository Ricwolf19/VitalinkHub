import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    // createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import {
    collection,
    doc,
    // setDoc, 
    getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export const useAccountData = () => {
    const { user } = useAuth(); 
    const [accountData, setAccountData] = useState<any>('');
  
    useEffect(() => {
      const getAccountData = async () => {
        try {
          // Assuming you have initialized your Firestore database connection
          const accountsCollectionRef = collection(db, 'accounts');
          const documentId = user.uid;
  
          const docSnap = await getDoc(doc(accountsCollectionRef, documentId));
          if (docSnap.exists()) {
            const accountInfo = docSnap.data();
            setAccountData(accountInfo);
          } else {
            alert('No such Document');
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      getAccountData();
    }, [user.uid]); 
  
    return { accountData };
  };


interface AuthContextProps {
    // signUp: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logOut: () => void;
    // loginWithGoogle: () => void;
    resetPassword: (email: string) => void;
    user: any;
    loading: boolean;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no auth provider");
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);


    // const signUp = (email: string, password: string): void => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((creds) =>
    //             setDoc(doc(db, "users", creds.user.uid), { rol: "user" })
    //         )
    //         .then(() => navigate("/Dashboard"));
    // };

    const login = async (email: string, password: string): Promise<void> => {
        signInWithEmailAndPassword(auth, email, password)
            .then((creds) => {
                getDoc(doc(db, "accounts", creds.user.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        switch (docSnap.data().rol) {
                            case "personal":
                                navigate("/AdminView");
                                break;
                            case "hospital":
                                navigate("/dashboard/home");
                                break;
                        }
                    }
                });
            });
    };

    const logOut = async (): Promise<void> => {
        await signOut(auth);
        navigate("/")
    };


    // const loginWithGoogle = (): void => {
    //     const googleProvider = new GoogleAuthProvider();
    //     signInWithPopup(auth, googleProvider);
    // };


    const resetPassword = async (email: string): Promise<void> => {
        try {
            // Espera a que la promesa se resuelva antes de continuar
            await sendPasswordResetEmail(auth, email);

            console.log(`Correo de restablecimiento de contraseña enviado a ${email}`);
        } catch (error: any) {
            // Proporciona un tipo explícito para 'error'
            console.error(`Error al enviar el correo de restablecimiento de contraseña: ${error.message}`);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const contextValue: AuthContextProps = {
        // signUp,
        login,
        logOut,
        resetPassword,
        user,
        loading,

    };

    return (
        <authContext.Provider value={contextValue}>{children}</authContext.Provider>
    );
}
