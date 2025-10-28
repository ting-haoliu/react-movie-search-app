import { Link } from 'react-router-dom';
import { useState } from 'react';

import LoginModal from './LoginModal';

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

   return (
      <nav className="w-full h-16 bg-black/80 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
         {/* Logo */}
         <Link to="/" className="text-2xl font-bold text-gradient">
            MovieApp
         </Link>

         {/* Desktop Links */}
         <ul className="hidden sm:flex gap-6">
            <li>
               <Link to="/" className="hover:text-red-400">
                  Home
               </Link>
            </li>
            <li>
               <Link to="/favorites" className="hover:text-red-400">
                  Favorites
               </Link>
            </li>
            <li>
               <button
                  className="hover:text-red-400"
                  onClick={() => setIsLoginModalOpen(true)}
               >
                  Login
               </button>
            </li>
         </ul>

         <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
         >
            {isMenuOpen ? (
               <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <path
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M6 18 17.94 6M18 18 6.06 6"
                  />
               </svg>
            ) : (
               <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <path
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeWidth="2"
                     d="M5 7h14M5 12h14M5 17h14"
                  />
               </svg>
            )}
         </button>

         {/* Mobile Menu Icon */}
         {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-black/90 text-white flex flex-col items-center gap-6 py-6 md:hidden">
               <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-red-400"
               >
                  Home
               </Link>
               <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-red-400"
               >
                  Favorites
               </Link>
               <button
                  onClick={() => {
                     setIsMenuOpen(false);
                     setIsLoginModalOpen(true);
                  }}
                  className="hover:text-red-400"
               >
                  Login
               </button>
            </div>
         )}

         <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
         />
      </nav>
   );
};

export default Navbar;
