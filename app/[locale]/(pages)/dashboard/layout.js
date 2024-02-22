import React from 'react';
import Main from '../../../../components/Dashboard/Main/Main';

export default function Layout({children}) {
  return (
    <div>
        <Main/>

        {children}
    </div>
  )
}
