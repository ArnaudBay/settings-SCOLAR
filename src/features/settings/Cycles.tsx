import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBook, FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Cycle, AnneeScolaire } from '../../types';

const cycleSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  anneeScolaireId: z.string().min(1, 'L\'année scolaire est requise'),
});

type CycleFormData = z.infer<typeof cycleSchema>;

export const Cycles = () => {
  // Données mockées pour les années scolaires - à remplacer par un vrai état global ou API
  const [anneesScolaires] = useState<AnneeScolaire[]>([
    { id: '1', nom: '2024-2025', dateDebut: '2024-09-01', dateFin: '2025-06-30', estActive: false },
    { id: '2', nom: '2025-2026', dateDebut: '2025-09-25', dateFin: '2026-06-30', estActive: true },
  ]);

  const [cycles, setCycles] = useState<Cycle[]>([
    { id: '1', nom: 'Cycle Primaire', description: 'Cycle d\'enseignement primaire', anneeScolaireId: '1' },
    { id: '2', nom: 'Cycle Secondaire', description: 'Cycle d\'enseignement secondaire', anneeScolaireId: '1' },
    { id: '3', nom: 'Universitaire', description: 'Système LMD', anneeScolaireId: '2' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CycleFormData>({
    resolver: zodResolver(cycleSchema),
    defaultValues: {
      nom: '',
      description: '',
      anneeScolaireId: '',
    },
  });

  const openAddModal = () => {
    setEditingId(null);
    reset({ nom: '', description: '', anneeScolaireId: anneesScolaires.find(a => a.estActive)?.id || '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cycle: Cycle) => {
    setEditingId(cycle.id);
    setValue('nom', cycle.nom);
    setValue('description', cycle.description || '');
    setValue('anneeScolaireId', cycle.anneeScolaireId);
    setIsModalOpen(true);
  };

  const onSubmit = (data: CycleFormData) => {
    if (editingId) {
      setCycles((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...data } : item))
      );
    } else {
      const newCycle: Cycle = {
        id: Date.now().toString(),
        ...data,
      };
      setCycles((prev) => [...prev, newCycle]);
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDelete = () => {
    if (deleteId) {
      setCycles((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const getAnneeScolaireNom = (id: string) => {
    return anneesScolaires.find((a) => a.id === id)?.nom || '-';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Cycles</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les cycles d'enseignement de votre établissement.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Ajouter un cycle
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
                Année scolaire
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {cycles.map((cycle) => (
              <tr key={cycle.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FiBook className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">{cycle.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {cycle.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {getAnneeScolaireNom(cycle.anneeScolaireId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(cycle)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(cycle.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Ajout/Modification */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingId ? 'Modifier le cycle' : 'Ajouter un cycle'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  {...register('nom')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cycle Primaire"
                />
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description du cycle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Année scolaire *
                </label>
                <select
                  {...register('anneeScolaireId')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une année scolaire</option>
                  {anneesScolaires.map((annee) => (
                    <option key={annee.id} value={annee.id}>
                      {annee.nom}
                    </option>
                  ))}
                </select>
                {errors.anneeScolaireId && (
                  <p className="mt-1 text-sm text-red-600">{errors.anneeScolaireId.message}</p>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Supprimer le cycle
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce cycle ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
