import { useState } from 'react';
import { FiCalendar, FiBook, FiUsers } from 'react-icons/fi';
import { AnneScolaire } from './AnneScolaire';
import { Cycles } from './Cycles';
import { Filieres } from './Filieres';
import { Classes } from './Classes';

export const StructureAcademique = () => {
  const [activeSection, setActiveSection] = useState<'annees' | 'cycles' | 'filieres' | 'classes'>('annees');

  const sections = [
    { id: 'annees' as const, label: 'Années scolaires', icon: FiCalendar },
    { id: 'cycles' as const, label: 'Cycles', icon: FiBook },
    { id: 'filieres' as const, label: 'Filières', icon: FiUsers },
    { id: 'classes' as const, label: 'Classes', icon: FiUsers },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Structure académique</h1>
        <p className="text-slate-600 mt-1">
          Gérez la hiérarchie académique de votre établissement : années scolaires, cycles, filières et classes.
        </p>
      </div>

      {/* Navigation par sections */}
      <div className="mb-6 border-b border-slate-200">
        <nav className="flex gap-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu de la section active */}
      <div className="mt-6">
        {activeSection === 'annees' && <AnneScolaire />}
        {activeSection === 'cycles' && <Cycles />}
        {activeSection === 'filieres' && <Filieres />}
        {activeSection === 'classes' && <Classes />}
      </div>
    </div>
  );
};
