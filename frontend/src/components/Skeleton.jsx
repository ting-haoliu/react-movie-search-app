const Skeleton = ({ variant, count }) => {
   return (
      <>
         {Array.from({ length: count }).map((_, i) =>
            variant === 'carousel' ? (
               <li
                  key={i}
                  className="min-w-[230px] flex flex-row items-center animate-pulse"
               >
                  {/* Fake Index */}
                  <div
                     className="w-6 h-6 bg-gray-300 rounded mr-2"
                     aria-hidden="true"
                  />
                  {/* Fake Image */}
                  <div
                     className="w-[127px] h-[163px] bg-gray-300 rounded-lg"
                     aria-hidden="true"
                  />
               </li>
            ) : (
               <li
                  key={i}
                  className="rounded-lg overflow-hidden shadow bg-gray-200 animate-pulse"
               >
                  {/* Fake Picture */}
                  <div className="w-full h-60 bg-gray-300" aria-hidden="true" />

                  <div className="p-3 space-y-2">
                     <div className="h-4 bg-gray-300 rounded" />
                     <div className="h-3 bg-gray-300 rounded w-1/2" />
                  </div>
               </li>
            )
         )}
      </>
   );
};

export default Skeleton;
