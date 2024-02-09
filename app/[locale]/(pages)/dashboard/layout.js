import React from 'react';
import Aside from '../../../../components/Dashboard/Aside/Aside';
import Navbar from '../../../../components/Dashboard/Navbar/Navbar';

export default function Layout({children}) {
  return (
    <div>
        <div>
            <h1><Aside/></h1>
        </div>
        <div>
            <Navbar/>
            {children}
        </div>  
    </div>
  )
}
