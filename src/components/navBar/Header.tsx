import { FiSettings } from 'react-icons/fi';

export const Header = () => {
  return (
    <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200">
      <a href="/" className="text-slate-600 hover:text-slate-900 flex items-center gap-2">
        <FiSettings className="w-4 h-4" />
        <span className="text-sm font-medium">Paramètres</span>
      </a>
    </div>
  );
};
