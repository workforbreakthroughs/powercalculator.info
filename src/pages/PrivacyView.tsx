import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Legal & Transparency</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: July 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs leading-relaxed">
        <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-200">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <span>At powercalculator.info, accessible from https://powercalculator.info, one of our main priorities is the privacy of our visitors.</span>
        </div>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">1. Information We Collect</h2>
        <p>
          We do not require user account registration to perform electrical calculations. All calculation data entered into forms operates strictly client-side in your browser unless saved to local storage preferences.
        </p>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">2. Google AdSense & Cookies</h2>
        <p>
          Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to powercalculator.info and other sites on the internet.
        </p>
        <p>
          Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">3. Third-Party Privacy Policies</h2>
        <p>
          powercalculator.info Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
        </p>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">4. CCPA & GDPR Rights</h2>
        <p>
          Under the CCPA and GDPR, users have the right to request disclosure of personal data collected or request deletion. Because we do not store personal profiles, no personal data is retained on our servers.
        </p>
      </div>
    </div>
  );
};
