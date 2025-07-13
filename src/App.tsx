import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CausePage from './pages/CausePage';
import EmergencyPage from './pages/EmergencyPage';

function App() {
  return (
    <div className="min-h-screen bg-light text-dark flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/causes" element={<CausePage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
