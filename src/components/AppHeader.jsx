import { Link } from 'react-router-dom';

const AppHeader = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">CocktailApp</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cocktails">Cocktails</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default AppHeader;