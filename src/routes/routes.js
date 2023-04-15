import React from 'react'

import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard'
import DashboardLayoutOwner from '../layouts/dashboardOwner'
import MintSignageContent from '../pages/advertiser/MintSignageContent'
import Connect from '../pages/Connect';
import UserType from '../pages/UserType';
import MintSignage from '../pages/owner/MintSignage';
import ConnectOwner from '../pages/ConnectOwner';
    
export default function Router() {
      return useRoutes([
        
        {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/advertiser/mint', element: <MintSignageContent/>
                },

            ]
        },

        {
          element: <DashboardLayoutOwner />,
          children: [
              {
                  path: '/owner/mint', element: <MintSignage/>
              },

          ]
      },


        {
          path: '/advertiser', element: <Connect/>
        },

         {
          path: '/owner', element: <ConnectOwner/>
        },

        {
          path: '/', element: <UserType />
        }

      ])
    }
    
