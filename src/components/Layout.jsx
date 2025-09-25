import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
   return (
      <>
         <Navbar />
         <main className="mt-12">
            <Outlet />
         </main>

         <Footer />
      </>
   );
};

export default Layout;
