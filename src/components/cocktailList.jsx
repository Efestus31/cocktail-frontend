import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import '../pages/CocktailList.css';

const CocktailList = () => {
  // — stati “base”
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // — stati di paginazione e filtri
  const [page, setPage]               = useState(1);
  const [perPage] = useState(12);
  const [typeFilter, setTypeFilter]           = useState('');
  const [ingredientFilter, setIngredientFilter] = useState('');

  // — metadati restituiti dall’API
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page:    1
  });

  // — dati per i dropdown di filtro
  const [types, setTypes]           = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // 1. Caricamento tipi e ingredienti (una volta)
  useEffect(() => {
    api.get('/types')
       .then(res => {
         // res.data è un array di tipi
         setTypes(Array.isArray(res.data) ? res.data : []);
       })
       .catch(() => setTypes([]));

    api.get('/ingredients')
       .then(res => {
         // res.data è un array di ingredienti
         setIngredients(Array.isArray(res.data) ? res.data : []);
       })
       .catch(() => setIngredients([]));
  }, []);

  // 2. Caricamento cocktails ad ogni cambio di page, typeFilter o ingredientFilter
  useEffect(() => {
    setLoading(true);
    setError(null);

    api.get('/cocktails', {
      params: {
        page,
        per_page: perPage,
        type: typeFilter || undefined,
        ingredient: ingredientFilter || undefined,
      }
    })
    .then(res => {
      const payload = res.data;
      // payload.data contiene l'array dei cocktail
      setCocktails(Array.isArray(payload.data) ? payload.data : []);
      // payload.meta contiene current_page e last_page
      setPagination({
        current_page: payload.meta?.current_page ?? 1,
        last_page:    payload.meta?.last_page    ?? 1
      });
    })
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }, [page, perPage, typeFilter, ingredientFilter]);

  // render di loading / errore
  if (loading) return <div className="text-center py-5">Caricamento…</div>;
  if (error)   return <div className="alert alert-danger">Errore nel caricamento.</div>;

  return (
    <div className="cocktail-list-page py-5">
      <div className="container">

        {/* ────────── FILTRI ────────── */}
        <div className="filters mb-4 d-flex gap-2">
          <select
            value={typeFilter}
            onChange={e => {
              setTypeFilter(e.target.value);
              setPage(1);              // reset pagina quando si filtra
            }}
            className="form-select w-auto"
          >
            <option value="">Tutti i tipi</option>
            {(types || []).map(t =>
              <option key={t.id} value={t.id}>{t.name}</option>
            )}
          </select>

          <select
            value={ingredientFilter}
            onChange={e => {
              setIngredientFilter(e.target.value);
              setPage(1);
            }}
            className="form-select w-auto"
          >
            <option value="">Tutti gli ingredienti</option>
            {(ingredients || []).map(i =>
              <option key={i.id} value={i.id}>{i.name}</option>
            )}
          </select>
        </div>

        {/* ────────── GRIGLIA DEI RISULTATI ────────── */}
        <div className="row">
          { (cocktails || []).length > 0 ? (
            cocktails.map(c => (
              <div key={c.id} className="col-6 col-md-4 mb-4">
                <div className="cocktail-card border border-light rounded overflow-hidden">
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="cocktail-card-img"
                  />
                  <div className="cocktail-card-overlay">
                    <h5>{c.name}</h5>
                    <p>{c.description}</p>
                    <Link to={`/cocktails/${c.id}`} className="btn btn-outline-light btn-sm">
                      Dettagli
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">Nessun cocktail trovato.</div>
          )}
        </div>

        {/* ────────── PAGINAZIONE ────────── */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                «
              </button>
            </li>

            {Array.from({ length: pagination.last_page }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${page === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${page === pagination.last_page ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(prev => Math.min(prev + 1, pagination.last_page))}
                disabled={page === pagination.last_page}
              >
                »
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default CocktailList;
