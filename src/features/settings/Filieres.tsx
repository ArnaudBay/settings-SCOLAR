import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiX } from 'react-icons/fi';
import type { Filiere, Cycle } from '../../types';

export const Filieres = () => {
  // Liste des cycles disponibles (normalement viendrait d'une API)
  const [cycles] = useState<Cycle[]>([
    { id: '1', nom: 'Cycle Primaire', description: 'Cycle d\'enseignement primaire', anneeScolaireId: '1' },
    { id: '2', nom: 'Cycle Secondaire', description: 'Cycle d\'enseignement secondaire', anneeScolaireId: '1' },
    { id: '3', nom: 'Universitaire', description: 'Système LMD', anneeScolaireId: '2' },
  ]);

  // Liste des filières
  const [filieres, setFilieres] = useState<Filiere[]>([
    { id: '1', nom: 'Générale', description: 'Filière générale', cycleId: '2' },
    { id: '2', nom: 'Technique', description: 'Filière technique', cycleId: '2' },
  ]);

  // États pour gérer les modals (fenêtres popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // États pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [cycleId, setCycleId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour ouvrir le modal d'ajout
  const openAddModal = () => {
    setEditingId(null);
    setNom('');
    setDescription('');
    setCycleId(cycles[0]?.id || '');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour ouvrir le modal de modification
  const openEditModal = (filiere: Filiere) => {
    setEditingId(filiere.id);
    setNom(filiere.nom);
    setDescription(filiere.description || '');
    setCycleId(filiere.cycleId);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!nom.trim()) {
      setErrorMessage('Le nom est requis');
      return false;
    }
    if (!cycleId) {
      setErrorMessage('Le cycle est requis');
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

    // Préparer les données de la filière
    const filiereData: Omit<Filiere, 'id'> = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      cycleId: cycleId,
    };

    if (editingId) {
      // Modifier une filière existante
      setFilieres((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...filiereData } : item))
      );
    } else {
      // Ajouter une nouvelle filière
      const newFiliere: Filiere = {
        id: crypto.randomUUID(), // Génère un ID unique
        ...filiereData,
      };
      setFilieres((prev) => [...prev, newFiliere]);
    }

    // Fermer le modal et réinitialiser le formulaire
    setIsModalOpen(false);
    setNom('');
    setDescription('');
    setCycleId('');
    setErrorMessage('');
  };

  // Fonction pour supprimer une filière
  const handleDelete = () => {
    if (deleteId) {
      setFilieres((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // Fonction pour trouver le nom d'un cycle à partir de son ID
  const getCycleNom = (id: string) => {
    const cycle = cycles.find((c) => c.id === id);
    return cycle ? cycle.nom : '-';
  };

  return (
    <div>
      {/* En-tête avec titre et bouton d'ajout */}
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

      {/* Tableau des filières */}
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

      {/* Modal pour ajouter/modifier une filière */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
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
                  placeholder="Générale"
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
                  placeholder="Description de la filière"
                />
              </div>

              {/* Champ Cycle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cycle *
                </label>
                <select
                  value={cycleId}
                  onChange={(e) => setCycleId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un cycle</option>
                  {cycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.nom}
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
