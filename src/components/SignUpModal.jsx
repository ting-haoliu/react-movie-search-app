import { useState } from 'react';

import { signUp } from '../services/auth';

const SignUpModal = ({ isOpen, onClose }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   if (!isOpen) return null;

   const handleSignUp = async (e) => {
      e.preventDefault();

      try {
         const data = await signUp(email, password);
         console.log('Sign Up successful:', data);

         onClose();
      } catch (err) {
         setError(err.message);
      }
   };

   return (
      <div
         className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         onClick={onClose}
      >
         <div
            className="bg-black border border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-2xl font-bold text-white mb-6">
               Create Account
            </h2>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
               />

               {error && <p className="text-red-500 text-sm">{error}</p>}

               <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mt-2"
               >
                  Sign Up
               </button>
            </form>

            <button
               onClick={onClose}
               className="w-full px-4 py-2 mt-4 bg-transparent text-gray-400 rounded border border-gray-600 hover:bg-gray-800 transition-colors"
            >
               Cancel
            </button>
         </div>
      </div>
   );
};

export default SignUpModal;
