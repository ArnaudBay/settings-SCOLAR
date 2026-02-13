import type { SettingsTab } from '../../types';
import account from '../../assets/images/account.svg';
import calendar from '../../assets/images/calendar.svg';
import school from '../../assets/images/school.svg';
import filiere from '../../assets/images/filiere.svg';
import classIcon from '../../assets/images/class.svg';
import type { SidebarProps } from '../../types';


export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const generalItems = [
    { id: 'infos-generales' as SettingsTab, label: 'Informations générales', icon: account, isSvg: true },
  ];

  const structureItems = [
    { id: 'annees-scolaires' as SettingsTab, label: 'Années scolaires', icon: calendar, isSvg: true },
    { id: 'cycles' as SettingsTab, label: 'Cycles', icon: school, isSvg: true },
    { id: 'filieres' as SettingsTab, label: 'Filières', icon: filiere, isSvg: true },
    { id: 'classes' as SettingsTab, label: 'Classes', icon: classIcon, isSvg: true },
  ];

  const renderIcon = (icon: string, isSvg: boolean) => {
    if (isSvg) {
      return <img src={icon} alt="" className="w-5 h-5" />;
    }
    return null;
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paramètres</h2>
        <nav className="mt-4 space-y-1">
          {generalItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover-bg-slate-100'
                  }`}
              >
                {renderIcon(item.icon, item.isSvg)}
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
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {renderIcon(item.icon, item.isSvg)}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
