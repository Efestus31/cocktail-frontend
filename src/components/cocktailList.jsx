import { useCocktails } from '../hooks/useCocktails';
import { Link } from 'react-router-dom';

const CocktailList = () => {
  const { cocktails, loading, error } = useCocktails();

  if (loading) return <div className="text-center py-5">Caricamento…</div>;
  if (error)   return <div className="alert alert-danger">Errore nel caricamento.</div>;

  return (
    <div className="row">
      {cocktails.map(c => (
        <div key={c.id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={c.imageUrl} className="card-img-top" alt={c.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{c.name}</h5>
              <p className="card-text flex-grow-1">{c.description}</p>
              <Link to={`/cocktails/${c.id}`} className="btn btn-outline-primary mt-2">
                Dettagli
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CocktailList;
