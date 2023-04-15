import React from 'react'

import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard'
import DashboardLayoutOwner from '../layouts/dashboardOwner'
import Connect from '../pages/Connect';
import UserType from '../pages/UserType';
import MintSignage from '../pages/owner/MintSignage';
import ConnectOwner from '../pages/ConnectOwner';
import LinkSignage from '../pages/advertiser/LinkSignage';
import MintSignangeMain from '../pages/advertiser/MintSignangeMain';
    
export default function Router() {
      return useRoutes([
        
        {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/advertiser/mint', element: <MintSignangeMain />
                },
                {
                  path: '/advertiser/link', element: <LinkSignage/>
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
    
