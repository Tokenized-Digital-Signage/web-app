import React from 'react'

import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard'
import MintSignage from '../pages/MintSignage'
import Connect from '../pages/Connect';
import WorldCoin from '../pages/components/WorldCoin';
import UserType from '../pages/UserType';
    
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
          path: '/advertiser', element: <Connect/>
        },

         {
          path: '/owner', element: <Connect/>
        },

        {
          path: '/', element: <UserType />
        }

      ])
    }
    
