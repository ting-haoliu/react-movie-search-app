import { Link } from 'react-router-dom';

const MobileMenu = ({
   user,
   setIsMenuOpen,
   setIsLoginModalOpen,
   handleSignOut,
}) => {
   return (
      <div className="absolute top-16 left-0 w-full bg-black/90 text-white flex flex-col items-center gap-6 py-6 sm:hidden">
         <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-red-400"
         >
            Home
         </Link>

         {user && (
            <Link
               to="/favorites"
               onClick={() => setIsMenuOpen(false)}
               className="hover:text-red-400"
            >
               Favorites
            </Link>
         )}

         {!user ? (
            <button
               onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginModalOpen(true);
               }}
               className="hover:text-red-400"
            >
               Sign In
            </button>
         ) : (
            <button
               onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
               }}
               className="hover:text-red-400"
            >
               Sign Out
            </button>
         )}

         {user && (
            <>
               <div className="border-t border-gray-700 w-full" />

               <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
               </span>
            </>
         )}
      </div>
   );
};

export default MobileMenu;
