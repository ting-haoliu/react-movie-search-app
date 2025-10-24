export const LoginModal = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         <div className="bg-black p-6 rounded shadow-lg flex flex-col gap-6">
            <h2>Sign In</h2>
            <button className="px-4 py-2 bg-white text-black rounded flex items-center justify-center gap-2">
               <img
                  src="./Google.svg"
                  alt="Google logo"
                  className="h-6 w-auto"
               />
               Sign in with Google
            </button>
            <button
               onClick={onClose}
               className="px-4 py-2 bg-red-500 text-white rounded"
            >
               Cancel
            </button>
         </div>
      </div>
   );
};
