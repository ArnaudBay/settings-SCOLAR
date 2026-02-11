import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import type { AnneeScolaire } from '../../types';

export const AnneScolaire = () => {
  const [anneesScolaires] = useState<AnneeScolaire[]>([
    { id: '1', nom: '2024-2025', dateDebut: '2024-09-01', dateFin: '2025-06-30', estActive: true },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Années scolaires</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les années scolaires de votre établissement.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FiPlus className="w-4 h-4" />
          Ajouter une année scolaire
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
                Date de début
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Date de fin
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {anneesScolaires.map((annee) => (
              <tr key={annee.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">{annee.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {new Date(annee.dateDebut).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {new Date(annee.dateFin).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {annee.estActive ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-full">
                      Inactive
                    </span>
                  )}
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
