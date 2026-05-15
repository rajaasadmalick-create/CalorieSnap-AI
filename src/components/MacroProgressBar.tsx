import React from "react";
import { Progress } from "@/components/ui/progress";

interface MacroProgressBarProps {
  label: string;
  amountGrams: number;
  totalCalories: number;
  macronutrientType: "protein" | "carbs" | "fat";
}

const MACRO_INFO = {
  protein: { colorClass: "bg-blue-500", multiplier: 4 },
  carbs: { colorClass: "bg-yellow-500", multiplier: 4 },
  fat: { colorClass: "bg-red-500", multiplier: 9 },
};

export function MacroProgressBar({ label, amountGrams, totalCalories, macronutrientType }: MacroProgressBarProps) {
  const getMacroPercentage = (grams: number, calories: number, multiplier: number) => {
    if (!calories) return 0;
    const macroCalories = grams * multiplier;
    return Math.min(Math.round((macroCalories / calories) * 100), 100);
  };

  const { colorClass, multiplier } = MACRO_INFO[macronutrientType];

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-700 flex items-center">
          <div className={`w-2 h-2 rounded-full ${colorClass} mr-2`} />
          {label}
        </span>
        <span className="font-bold text-slate-900">{amountGrams}g</span>
      </div>
      <Progress 
        value={getMacroPercentage(amountGrams, totalCalories, multiplier)} 
        className="h-2 bg-slate-100" 
      />
    </div>
  );
}
