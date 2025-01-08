import React from 'react'
import SideBar from '../SideBar'
import { Outlet } from 'react-router-dom';
  

const Dashboard = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
    }}>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>

  )
}

export default Dashboard