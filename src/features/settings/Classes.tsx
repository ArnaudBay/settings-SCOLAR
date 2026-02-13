import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import type { Classe, Filiere } from '../../types';
import classIcon from '../../assets/images/class.svg';

export const Classes = () => {
  // Liste des filières disponibles (normalement viendrait d'une API)
  const [filieres] = useState<Filiere[]>([
    { id: '1', nom: 'Générale', description: 'Filière générale', cycleId: '2' },
    { id: '2', nom: 'Technique', description: 'Filière technique', cycleId: '2' },
  ]);

  // Liste des classes
  const [classes, setClasses] = useState<Classe[]>([
    { id: '1', nom: '6ème A', description: 'Classe de 6ème', filiereId: '1', effectif: 25 },
    { id: '2', nom: '5ème B', description: 'Classe de 5ème', filiereId: '1', effectif: 28 },
    { id: '3', nom: "Première année", description: "Première année de l'enseignement secondaire", filiereId: '2', effectif: 15 },
  ]);

  // États pour gérer les modals (fenêtres popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // États pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [filiereId, setFiliereId] = useState('');
  const [effectif, setEffectif] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour ouvrir le modal d'ajout
  const openAddModal = () => {
    setEditingId(null);
    setNom('');
    setDescription('');
    setFiliereId(filieres[0]?.id || '');
    setEffectif('');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour ouvrir le modal de modification
  const openEditModal = (classe: Classe) => {
    setEditingId(classe.id);
    setNom(classe.nom);
    setDescription(classe.description || '');
    setFiliereId(classe.filiereId);
    setEffectif(classe.effectif?.toString() || '');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!nom.trim()) {
      setErrorMessage('Le nom est requis');
      return false;
    }
    if (!filiereId) {
      setErrorMessage('La filière est requise');
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

    // Préparer les données de la classe
    const classeData: Omit<Classe, 'id'> = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      filiereId: filiereId,
      effectif: effectif ? Number(effectif) : undefined,
    };

    if (editingId) {
      // Modifier une classe existante
      setClasses((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...classeData } : item))
      );
    } else {
      // Ajouter une nouvelle classe
      const newClasse: Classe = {
        id: crypto.randomUUID(), // Génère un ID unique
        ...classeData,
      };
      setClasses((prev) => [...prev, newClasse]);
    }

    // Fermer le modal et réinitialiser le formulaire
    setIsModalOpen(false);
    setNom('');
    setDescription('');
    setFiliereId('');
    setEffectif('');
    setErrorMessage('');
  };

  // Fonction pour supprimer une classe
  const handleDelete = () => {
    if (deleteId) {
      setClasses((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // Fonction pour trouver le nom d'une filière à partir de son ID
  const getFiliereNom = (id: string) => {
    const filiere = filieres.find((f) => f.id === id);
    return filiere ? filiere.nom : '-';
  };

  return (
    <div>
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Classes</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gérez les classes de votre établissement.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Ajouter une classe
        </button>
      </div>

      {/* Tableau des classes */}
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
                Filière
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Effectif
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {classes.map((classe) => (
              <tr key={classe.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src={classIcon} alt="Class Icon" />
                    <span className="text-sm font-medium text-slate-900">{classe.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {classe.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {getFiliereNom(classe.filiereId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {classe.effectif || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(classe)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(classe.id)}
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

      {/* Modal pour ajouter/modifier une classe */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingId ? 'Modifier la classe' : 'Ajouter une classe'}
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
                  placeholder="6ème A"
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
                  placeholder="Description de la classe"
                />
              </div>

              {/* Champ Filière */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Filière *
                </label>
                <select
                  value={filiereId}
                  onChange={(e) => setFiliereId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une filière</option>
                  {filieres.map((filiere) => (
                    <option key={filiere.id} value={filiere.id}>
                      {filiere.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Champ Effectif */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Effectif
                </label>
                <input
                  type="number"
                  value={effectif}
                  onChange={(e) => setEffectif(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25"
                  min="0"
                />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Supprimer la classe
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette classe ? Cette action est irréversible.
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
