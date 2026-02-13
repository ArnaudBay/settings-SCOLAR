import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AnneeScolaire } from '../../types';

const anneeScolaireSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  dateDebut: z.string().min(1, 'La date de début est requise'),
  dateFin: z.string().min(1, 'La date de fin est requise'),
  estActive: z.boolean(),
}).refine((data) => new Date(data.dateDebut) < new Date(data.dateFin), {
  message: 'La date de fin doit être postérieure à la date de début',
  path: ['dateFin'],
});

type AnneeScolaireFormData = z.infer<typeof anneeScolaireSchema>;

export const AnneScolaire = () => {
  const [anneesScolaires, setAnneesScolaires] = useState<AnneeScolaire[]>([
    { id: '1', nom: '2024-2025', dateDebut: '2024-09-01', dateFin: '2025-06-30', estActive: false },
    { id: '2', nom: '2025-2026', dateDebut: '2025-09-25', dateFin: '2026-06-30', estActive: true },
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
  } = useForm<AnneeScolaireFormData>({
    resolver: zodResolver(anneeScolaireSchema),
    defaultValues: {
      nom: '',
      dateDebut: '',
      dateFin: '',
      estActive: false,
    },
  });

  const openAddModal = () => {
    setEditingId(null);
    reset({ nom: '', dateDebut: '', dateFin: '', estActive: false });
    setIsModalOpen(true);
  };

  const openEditModal = (annee: AnneeScolaire) => {
    setEditingId(annee.id);
    setValue('nom', annee.nom);
    setValue('dateDebut', annee.dateDebut);
    setValue('dateFin', annee.dateFin);
    setValue('estActive', annee.estActive);
    setIsModalOpen(true);
  };

  const onSubmit = (data: AnneeScolaireFormData) => {
    if (editingId) {
      setAnneesScolaires((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...data }
            : { ...item, estActive: data.estActive ? false : item.estActive }
        )
      );
    } else {
      const newAnnee: AnneeScolaire = {
        id: crypto.randomUUID(),
        ...data,
      };
      setAnneesScolaires((prev) => {
        if (data.estActive) {
          return prev.map((item) => ({ ...item, estActive: false })).concat(newAnnee);
        }
        return [...prev, newAnnee];
      });
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDelete = () => {
    if (deleteId) {
      setAnneesScolaires((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Années scolaires</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les années scolaires de votre établissement.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
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
                    <button
                      onClick={() => openEditModal(annee)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(annee.id)}
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
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingId ? 'Modifier l\'année scolaire' : 'Ajouter une année scolaire'}
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
                  placeholder="2024-2025"
                />
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date de début *
                </label>
                <input
                  type="date"
                  {...register('dateDebut')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateDebut && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateDebut.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date de fin *
                </label>
                <input
                  type="date"
                  {...register('dateFin')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateFin && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateFin.message}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('estActive')}
                  id="estActive"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="estActive" className="text-sm font-medium text-slate-700">
                  Année scolaire active
                </label>
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
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Supprimer l'année scolaire
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette année scolaire ? Cette action est irréversible.
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
