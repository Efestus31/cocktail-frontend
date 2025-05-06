import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import './CocktailDetail.css'; // CSS per fade-in e stili

// Dettaglio di un singolo cocktail con immagine di background full page e fade-in via CSS
const CocktailDetail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/cocktails/${id}`)
      .then(res => setCocktail(res.data.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-5">Caricamento dettagli…</div>;
  if (error) {
    const msg = error.response?.data?.message || error.message;
    return <div className="alert alert-danger">Errore nel caricamento dei dettagli: {msg}</div>;
  }
  if (!cocktail) return <div className="alert alert-warning">Cocktail non trovato.</div>;

  const { name, image_url, description, ingredients = [], instructions } = cocktail;

  const pageStyle = {
    backgroundImage: `url(${image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: '#fff',
    paddingTop: '100px',
    paddingBottom: '100px'
  };

  return (
    <div style={pageStyle} className="cocktail-detail-page">
      <div className="container-fluid cocktail-detail-overlay fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h2 className="text-center mb-4 display-4">{name}</h2>
            {description && <p className="lead mb-4">{description}</p>}
            <h5 className="mb-3">Ingredienti</h5>
            <ul className="list-unstyled mb-4">
              {ingredients.map((ing, idx) => (
                <li key={idx}>• {ing.quantity ? `${ing.quantity} ` : ''}{ing.name}</li>
              ))}
            </ul>
            <h5 className="mb-3">Istruzioni</h5>
            <p className="mb-4">{instructions}</p>
            <div className="text-center">
              <Link to="/cocktails" className="btn btn-light">
                Torna alla lista
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
