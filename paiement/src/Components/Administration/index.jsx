import React from 'react'

import { Outlet } from 'react-router-dom';
import SideBarAdmin from './SideBar';
  

const Administration = () => {
  // const logout = () => {
  //   localStorage.removeItem('token_admin')
  //   window.location.reload(true)
  // };
  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
    }} className='relative'>
        {/* < button onClick={logout} title='Se connecter' to='/logout' activeClassName="active" className="absolute w-60 top-4 right-4 flex items-center p-3 font-bold text-white transition-all hover:bg-red-400 bg-red-600 rounded-md justify-evenly">     
          <div  className=' decoration-none'>Deconnexion</div>
        </ button> */}

        <SideBarAdmin >
          <Outlet />
       </SideBarAdmin>

    </div>

  )
}

export default Administration