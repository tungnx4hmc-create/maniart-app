import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion 
} from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  purchasedGroups: string[];
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  unlockGroup: (group: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [purchasedGroups, setPurchasedGroups] = useState<string[]>([]);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user document from Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let localGroups: string[] = [];
          try {
            const saved = localStorage.getItem("purchased_groups");
            localGroups = saved ? JSON.parse(saved) : [];
          } catch (e) {
            console.error("Error parsing local groups:", e);
          }

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const cloudGroups = data.purchasedGroups || [];
            
            // Merge local storage purchases into cloud purchases if any
            const merged = Array.from(new Set([...cloudGroups, ...localGroups]));
            
            // Update cloud if local had new ones
            if (localGroups.some(g => !cloudGroups.includes(g))) {
              await updateDoc(userDocRef, {
                purchasedGroups: merged,
                updatedAt: new Date().toISOString()
              });
            }

            setPurchasedGroups(merged);
            localStorage.setItem("purchased_groups", JSON.stringify(merged));
          } else {
            // Create user document with any pre-existing local storage purchases
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              purchasedGroups: localGroups,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setPurchasedGroups(localGroups);
          }
        } catch (err) {
          console.error("Lỗi đồng bộ dữ liệu Firestore:", err);
          // Fallback to local storage
          loadLocalPurchasedGroups();
        }
      } else {
        // Guest user - load from local storage
        loadLocalPurchasedGroups();
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadLocalPurchasedGroups = () => {
    try {
      const saved = localStorage.getItem("purchased_groups");
      setPurchasedGroups(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setPurchasedGroups([]);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setAuthLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOut(auth);
      setPurchasedGroups([]);
      localStorage.removeItem("purchased_groups");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
      setAuthLoading(false);
    }
  };

  const unlockGroup = async (group: string) => {
    const normalizedGroup = group.toLowerCase();
    
    // Update local state first for immediate UI update
    setPurchasedGroups((prev) => {
      const next = prev.includes(normalizedGroup) ? prev : [...prev, normalizedGroup];
      localStorage.setItem("purchased_groups", JSON.stringify(next));
      return next;
    });

    // If logged in, update Firestore
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          purchasedGroups: arrayUnion(normalizedGroup),
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Lỗi khi mở khóa khóa học trên đám mây:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        purchasedGroups,
        loginWithGoogle,
        logout,
        unlockGroup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
