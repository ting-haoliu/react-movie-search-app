import { Client, TablesDB, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const tableDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
   // 1. Use Appwrite SDK to check if the search term exists in the database
   try {
      const result = await tableDB.listRows({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         queries: [Query.equal('searchTerm', searchTerm)],
      });

      // 2. If it exists, update the count by 1
      if (result.rows.length > 0) {
         const row = result.rows[0]; // First Data

         await tableDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: row.$id,
            data: {
               count: row.count + 1,
            },
         });
      } else {
         // 3. If it doesn't, create a new row with the search term and count as 1
         await tableDB.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: ID.unique(),
            data: {
               searchTerm,
               count: 1,
               movie_id: movie.id,
               poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            },
         });
      }
   } catch (error) {
      console.error(error);
   }
};

export const getTrendingMovies = async () => {
   try {
      const result = await tableDB.listRows({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         queries: [Query.orderDesc('count'), Query.limit(5)],
      });

      return result.rows;
   } catch (error) {
      console.error(error);
   }
};
