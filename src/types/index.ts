// Types pour l'application de gestion scolaire

export interface Etablissement {
  id: string;
  nom: string;
  logo?: string;
  adresse: string;
  ville: string;
  codePostal: string;
  telephone: string;
  email: string;
  siteWeb?: string;
  description?: string;
}

export interface AnneeScolaire {
  id: string;
  nom: string;
  dateDebut: string;
  dateFin: string;
  estActive: boolean;
}

export interface Cycle {
  id: string;
  nom: string;
  description?: string;
  anneeScolaireId: string;
}

export interface Filiere {
  id: string;
  nom: string;
  description?: string;
  cycleId: string;
}

export interface Classe {
  id: string;
  nom: string;
  description?: string;
  filiereId: string;
  effectif?: number;
}

export type SettingsTab = 'infos-generales' | 'structure-academique';
