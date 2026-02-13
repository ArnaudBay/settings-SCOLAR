import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Filiere, Cycle } from '../../types';

const filiereSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  cycleId: z.string().min(1, 'Le cycle est requis'),
});

type FiliereFormData = z.infer<typeof filiereSchema>;

export const Filieres = () => {
  // Données mockées pour les cycles - à remplacer par un vrai état global ou API
  const [cycles] = useState<Cycle[]>([
    { id: '1', nom: 'Cycle Primaire', description: 'Cycle d\'enseignement primaire', anneeScolaireId: '1' },
    { id: '2', nom: 'Cycle Secondaire', description: 'Cycle d\'enseignement secondaire', anneeScolaireId: '1' },
    { id: '3', nom: 'Universitaire', description: 'Système LMD', anneeScolaireId: '2' },
  ]);

  const [filieres, setFilieres] = useState<Filiere[]>([
    { id: '1', nom: 'Générale', description: 'Filière générale', cycleId: '2' },
    { id: '2', nom: 'Technique', description: 'Filière technique', cycleId: '2' },
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
  } = useForm<FiliereFormData>({
    resolver: zodResolver(filiereSchema),
    defaultValues: {
      nom: '',
      description: '',
      cycleId: '',
    },
  });

  const openAddModal = () => {
    setEditingId(null);
    reset({ nom: '', description: '', cycleId: cycles[0]?.id || '' });
    setIsModalOpen(true);
  };

  const openEditModal = (filiere: Filiere) => {
    setEditingId(filiere.id);
    setValue('nom', filiere.nom);
    setValue('description', filiere.description || '');
    setValue('cycleId', filiere.cycleId);
    setIsModalOpen(true);
  };

  const onSubmit = (data: FiliereFormData) => {
    if (editingId) {
      setFilieres((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...data } : item))
      );
    } else {
      const newFiliere: Filiere = {
        id: Date.now().toString(),
        ...data,
      };
      setFilieres((prev) => [...prev, newFiliere]);
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDelete = () => {
    if (deleteId) {
      setFilieres((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const getCycleNom = (id: string) => {
    return cycles.find((c) => c.id === id)?.nom || '-';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Filières</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les filières d'enseignement de votre établissement.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
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
                  {getCycleNom(filiere.cycleId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(filiere)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(filiere.id)}
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
                {editingId ? 'Modifier la filière' : 'Ajouter une filière'}
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
                  placeholder="Générale"
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
                  placeholder="Description de la filière"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cycle *
                </label>
                <select
                  {...register('cycleId')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un cycle</option>
                  {cycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.nom}
                    </option>
                  ))}
                </select>
                {errors.cycleId && (
                  <p className="mt-1 text-sm text-red-600">{errors.cycleId.message}</p>
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
              Supprimer la filière
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette filière ? Cette action est irréversible.
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
