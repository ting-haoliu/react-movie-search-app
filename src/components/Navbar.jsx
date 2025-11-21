import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from '../services/auth';
import { useAuth } from '../context/useAuth';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import CloseIcon from './icons/CloseIcon';
import MenuIcon from './icons/MenuIcon';
import MobileMenu from './MobileMenu';

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
   const { user } = useAuth();
   const navigate = useNavigate();

   const handleSignOut = async () => {
      await signOut();

      // redirect to home page after sign out
      navigate('/');
   };

   return (
      <nav className="w-full h-20 bg-black/80 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
         {/* Logo */}
         <Link to="/" className="text-2xl font-bold text-gradient">
            MovieApp
         </Link>

         {/* Desktop Links */}
         <ul className="hidden sm:flex items-center gap-6">
            <li>
               <Link to="/" className="hover:text-red-400">
                  Home
               </Link>
            </li>

            {user && (
               <li>
                  <Link to="/favorites" className="hover:text-red-400">
                     Favorites
                  </Link>
               </li>
            )}

            <li>
               {!user ? (
                  <button
                     className="hover:text-red-400"
                     onClick={() => setIsLoginModalOpen(true)}
                  >
                     Sign In
                  </button>
               ) : (
                  <div className="flex items-center gap-2">
                     <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.email?.charAt(0).toUpperCase()}
                     </span>
                     <button
                        className="hover:text-red-400"
                        onClick={handleSignOut}
                     >
                        Sign Out
                     </button>
                  </div>
               )}
            </li>
         </ul>

         <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
         >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
         </button>

         {/* Mobile Menu Icon */}
         {isMenuOpen && (
            <MobileMenu
               user={user}
               setIsMenuOpen={setIsMenuOpen}
               setIsLoginModalOpen={setIsLoginModalOpen}
               handleSignOut={handleSignOut}
            />
         )}

         <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSwitchToSignup={() => {
               setIsLoginModalOpen(false);
               setIsSignupModalOpen(true);
            }}
         />

         <SignUpModal
            isOpen={isSignupModalOpen}
            onClose={() => setIsSignupModalOpen(false)}
         />
      </nav>
   );
};

export default Navbar;
