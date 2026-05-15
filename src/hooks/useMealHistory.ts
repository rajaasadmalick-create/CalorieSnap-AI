import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export interface MealRecord {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  thumbnailDataUrl: string;
  createdAt: any;
}

export function useMealHistory() {
  const { user } = useAuth();
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMeals = async () => {
      try {
        const mealsRef = collection(db, 'users', user.uid, 'meals');
        const q = query(mealsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedMeals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MealRecord[];
        setMeals(fetchedMeals);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [user]);

  const removeMeal = async (deleteId: string) => {
    if (!user) return false;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'meals', deleteId));
      setMeals(prev => prev.filter(m => m.id !== deleteId));
      toast.success("Meal deleted successfully.");
      return true;
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal.");
      return false;
    }
  };

  return { meals, loading, removeMeal };
}
