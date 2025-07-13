import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold ml-3 text-primary">
              Sahayam
            </h1>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <a href="/causes" className="text-gray-600 hover:text-primary transition-colors">Causes</a>
            <a href="/emergency" className="text-gray-600 hover:text-primary transition-colors">Emergency</a>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <Link to="/login">
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-accent transition-colors">
                Login
              </button>
            </Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>Home</NavLink>
              <a href="/causes" className="text-gray-600 hover:text-primary" onClick={closeMobileMenu}>Causes</a>
              <a href="/emergency" className="text-gray-600 hover:text-primary" onClick={closeMobileMenu}>Emergency</a>
              <NavLink to="/about" className={navLinkClass} onClick={closeMobileMenu}>About</NavLink>
              <Link to="/login" onClick={closeMobileMenu}>
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-accent transition-colors w-full">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
