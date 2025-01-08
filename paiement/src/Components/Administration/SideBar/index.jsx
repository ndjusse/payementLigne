import React, { useState } from 'react'
import {  FaBars,FaSignOutAlt} from 'react-icons/fa'
//import { NavLink } from 'react-router-dom'
import { MenuItem } from './MenuItem'
//import styled from 'styled-components'
import { NavLink,Link } from 'react-router-dom'



const SideBarAdmin = ({children}) => {
  const [isOpen , setIsOpen] = useState(false);
  const toggle = ()=> setIsOpen (!isOpen);


  
 
  return (
    <div style={{display:'flex' }}>
      <aside>
        <div className={`min-h-screen transition-all bg-gray-900 ${isOpen ? 'w-64' : 'w-14'}`}>
          <h2 className='py-3 text-lg text-center text-white transition-all bg-gray-950/50'>
            <span style={{ display: isOpen ? 'block' : 'none' }}>Tableau de bord</span>
          </h2>

         
          <div style={{display:'flex', textAlign:'center', padding:'20px 15px'}}>
            <div style={{display:isOpen ? 'block': 'none',fontSize:'30px', color:'white'}}>Menu</div>
            <div style={{ transition:'all 0.5s', color:'white', fontSize:'25px', display:'flex', marginLeft:isOpen ? '50px': '0px', marginTop:'10%'}}>
              {<FaBars onClick={toggle}/>}
            </div>
          </div>
          
          <> 
          <div >
            {
              MenuItem.map((item, index)=>(
                < NavLink to={item.path} key={index}  activeClassName="active"  className="flex no-underline my-3 items-center w-full px-1 py-3 font-bold text-white transition-all hover:bg-gray-700 rounded-md justify-between text-left"
                  style={{color:'black', display:'flex', padding:'10px 15px', gap:'15px', transition:'all 0.5s'}}>
                  <div className='bg-white text-gray-800 p-2 rounded-full'>{item.icon}</div>
                  <div style={{ display:isOpen ? 'block': 'none'}}>{item.name}</div>
                </ NavLink>
              ) )
            }
          
            
          

            
          </div>
          </>
          <div>
          < Link  title='Se connecter' to={'/auth'} activeClassName="active" className="flex items-center w-full p-3 font-bold text-white transition-all hover:bg-red-400 bg-red-600 rounded-md justify-evenly">
                <div>< FaSignOutAlt /></div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className=' decoration-none'>Deconnexion</div>
              </ Link>
          </div>
        </div>
      </aside>



      <main className={`min-h-screen overflow-hidden w-full m-0 bg-stone-100`}>{children}</main>
    </div>
  );
}

export default SideBarAdmin
