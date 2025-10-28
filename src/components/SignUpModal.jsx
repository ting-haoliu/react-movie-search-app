// SignUpModal.jsx
const SignUpModal = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Handle sign up form submission
      console.log('Sign Up Form submitted');
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               {/* Simplified Sign Up fields for example */}
               <input
                  type="text"
                  placeholder="Username"
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
               />
               <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
               />
               <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
               />
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
