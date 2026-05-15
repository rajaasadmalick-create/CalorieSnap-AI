import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../contexts/AuthContext";

export function useUserLimit() {

  const { user } = useAuth();
  const [scanCount, setScanCount] = useState<number | null>(null);
  const [checkingLimit, setCheckingLimit] = useState(true);

  useEffect(() => {
    async function checkLimit() {
      if (!user) return;
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(userDocRef);
        if (snapshot.exists()) {
          setScanCount(snapshot.data().totalScans || 0);
        } else {
          setScanCount(0);
        }
      } catch (error) {
        console.error("Error fetching scan count:", error);
      } finally {
        setCheckingLimit(false);
      }
    }
    checkLimit();
  }, [user]);

  const reachedLimit = scanCount !== null && scanCount >= 1;

  const incrementScanCount = () => {
    setScanCount((prev) => (prev !== null ? prev + 1 : 1));
  };

  return { scanCount, checkingLimit, reachedLimit, incrementScanCount };
}
