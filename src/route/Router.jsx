import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from '../page/Home';
import Add from '../page/Add';
import Edit from '../page/Edit';


export default function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
        },
        {
            path:'/Add',
            element: <Add/>
        },
        {
            path:'/Edit/:id',
            element: <Edit/>
        }
      ]);
  return (
    <RouterProvider router={router} />
  )
}
