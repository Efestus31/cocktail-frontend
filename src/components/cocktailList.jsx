import { useEffect, useState } from 'react';
import axios from 'axios';

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cocktails')
      .then(response => setCocktails(response.data))
      .catch(error => console.error('Error fetching cocktails:', error));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Cocktail Selection 🍹</h1>
      <div className="row">
        {cocktails.map(cocktail => (
          <div className="col-md-4 mb-4" key={cocktail.id}>
            <div className="card h-100 shadow">
              <img src="/images/cocktail1.jpg" alt="cocktail1" className="img-fluid rounded" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{cocktail.name}</h5>
                <p className="card-text text-truncate">{cocktail.description}</p>
                <a href={`#/cocktails/${cocktail.id}`} className="btn btn-primary mt-auto">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CocktailList;
