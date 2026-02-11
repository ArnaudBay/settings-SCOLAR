import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiUpload, FiTrash2, FiMail, FiPhone, FiGlobe, FiHome } from 'react-icons/fi';

const etablissementSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  adresse: z.string().min(1, 'L\'adresse est requise'),
  ville: z.string().min(1, 'La ville est requise'),
  //codePostal: z.string().min(1, 'Le code postal est requis'),
  telephone: z.string().min(1, 'Le téléphone est requis'),
  email: z.string().email({message:'Email invalide'}),
  siteWeb: z.string().url({message:'URL invalide'}).optional().or(z.literal('')),
  description: z.string().optional(),
});

type EtablissementFormData = z.infer<typeof etablissementSchema>;

export const InfosGenerales = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EtablissementFormData>({
    resolver: zodResolver(etablissementSchema),
    defaultValues: {
      nom: '',
      adresse: '',
      ville: '',
      //codePostal: '',
      telephone: '',
      email: '',
      siteWeb: '',
      description: '',
    },
  });

  const onSubmit = (data: EtablissementFormData) => {
    console.log('Données soumises:', data);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Informations générales</h1>
        <p className="text-slate-600 mt-1">
          Informations et activités en temps réel de votre établissement.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Logo de l'établissement
          </label>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300">
              <FiHome className="w-10 h-10 text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600 mb-2">Logo de l'établissement</p>
              <p className="text-xs text-slate-500 mb-3">PNG, JPEG sous 5MB</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                >
                  <FiUpload className="w-4 h-4" />
                  Télécharger un nouveau logo
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nom de l'établissement */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Nom de l'établissement
          </label>
          <input
            type="text"
            {...register('nom')}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nom de l'établissement"
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
          )}
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Adresse
          </label>
          <div className="space-y-3">
            <input
              type="text"
              {...register('adresse')}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adresse"
            />
            {errors.adresse && (
              <p className="text-sm text-red-600">{errors.adresse.message}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  {...register('ville')}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ville"
                />
                {errors.ville && (
                  <p className="mt-1 text-sm text-red-600">{errors.ville.message}</p>
                )}
              </div>
      
            </div>
          </div>
        </div>

        {/* Contact email */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email de contact
          </label>
          <p className="text-sm text-slate-600 mb-3">
            Gérez l'adresse email de votre établissement pour les factures.
          </p>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              {...register('email')}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@exemple.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Téléphone
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="tel"
              {...register('telephone')}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+236 72 00 00 00"
            />
          </div>
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>
          )}
        </div>

        {/* Site web */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Site web
          </label>
          <div className="relative">
            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="url"
              {...register('siteWeb')}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.exemple.com"
            />
          </div>
          {errors.siteWeb && (
            <p className="mt-1 text-sm text-red-600">{errors.siteWeb.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Description de l'établissement"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};
