import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBook, FiX } from 'react-icons/fi';
import type { Cycle, AnneeScolaire } from '../../types';

export const Cycles = () => {
  // Liste des années scolaires disponibles (normalement viendrait d'une API)
  const [anneesScolaires] = useState<AnneeScolaire[]>([
    { id: '1', nom: '2024-2025', dateDebut: '2024-09-01', dateFin: '2025-06-30', estActive: false },
    { id: '2', nom: '2025-2026', dateDebut: '2025-09-25', dateFin: '2026-06-30', estActive: true },
  ]);

  // Liste des cycles
  const [cycles, setCycles] = useState<Cycle[]>([
    { id: '1', nom: 'Cycle Primaire', description: 'Cycle d\'enseignement primaire', anneeScolaireId: '1' },
    { id: '2', nom: 'Cycle Secondaire', description: 'Cycle d\'enseignement secondaire', anneeScolaireId: '1' },
    { id: '3', nom: 'Universitaire', description: 'Système LMD', anneeScolaireId: '2' },
  ]);

  // États pour gérer les modals (fenêtres popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // États pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [anneeScolaireId, setAnneeScolaireId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour ouvrir le modal d'ajout
  const openAddModal = () => {
    setEditingId(null);
    // Trouver l'année scolaire active par défaut
    const anneeActive = anneesScolaires.find((a) => a.estActive);
    setNom('');
    setDescription('');
    setAnneeScolaireId(anneeActive?.id || '');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour ouvrir le modal de modification
  const openEditModal = (cycle: Cycle) => {
    setEditingId(cycle.id);
    setNom(cycle.nom);
    setDescription(cycle.description || '');
    setAnneeScolaireId(cycle.anneeScolaireId);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!nom.trim()) {
      setErrorMessage('Le nom est requis');
      return false;
    }
    if (!anneeScolaireId) {
      setErrorMessage('L\'année scolaire est requise');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifier que les champs sont valides
    if (!validateForm()) {
      return;
    }

    // Préparer les données du cycle
    const cycleData: Omit<Cycle, 'id'> = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      anneeScolaireId: anneeScolaireId,
    };

    if (editingId) {
      // Modifier un cycle existant
      setCycles((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...cycleData } : item))
      );
    } else {
      // Ajouter un nouveau cycle
      const newCycle: Cycle = {
        id: crypto.randomUUID(), // Génère un ID unique
        ...cycleData,
      };
      setCycles((prev) => [...prev, newCycle]);
    }

    // Fermer le modal et réinitialiser le formulaire
    setIsModalOpen(false);
    setNom('');
    setDescription('');
    setAnneeScolaireId('');
    setErrorMessage('');
  };

  // Fonction pour supprimer un cycle
  const handleDelete = () => {
    if (deleteId) {
      setCycles((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // Fonction pour trouver le nom d'une année scolaire à partir de son ID
  const getAnneeScolaireNom = (id: string) => {
    const annee = anneesScolaires.find((a) => a.id === id);
    return annee ? annee.nom : '-';
  };

  return (
    <div>
      {/* En-tête avec titre et bouton d'ajout */}
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

      {/* Tableau des cycles */}
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

      {/* Modal pour ajouter/modifier un cycle */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champ Nom */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cycle Primaire"
                />
              </div>

              {/* Champ Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description du cycle"
                />
              </div>

              {/* Champ Année scolaire */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Année scolaire *
                </label>
                <select
                  value={anneeScolaireId}
                  onChange={(e) => setAnneeScolaireId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une année scolaire</option>
                  {anneesScolaires.map((annee) => (
                    <option key={annee.id} value={annee.id}>
                      {annee.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message d'erreur */}
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              {/* Boutons */}
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

      {/* Modal pour confirmer la suppression */}
      {deleteId && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
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
