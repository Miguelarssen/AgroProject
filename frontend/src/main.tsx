import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './style/index.css'
import { ProdutorList } from './ProdutorList.tsx'
import { ProdutorCreate } from './ProdutorCreate.tsx';
import App from "./App.tsx"


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/Produtores/List",
    element: <ProdutorList />,
  },

  {
    path: "/Produtores/Create",
    element: <ProdutorCreate />,
  },
  {
    path: "/",
    element: <App />,
  }

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
