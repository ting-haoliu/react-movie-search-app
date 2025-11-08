const Footer = () => {
   return (
      <footer className="flex flex-col justify-between items-center bg-dark-100 text-light-200 p-8 sm:flex-row">
         <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Adam Liu. All rights reserved.
         </p>
         <nav className="flex flex-col mt-4 gap-2 sm:flex-row sm:mt-0 sm:gap-4">
            <a
               className="text-center text-sm"
               href="https://github.com/ting-haoliu/react-movie_searching"
               target="_blank"
            >
               GitHub
            </a>
            <a
               className="text-center text-sm"
               href="https://www.linkedin.com/in/tinghao-liu/"
               target="_blank"
            >
               LinkedIn
            </a>
         </nav>
      </footer>
   );
};

export default Footer;
