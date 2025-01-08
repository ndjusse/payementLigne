import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import myImage from '../../assets/my-image.jpg';
import { NavLink } from 'react-router-dom'




const Login = () => {
  const [params, setParams] = useState({
    password: "",
    tel: 0,
  });
  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };



  // Utilisation du hook useEffect pour effectuer une action après le rendu initial du composant
  useEffect(() => {
    // Récupération de la valeur 'token' à partir du stockage local (localStorage)
    const uid = localStorage.getItem('token');
    // Vérification si la valeur 'token' existe
    if (uid) {
      // Récupération de la référence de l'élément avec l'ID 'loginNavLink'
      const loginNavLink = document.getElementById('loginNavLink')
      // Déclenchement d'un clic programmé sur l'élément 'loginNavLink'
      loginNavLink.click()
    }
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      password: params.password,
      tel: parseInt(params.tel),
    };
    axios
      .post('http://localhost:3001/login', user)
      .then((res) => {
        console.log(res);
        setParams({
          password: '',
          tel: 0,
        });

        localStorage.setItem('token', JSON.stringify(res.data))
        const loginNavLink = document.getElementById('loginNavLink');
        loginNavLink.click();
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className=' grid grid-cols-1 sm:grid-cols-3 overflow-hidden min-h-screen w-full'>
      <div className='hidden sm:block col-span-1 bg-black'>
        <img className='w-full h-full object-cover opacity-30' src={myImage} alt="Description de limage" />;
      </div>

      <NavLink to='/auth' className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-2" >
        <span>
          Administration
        </span>
      </ NavLink>

      <div className='bg-stone-100 flex flex-col col-span-2 justify-center'>
        <form onSubmit={handleSubmit} className='max-w-[500px] shadow-md w-full mx-auto bg-gray-900 p-10 px-10 rounded-lg ' >
          <h2 className='text-4xl text-white font-bold text-center'>sign in </h2>
          <div className='flex flex-col text-gray-400 py-2' >
            <label  >TEL</label>
            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none '
              type="number"
              name='tel'
              id="tel"
              onChange={handleChange}

              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
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
        
          <NavLink to='/register'>
            <span className='font-bold text-blue-500'>S'inscrire</span>
          </ NavLink>
          <NavLink to='/dashboard' id="loginNavLink" className={'hidden'}>
            <span className='font-bold text-blue-500'>Dashboard</span>
          </ NavLink>
        </form>
      </div>
    </div>
  )
}

export default Login