import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiX } from 'react-icons/fi';
import type { AnneeScolaire } from '../../types';

export const AnneScolaire = () => {
  // Liste des années scolaires
  const [anneesScolaires, setAnneesScolaires] = useState<AnneeScolaire[]>([
    { id: '1', nom: '2024-2025', dateDebut: '2024-09-01', dateFin: '2025-06-30', estActive: false },
    { id: '2', nom: '2025-2026', dateDebut: '2025-09-25', dateFin: '2026-06-30', estActive: true },
  ]);

  // États pour gérer les modals (fenêtres popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // États pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [estActive, setEstActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour ouvrir le modal d'ajout
  const openAddModal = () => {
    setEditingId(null);
    setNom('');
    setDateDebut('');
    setDateFin('');
    setEstActive(false);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour ouvrir le modal de modification
  const openEditModal = (annee: AnneeScolaire) => {
    setEditingId(annee.id);
    setNom(annee.nom);
    setDateDebut(annee.dateDebut);
    setDateFin(annee.dateFin);
    setEstActive(annee.estActive);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!nom.trim()) {
      setErrorMessage('Le nom est requis');
      return false;
    }
    if (!dateDebut) {
      setErrorMessage('La date de début est requise');
      return false;
    }
    if (!dateFin) {
      setErrorMessage('La date de fin est requise');
      return false;
    }
    // Vérifier que la date de fin est après la date de début
    if (new Date(dateDebut) >= new Date(dateFin)) {
      setErrorMessage('La date de fin doit être postérieure à la date de début');
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

    // Préparer les données de l'année scolaire
    const anneeData: Omit<AnneeScolaire, 'id'> = {
      nom: nom.trim(),
      dateDebut: dateDebut,
      dateFin: dateFin,
      estActive: estActive,
    };

    if (editingId) {
      // Modifier une année scolaire existante
      setAnneesScolaires((prev) => {
        return prev.map((item) => {
          if (item.id === editingId) {
            return { ...item, ...anneeData };
          }
          // Si on active cette année, désactiver les autres
          if (estActive) {
            return { ...item, estActive: false };
          }
          return item;
        });
      });
    } else {
      // Ajouter une nouvelle année scolaire
      const newAnnee: AnneeScolaire = {
        id: crypto.randomUUID(), // Génère un ID unique
        ...anneeData,
      };
      setAnneesScolaires((prev) => {
        // Si on active cette année, désactiver toutes les autres
        if (estActive) {
          const desactivees = prev.map((item) => ({ ...item, estActive: false }));
          return [...desactivees, newAnnee];
        }
        return [...prev, newAnnee];
      });
    }

    // Fermer le modal et réinitialiser le formulaire
    setIsModalOpen(false);
    setNom('');
    setDateDebut('');
    setDateFin('');
    setEstActive(false);
    setErrorMessage('');
  };

  // Fonction pour supprimer une année scolaire
  const handleDelete = () => {
    if (deleteId) {
      setAnneesScolaires((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div>
      {/* En-tête avec titre et bouton d'ajout */}
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

      {/* Tableau des années scolaires */}
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

      {/* Modal pour ajouter/modifier une année scolaire */}
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
                  placeholder="2024-2025"
                />
              </div>

              {/* Champ Date de début */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date de début *
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Champ Date de fin */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date de fin *
                </label>
                <input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Case à cocher pour année active */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={estActive}
                  onChange={(e) => setEstActive(e.target.checked)}
                  id="estActive"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="estActive" className="text-sm font-medium text-slate-700">
                  Année scolaire active
                </label>
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
