import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Calendar, Coffee, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMealHistory } from "../hooks/useMealHistory";

export default function History() {
  const { meals, loading, removeMeal } = useMealHistory();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteId) return;
    const success = await removeMeal(deleteId);
    if (success) {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-12 space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Meal History</h1>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Meal History</h1>
        <p className="text-slate-500 mt-2">Past scans and nutritional profiles.</p>
      </div>

      {meals.length === 0 ? (
        <Card className="border-dashed border-2 bg-transparent border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <FileSearch className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No meals tracked yet</h3>
            <p className="text-slate-500 max-w-sm">
              Head over to the Scan tab to start capturing your meals and building your history.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => {
            const date = meal.createdAt?.toDate ? meal.createdAt.toDate() : new Date();
            return (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-40 sm:min-w-[10rem] h-40 sm:h-auto bg-slate-100 flex-shrink-0 relative overflow-hidden border-r border-slate-100">
                      {meal.thumbnailDataUrl ? (
                        <img 
                          src={meal.thumbnailDataUrl} 
                          alt={meal.foodName} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Coffee className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4 sm:mb-0">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 capitalize mb-1">{meal.foodName}</h3>
                          <div className="flex items-center text-xs text-slate-500 font-medium">
                            <Calendar className="w-3 h-3 mr-1" />
                            {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 -mt-2 -mr-2"
                          onClick={() => setDeleteId(meal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-slate-50">
                        <div className="text-sm">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-0.5">Calories</span>
                          <span className="font-bold text-emerald-600">{meal.calories} kcal</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-0.5">Protein</span>
                          <span className="font-bold text-slate-900">{meal.protein}g</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-0.5">Carbs</span>
                          <span className="font-bold text-slate-900">{meal.carbs}g</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-0.5">Fat</span>
                          <span className="font-bold text-slate-900">{meal.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Delete Meal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this meal record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
