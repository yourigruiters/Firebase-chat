import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function TrackingWarningPopup() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] w-[calc(100%-2rem)] sm:w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl border-l-4 border-amber-500 p-4 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Portfolio Mode Active
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            The application is not being tracked. Creating custom rooms and
            sending messages has been disabled. Default answers will be given to
            ensure database integrity.
          </p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <button
            type="button"
            className="rounded-md inline-flex text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800 p-1"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
