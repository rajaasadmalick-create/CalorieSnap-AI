import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      q: "How accurate is the AI scanner?",
      a: "Our AI (powered by Google Gemini 3.1 Pro) provides highly informed estimates based on visual appearance. However, hidden ingredients (like excessive oils, butter, or sugar) cannot be seen by the camera. It is an excellent tool for general tracking and estimations, but shouldn't be used for strict medical dietary planning."
    },
    {
      q: "Is my data private?",
      a: "Yes. Your meals and profile data are stored securely using Firebase Authentication and rigorous Firestore security rules. No one else has access to your meal history."
    },
    {
      q: "Can I edit the macros if they look wrong?",
      a: "Currently, meals act as an immutable historical photo log. If a scan is vastly incorrect, we recommend deleting the entry and trying again with a clearer photo or a better angle."
    },
    {
      q: "Does this cost money?",
      a: "Currently, CalorieSnap AI is free to use during our initial beta period."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Button nativeButton={false} render={<Link to="/" />} variant="ghost" className="mb-8 pl-0 text-slate-500 hover:text-slate-900 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i} className="rounded-2xl border-slate-100 shadow-none bg-slate-50/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
