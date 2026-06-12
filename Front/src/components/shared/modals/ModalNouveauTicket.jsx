import { useEffect, useState, useContext } from "react";
import { X } from "lucide-react";
import { ConnaissancesContext } from "../../../context/baseConnaisssance/ConnaissancesContext";
import { useCategory } from "../../../hooks/category/useCategory";
import {useNavigate} from "react-router-dom"
const initialFormState = {
  categoryId: "",
  titre: "",
  description: "",
  priority: "faible",
};

export default function ModalNouveauTicket({
  setIsTicketModalOpen,
  handleAjoutTicket,
}) {
  const { categories, fetchCategories } = useCategory();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const { suggestions, suggestionConnaissances,resetSuggestions } =
    useContext(ConnaissancesContext);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      await fetchCategories();
      setIsLoadingCategories(false);
    };

    loadCategories();
  }, [fetchCategories]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      categoryId: Number(formData.categoryId),
      titre: formData.titre.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    };

    if (payload.titre.length < 3) {
      setError("Le titre doit contenir au moins 3 caractères.");
      return;
    }

    if (payload.description.length < 10) {
      setError("La description doit contenir au moins 10 caractères.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await handleAjoutTicket(payload);
      setIsTicketModalOpen(false);
    } catch {
      setError("Impossible de créer ce ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const navigate = useNavigate()
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 px-4 py-6"
      onClick={() => {
        if (!isSubmitting) {
          setIsTicketModalOpen(false);
          resetSuggestions()
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="w-full max-w-3xl rounded-2xl bg-slate-100 p-6 shadow-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#303030]">
                Nouveau ticket
              </h1>
            </div>

            <button
              type="button"
              onClick={() => (setIsTicketModalOpen(false), resetSuggestions())}
              disabled={isSubmitting}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Fermer la modal"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor="titre"
                className="text-lg font-bold text-[#303030]"
              >
                Définissez le problème
              </label>

              <input
                id="titre"
                name="titre"
                type="text"
                placeholder="Titre"
                value={formData.titre}
                onChange={handleChange}
                minLength="3"
                maxLength="30"
                required
                className="my-3 rounded-xl bg-white p-3 outline-none transition focus:ring-2 focus:ring-[#303030]"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-lg font-bold text-[#303030]"
              >
                Veuillez préciser le problème
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                minLength="10"
                maxLength="500"
                required
                className="my-3 h-36 resize-none rounded-xl bg-white p-3 outline-none transition focus:ring-2 focus:ring-[#303030]"
              />
              <button
                type="button"
                onClick={() =>
                  suggestionConnaissances(formData.titre, formData.description)
                }
                className="mt-2 rounded-2xl bg-[#333370] px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#40408f] active:scale-95 "
              >
                Rechercher des solutions
              </button>
              {suggestions.length > 0 && (
                <details className="mt-4 rounded-2xl bg-white shadow-sm">
                  <summary
                    className="cursor-pointer list-none rounded-2xl px-5 py-4 font-semibold text-[#333370] hover:bg-slate-50"
                  >
                     {suggestions.length} solution(s) trouvée(s)
                  </summary>

                  <div className="flex flex-col gap-3 p-4">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.article.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold">
                              {suggestion.article.title}
                            </h4>

                            <p className="text-sm text-slate-500">
                              Score : {suggestion.points}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={()=>navigate(`/user/connaissances/${suggestion?.article?.id}`)}
                            className="rounded-lg bg-[#333370] px-3 py-2 text-sm font-semibold text-white">
                            Voir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="priority"
                className="text-lg font-bold text-[#303030]"
              >
                Priorité
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="my-3 rounded-xl bg-white p-3 outline-none transition focus:ring-2 focus:ring-[#303030]"
              >
                <option value="faible">faible</option>
                <option value="moyenne">moyenne</option>
                <option value="haute">haute</option>
                <option value="urgente">urgente</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => (setIsTicketModalOpen(false),resetSuggestions())}
                disabled={isSubmitting}
                className="rounded-xl bg-white px-5 py-3 font-semibold text-[#303030] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isLoadingCategories}
                className="rounded-xl bg-[#303030] px-5 py-3 font-semibold text-white transition hover:bg-[#505050] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
