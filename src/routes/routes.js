import React from 'react'

import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard'
import MintSignage from '../pages/MintSignage'
import Connect from '../pages/Connect';
    
export default function Router() {
      return useRoutes([
        
        {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/mint', element: <MintSignage/>
                },

            ]
        },

        {
          path: '/', element: <Connect/>
        }

      ])
    }
    
