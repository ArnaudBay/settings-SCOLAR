import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import type { Filiere } from '../../types';

export const Filieres = () => {
  const [filieres] = useState<Filiere[]>([
    { id: '1', nom: 'Générale', description: 'Filière générale', cycleId: '2' },
    { id: '2', nom: 'Technique', description: 'Filière technique', cycleId: '2' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Filières</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les filières d'enseignement de votre établissement.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FiPlus className="w-4 h-4" />
          Ajouter une filière
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Cycle
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filieres.map((filiere) => (
              <tr key={filiere.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FiUsers className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">{filiere.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {filiere.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Cycle Secondaire
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
