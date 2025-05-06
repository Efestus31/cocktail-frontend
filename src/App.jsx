import { BrowserRouter, Route, Routes } from "react-router-dom";
import CocktailList from "./components/cocktailList";
import Home from "./pages/Home";
import CocktailDetail from "./pages/CocktailDetail";
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"



function App() {

  return (
    <BrowserRouter>
      <AppHeader />
      <main className="container-fluid my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<CocktailList />} />
          <Route path="/cocktails/:id" element={<CocktailDetail />} />
        </Routes>
      </main>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;