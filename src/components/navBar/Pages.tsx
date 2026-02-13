import { useState } from 'react';
import type { SettingsTab } from '../../types';
import { InfosGenerales } from '../../features/settings/InfosGenerales';
import { AnneScolaire } from '../../features/settings/AnneScolaire';
import { Cycles } from '../../features/settings/Cycles';
import { Filieres } from '../../features/settings/Filieres';
import { Classes } from '../../features/settings/Classes';
import { Sidebar } from './Sidebar';

export const Pages = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('infos-generales');

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="flex-2 overflow-y-auto">
        <div className="p-8 w-full">
          {activeTab === 'infos-generales' && <InfosGenerales />}
          {activeTab === 'annees-scolaires' && <AnneScolaire />}
          {activeTab === 'cycles' && <Cycles />}
          {activeTab === 'filieres' && <Filieres />}
          {activeTab === 'classes' && <Classes />}
        </div>
      </div>
    </div>
  );
};
