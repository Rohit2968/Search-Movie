import './css/App.css';
import Home from "./pages/Home"
// import MovieCard from './components/MovieCard';
import { Routes, Route } from "react-router-dom";
import Favourites from './pages/Favourites';
import Navbar from "./components/Navbar";
import {MovieProvider} from "./contexts/MovieContext";

function App() {
  // const movieNum = 1;

  return (
    <>
      <div>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favourites' element={<Favourites />} />
          </Routes>
        </main>
      </div>


      {/* Conditional Rendering
      {movieNum === 1 ? (
        <MovieCard movie={{ title: "Tim's Film", release_date: "2024" }} />
      ) : (
        <MovieCard movie={{ title: "Fitoor", release_date: "2021" }} />
      )} */}

    </>
  );
}


export default App
