import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 ml-64">
      <div className="px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-[var(--argus-blue)] rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={16} />
            </div>
            <div>
              <div className="font-semibold text-slate-900">Argus Intelligence</div>
              <div className="text-sm text-slate-600">the power of Natural language</div>
            </div>
          </div>
          
          <div className="flex space-x-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-sm text-slate-500">
            © 2023 Argus Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
