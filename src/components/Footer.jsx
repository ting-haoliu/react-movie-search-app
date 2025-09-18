const Footer = () => {
   return (
      <footer className="flex justify-between p-4">
         <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Adam Liu. All rights reserved.
         </p>
         <nav className="flex space-x-4">
            <a
               className="text-center text-sm text-gray-500"
               href="https://github.com/ting-haoliu/react-movie_searching"
               target="_blank"
            >
               GitHub
            </a>
            <a
               className="text-center text-sm text-gray-500"
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
