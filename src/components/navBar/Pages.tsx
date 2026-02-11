import { useState } from 'react';
import type { SettingsTab } from '../../types';
import { InfosGenerales } from '../../features/settings/InfosGenerales';
import { StructureAcademique } from '../../features/settings/StructureAcademique';
import { Sidebar } from './Sidebar';

export const Pages = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('infos-generales');

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === 'infos-generales' && <InfosGenerales />}
          {activeTab === 'structure-academique' && <StructureAcademique />}
        </div>
      </div>
    </div>
  );
};
