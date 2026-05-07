import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Button nativeButton={false} render={<Link to="/" />} variant="ghost" className="mb-8 pl-0 text-slate-500 hover:text-slate-900 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, or snap/upload a food photo. This includes your name, email address (via Google Auth), and the meal photos you analyze.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the Google Gemini API to analyze your food photos to provide macronutrient and calorie estimations. Your photos and analysis histories are stored securely in Firebase.</p>
          
          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
          <p>We implement strict Firebase Security Rules to ensure that your meal history is only accessible by you. We do not sell your personal data or meal history to third parties.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </div>
    </div>
  );
}
