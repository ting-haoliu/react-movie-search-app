import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
         const { data } = await supabase.auth.getUser();
         setUser(data.user);
      };

      fetchUser();

      const { data: authListener } = supabase.auth.onAuthStateChange(
         (event, session) => {
            if (event === 'SIGNED_IN') {
               setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
               setUser(null);
            }
         }
      );

      return () => {
         authListener.subscription.unsubscribe();
      };
   }, []);

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};
