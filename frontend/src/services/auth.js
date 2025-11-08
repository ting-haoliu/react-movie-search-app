import { supabase } from '../lib/supabaseClient';

export const signUp = async (email, password) => {
   const { data, error } = await supabase.auth.signUp({
      email,
      password,
   });

   if (error) {
      if (import.meta.env.DEV) {
         console.error('Sign Up Error:', error);
      }
      throw new Error(error.message);
   }

   return data;
};

export const signIn = async (email, password) => {
   const {
      data: { user, session },
      error,
   } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      if (import.meta.env.DEV) {
         console.error('Sign In Error:', error);
      }
      throw new Error(error.message);
   }

   return { user, session };
};

export const signInWithGoogle = async () => {
   const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
   });

   if (error) {
      if (import.meta.env.DEV) {
         console.error('Sign In with Google Error:', error);
      }
      throw new Error(error.message);
   }
};

export const signOut = async () => {
   const { error } = await supabase.auth.signOut();

   if (error) {
      if (import.meta.env.DEV) {
         console.error('Sign Out Error:', error);
      }
      throw new Error(error.message);
   }
};

export const getCurrentUser = async () => {
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser();

   if (error) {
      if (import.meta.env.DEV) {
         console.error('Get Current User Error:', error);
      }
      throw new Error(error.message);
   }

   return user;
};
