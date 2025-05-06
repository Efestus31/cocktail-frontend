import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useCocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/cocktails')
      .then(res => {
        const list = Array.isArray(res.data.data) ? res.data.data : [];
        setCocktails(list);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { cocktails, loading, error };
}
