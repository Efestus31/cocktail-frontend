import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import "../pages/CocktailList.css";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/cocktails')
      .then(res => setCocktails(res.data.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Caricamento…</div>;
  if (error) return <div className="alert alert-danger">Errore nel caricamento.</div>;

  return (
    <div className="container my-4">
      <div className="row">
        {cocktails.map(c => (
          <div key={c.id} className="col-6 col-md-4 mb-4">
            <div className="cocktail-card">
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
        ))}
      </div>
    </div>
  );
};

export default CocktailList;
