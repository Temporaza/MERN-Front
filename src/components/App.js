import Archive from "../pages/Archive";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import '../CSS/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="NavList">
        <ul>
          <li className="Pages ">
            <Link to="/" element={<NotesPage />}>Books</Link>
          </li>
          <li className="Pages">
            <Link to="/archive" element={<Archive />}>Archive</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route index element = {<NotesPage />}  />
        <Route path='/archive' element={<Archive />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;