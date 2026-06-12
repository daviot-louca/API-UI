import { useState, useMemo, useCallback } from "react";
import { ConnaissancesContext } from "./ConnaissancesContext";
import {
  getAllService,
  getOneService,
  ajoutConnaissancesService,
  modifierConnaissancesService,
  supprimerConnaissancesService,
  suggestionConnaissancesService,
} from "../../services/baseConnaissances.service";

export function ConnaissancesProvider({ children }) {
  const [connaissances, setConnaissances] = useState([]);
  const [connaissance, setConnaissance] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const voirToutesConnaissances = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getAllService(token);
      setConnaissances(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const voirUneConnaissance = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");
      const data = await getOneService(id, token);
      setConnaissance(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const AjouterConnaissance = useCallback(
    async (title, content, categoryId, ticketId) => {
      try {
        const token = localStorage.getItem("token");
        await ajoutConnaissancesService(
          token,
          title,
          content,
          categoryId,
          ticketId,
        );
        await voirToutesConnaissances();
      } catch (error) {
        console.log(error);
      }
    },
    [voirToutesConnaissances],
  );

  const ModifierConnaissance = useCallback(
    async (id, title, content, categoryId, ticketId) => {
      try {
        const token = localStorage.getItem("token");
        await modifierConnaissancesService(
          id,
          token,
          title,
          content,
          categoryId,
          ticketId,
        );
        await voirToutesConnaissances();
      } catch (error) {
        console.log(error);
      }
    },
    [voirToutesConnaissances],
  );

  const supprimerConnaissances = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("token");

        await supprimerConnaissancesService(id, token);

        await voirToutesConnaissances();
      } catch (error) {
        console.log(error);
      }
    },
    [voirToutesConnaissances],
  );

  const suggestionConnaissances = useCallback(async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await suggestionConnaissancesService(
        token,
        title,
        description,
      );
      setSuggestions(reponse);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const resetSuggestions = () => {
    setSuggestions([]);
  };
  const value = useMemo(
    () => ({
      connaissances,
      connaissance,
      suggestions,
      voirToutesConnaissances,
      voirUneConnaissance,
      AjouterConnaissance,
      ModifierConnaissance,
      supprimerConnaissances,
      suggestionConnaissances,
      resetSuggestions,
    }),
    [
      connaissances,
      connaissance,
      suggestions,
      voirToutesConnaissances,
      voirUneConnaissance,
      AjouterConnaissance,
      ModifierConnaissance,
      supprimerConnaissances,
      suggestionConnaissances,
      resetSuggestions,
    ],
  );
  return (
    <ConnaissancesContext.Provider value={value}>
      {children}
    </ConnaissancesContext.Provider>
  );
}
