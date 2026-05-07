import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Button nativeButton={false} render={<Link to="/" />} variant="ghost" className="mb-8 pl-0 text-slate-500 hover:text-slate-900 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using CalorieSnap AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
          <p>CalorieSnap AI provides automated nutritional analysis of food photos using artificial intelligence. Estimates for calories, macronutrients, and text suggestions are approximations provided for informational purposes only. Do not rely on them for medical or strict dietary requirements.</p>
          
          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Medical Disclaimer</h2>
          <p>The information provided by CalorieSnap AI is not medical advice. Always consult a qualified healthcare provider for specific dietary or medical needs.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Limitation of Liability</h2>
          <p>We strive for accuracy but the underlying AI (Google Gemini) may hallucinate or misidentify food. We are not liable for any consequences resulting from the interpretation or use of the analysis provided.</p>
        </div>
      </div>
    </div>
  );
}
