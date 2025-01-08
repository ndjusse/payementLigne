
import { Navigate, useRoutes } from "react-router-dom";
import Paiement from "./Components/Paiement";
import MoyenPaie from "./Components/MoyenPaie";
import Client from "./Components/Client";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Edit from "./Components/Client/Edit";


import Dashboard from "./Components/Dashboard";
import Administration from "./Components/Administration";


import Paiements from "./Components/Administration/Paiements";
import MoyenPaiements from "./Components/Administration/MoyenPaiements";
import Clients from "./Components/Administration/Clients";
import AdminLogin from "./Components/AdminLogin";
import Depot from "./Components/Depot";
import Inbox from "./Components/Administration/Inbox";








export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/dashboard/paiement" />, index: true },
        { path: 'paiement', element: <Paiement /> },
        { path: 'moyen_paiement', element: <MoyenPaie /> },
        { path: 'contacts', element: <Client /> },
        { path: 'Edit', element: < Edit /> },
        { path: 'depot', element: < Depot /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/admin',
      element: <Administration/> ,
      children: [
       
        { element: <Navigate to="/admin/clients" />, index: true },
        { path: 'paiements', element: <Paiements /> },
        { path: 'moyenPaiements', element: <MoyenPaiements /> },
        { path: 'clients', element: <Clients /> },
        { path: 'requetes', element: <Inbox /> },
        
       
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/auth',
      element: <AdminLogin/>,
    },
    {
      
        path: '',
        element: <Login />,
      },
    {
        path: 'register',
        element: <Register />,
      },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
