import { useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { getCurrentUser } from '../services/auth';

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const token = localStorage.getItem('token');

            if (token) {
               const currentUser = await getCurrentUser();
               setUser(currentUser);
            } else {
               setUser(null);
            }
         } catch (error) {
            console.error('Error fetching current user:', error);
            setUser(null);
            localStorage.removeItem('token');
         } finally {
            setLoading(false);
         }
      };

      fetchUser();
   }, []);

   const login = (userData) => {
      setUser(userData);
   };

   const logout = () => {
      localStorage.removeItem('token');
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
