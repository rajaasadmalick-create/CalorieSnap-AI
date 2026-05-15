import React, { useState, useRef } from "react";
import { Camera, ImagePlus, Loader2, ArrowRight, RefreshCcw, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { MacroProgressBar } from "../components/MacroProgressBar";
import { useUserLimit } from "../hooks/useUserLimit";
import { downscaleImage, extractBase64Data } from "../lib/imageUtils";

interface MealData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: string;
  suggestions: string[];
  foodName: string;
}

export default function Scan() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MealData | null>(null);

  const { user } = useAuth();
  const { scanCount, checkingLimit, reachedLimit, incrementScanCount } = useUserLimit();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setAnalysisResult(null); // Reset previous results
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imageSrc || !user) return;
    setLoading(true);

    try {
      const { base64Data, mimeType } = extractBase64Data(imageSrc);

      const response = await fetch("/api/analyze-meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
      }

      const result: MealData = await response.json();
      setAnalysisResult(result);

      // Downscale to tiny thumbnail for firestore to save space
      const thumbnail = await downscaleImage(imageSrc, 200);

      // Save to Firebase and Increment total scans
      const mealsRef = collection(db, 'users', user.uid, 'meals');
      await addDoc(mealsRef, {
        userId: user.uid,
        thumbnailDataUrl: thumbnail,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        vitamins: result.vitamins,
        suggestions: result.suggestions,
        foodName: result.foodName,
        createdAt: serverTimestamp()
      });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        totalScans: increment(1)
      });

      incrementScanCount();
      toast.success("Meal successfully analyzed and saved!");
    } catch (error) {
      console.error("Analysis Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze image. Please try again with a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingLimit) {
    return (
      <div className="max-w-3xl mx-auto pb-12 space-y-4">
        <Skeleton className="h-12 w-48 mb-2" />
        <Skeleton className="h-6 w-96 mb-8" />
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Scan a Meal</h1>
          <p className="text-slate-500 mt-2">Upload or snap a photo of your food to get instant nutritional breakdown.</p>
        </div>
        <div className="hidden sm:flex shrink-0 items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200 shadow-sm text-sm font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
          {scanCount || 0}/1 Free Scans Used
        </div>
      </div>

      {!imageSrc && reachedLimit ? (
        <Card className="border-2 border-emerald-500/20 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 transform translate-x-1/4 -translate-y-1/4">
            <Lock className="w-64 h-64 text-emerald-900" />
          </div>
          <CardContent className="flex flex-col items-center justify-center py-20 px-4 text-center relative z-10">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
               <Sparkles className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">You've reached your free limit</h3>
             <p className="text-slate-600 mb-8 max-w-md text-lg leading-relaxed">
               You have used your 1 free scan. If you want to scan more meals, you need to buy the subscription plan which is coming soon !!
             </p>
             <Button disabled className="bg-slate-900 text-white rounded-full px-8 h-12 opacity-90 font-medium">
               <Lock className="w-4 h-4 mr-2" /> Premium Subscription (Coming Soon)
             </Button>
          </CardContent>
        </Card>
      ) : !imageSrc ? (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload your meal photo</h3>
            <p className="text-slate-500 mb-8 max-w-sm">
              Use your camera to snap a fresh picture or upload an existing photo from your gallery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={captureInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              <Button 
                onClick={() => captureInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-sm min-w-40 w-full sm:w-[303px]"
              >
                <Camera className="w-4 h-4 mr-2" /> Take Photo
              </Button>

              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="rounded-full px-6 border-slate-200 min-w-40"
              >
                <ImagePlus className="w-4 h-4 mr-2" /> Upload Gallery
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/50 h-64 sm:h-96 w-full flex items-center justify-center">
            <img src={imageSrc} alt="Meal preview" className="max-w-full max-h-full object-contain" />
            
            {!analysisResult && !loading && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-4">
                {reachedLimit ? (
                   <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl max-w-sm text-center mx-4">
                      <Lock className="w-8 h-8 text-slate-800 mx-auto mb-3" />
                      <h3 className="font-bold text-slate-900 mb-2">Free Limit Reached</h3>
                      <p className="text-sm text-slate-600 mb-4">You must unlock Premium to analyze additional photos!</p>
                      <Button onClick={() => setImageSrc(null)} variant="outline" className="w-full rounded-full">Go Back</Button>
                   </div>
                ) : (
                  <Button 
                    onClick={analyzeImage}
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg border-2 border-white/20"
                  >
                    Analyze Meal <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-400 mb-4" />
                <h3 className="font-semibold text-lg tracking-wide mb-2">Analyzing Nutrition...</h3>
                <p className="text-slate-300 text-sm text-center max-w-xs">Our AI is counting macros, identifying foods, and creating your summary.</p>
              </div>
            )}

            {!loading && analysisResult && (
              <Button 
                onClick={() => {
                  setImageSrc(null);
                  setAnalysisResult(null);
                }}
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 rounded-full shadow-md bg-white/90 hover:bg-white text-slate-900"
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100/50 pb-6">
                  <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-1">Estimated Energy</p>
                  <CardTitle className="text-4xl font-extrabold text-slate-900 flex items-baseline gap-2">
                    {analysisResult.calories} <span className="text-lg font-medium text-slate-500 tracking-normal">kcal</span>
                  </CardTitle>
                  <p className="text-slate-600 capitalize mt-2 font-medium">{analysisResult.foodName}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-5">
                    <MacroProgressBar 
                      label="Protein" 
                      amountGrams={analysisResult.protein} 
                      totalCalories={analysisResult.calories} 
                      macronutrientType="protein" 
                    />
                    <MacroProgressBar 
                      label="Carbs" 
                      amountGrams={analysisResult.carbs} 
                      totalCalories={analysisResult.calories} 
                      macronutrientType="carbs" 
                    />
                    <MacroProgressBar 
                      label="Fats" 
                      amountGrams={analysisResult.fat} 
                      totalCalories={analysisResult.calories} 
                      macronutrientType="fat" 
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold mr-3 text-sm">✨</span>
                      Vitamins & Minerals
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{analysisResult.vitamins}</p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold mr-3 text-sm">💡</span>
                      Improvement Suggestions
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-200">
                          <span className="mr-3 mt-1 text-emerald-400">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
