const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
   },
};

export async function fetchMovies(query = '') {
   const endpoint = query
      ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await fetch(endpoint, API_OPTIONS);
   if (!response.ok) {
      throw new Error('Network response was not ok');
   }

   return response.json();
}

export async function fetchTrendingMovies() {
   const endpoint = `${API_URL}/trending/movie/week`;

   const response = await fetch(endpoint, API_OPTIONS);
   if (!response.ok) {
      throw new Error('Network response was not ok');
   }

   return response.json();
}

export async function fetchMovieById(id) {
   const endpoint = `${API_URL}/movie/${id}`;

   const response = await fetch(endpoint, API_OPTIONS);
   if (!response.ok) {
      if (response.status === 404) {
         throw new Error('Movie not found');
      }
      throw new Error('Failed to fetch movie');
   }

   return response.json();
}
