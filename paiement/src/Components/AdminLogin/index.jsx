import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import { NavLink } from 'react-router-dom'



const AdminLogin = () => {
  const [params, setParams] = useState({
    password: "",
    email: '',
  });
  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  // useEffect(() => {
  //   const uid = localStorage.getItem('token_admin');
  //   if(uid){
  //     const loginNavLink = document.getElementById('loginNavLink')
  //     loginNavLink.click()
  //   }
  // }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      password: params.password,
      email: params.email,
    };
    axios
      .post('http://localhost:3001/loginAdmin', user)
      .then((res) => {
        console.log(res);
        setParams({
          password: '',
          email: '',
        });
        localStorage.setItem('token_admin', JSON.stringify(res.data))
        const loginNavLink = document.getElementById('loginNavLink')
        loginNavLink.click()
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className='relative grid grid-cols-1  overflow-hidden min-h-screen w-full'>
             
      <div className='bg-stone-100 flex flex-col col-span-2 justify-center'>
      <NavLink to='/login' >
                  <button className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-2">
        Client
      </button>
          </ NavLink>
    
        <form onSubmit={handleSubmit} className='max-w-[500px] shadow-md w-full mx-auto bg-gray-900 p-10 px-10 rounded-lg '>
          <h2 className='text-4xl text-white font-bold text-center'>Administration</h2>
          <div className='flex flex-col text-gray-400 py-2' >
            <label>Email</label>
            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none '
              type="email"
              name='email'
              id="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex  flex-col text-gray-400 py-2'>
            <label >Mot de passe</label>
            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none '
              type="password"
              name='password'
              id="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='w-full my-3 px-1 py-2 text-white rounded-md shadow-md bg-sky-600' >Se connecter</button>
          <NavLink to='/admin' id="loginNavLink" className={'hidden'}>
            <span className='font-bold text-blue-500'>Dashboard</span>
          </ NavLink>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin