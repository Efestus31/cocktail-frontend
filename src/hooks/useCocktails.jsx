import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useCocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/cocktails')
      .then(res => setCocktails(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { cocktails, loading, error };
}
