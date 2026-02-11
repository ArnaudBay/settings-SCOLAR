import { FiHome, FiBook } from 'react-icons/fi';
import type { SettingsTab } from '../../types';

interface SidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const generalItems = [
    { id: 'infos-generales' as SettingsTab, label: 'Informations générales', icon: FiHome },
  ];

  const structureItems = [
    { id: 'structure-academique' as SettingsTab, label: 'Structure académique', icon: FiBook },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">GÉNÉRAL</h2>
        <nav className="mt-4 space-y-1">
          {generalItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">STRUCTURE</h2>
        <nav className="mt-4 space-y-1">
          {structureItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
