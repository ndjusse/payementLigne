import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

import axios from 'axios'
import Header from '../Header';


const Inbox = () => {

  const [demande, setDemande] = useState([]);
  const [optionsPaiement, setOptionsPaiement] = useState([]);
  const [user, setUser] = useState({
    DATE_EXP: 0,
    EMAIL: '0',
    ID_CLIENT: '0',
    NOM: '0',
    NUM_TEL: '2',
    PASSWORD: '',
    PAYS: '0',
    created: 'en cour'
  });

  const [params, setParams] = useState({
    ID_CLIENT: 0,
    MESSAGE: '',
    SITE_MDP: '',
    LIB_MDP: '',
    ETAT: 0
  });

  useEffect(() => {
    const uid = localStorage.getItem('token_admin');
    const getDemande = () => {
      axios.get('http://localhost:3001/api/demande/')
        .then(res => setDemande(res.data.data))
        .catch(err => console.log(err));
    };
    if (!uid) {
      const loginNavLink = document.getElementById('loginNavLink')
      loginNavLink.click()
    } else {
      setUser(JSON.parse(uid));
    }
    getDemande();
  }, []);

  const getDemande = () => {
    const uid = localStorage.getItem('token_admin');
    axios.get('http://localhost:3001/api/demandebyidclient/' + JSON.parse(uid).ID_CLIENT)
      .then(res => setDemande(res.data.data))
      .catch(err => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const uid = localStorage.getItem('token_admin');
    if (uid) {
      const user = JSON.parse(uid);
      const data = {
        ID_CLIENT: user.ID_CLIENT,
        MESSAGE: params.MESSAGE,
        SITE_MDP: params.SITE_MDP,
        LIB_MDP: params.LIB_MDP,
        ETAT: 0
      }
      axios.post('http://localhost:3001/api/demande', data)
        .then(res => { getDemande(); })
        .catch(err => console.log(err));
    }
  };
  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  return (
    <div >
      <Header title="Requêtes" />
      <div className='container min-h-screen mt-10 overflow-x-hidden overflow-y-auto'>
        <div className='my-5' >

          <ul>
            {optionsPaiement.map((item, index) => (
              <li className='p-3 my-2 bg-white shadow-md' key={index}>
                <div>
                  <img width={35} src={item.IMG}></img>{item.LABEL} ({item.REF})
                </div>
                <div className='p-4 ' hidden id={`index${index}`} >
                  {item.DESCRIPTION}
                  <br />
                  <a href={item.SITE} className=''>Site web</a>
                </div>
                <button onClick={() => { document.getElementById(`index${index}`).hidden = !document.getElementById(`index${index}`).hidden }} className='my-1 font-bold text-blue-500'>Plus d'information</button>
                <div className='flex items-center justify-center w-5 h-5 p-2 border rounded-full'>
                  {index + 1}
                </div>
              </li>
            ))}
          </ul>
        </div>


        <div className='gap-5 m-auto mt-10 max-w-7xl '>
          <div className='w-full col-span-2 overflow-x-hidden overflow-y-auto'>
            <h3>Liste de requêtes</h3>
            {
              optionsPaiement && (
                <ul>
                  {demande.map((item, index) => (
                    <li key={index} className='p-4 my-4 bg-white border rounded-md shadow-md'>
                      <h6 className='text-lg'>Req-{index + 1}</h6>
                      <h5>{item.LIB_MDP}</h5>
                     
                      <h6>Description:</h6>
                      <p className='p-2 bg-stone-100'>
                        
                        {item.MESSAGE}
                        <br />

                        </p>
                      <div className='flex gap-1 '>
                        <button className='flex items-center gap-2 p-2 text-xs text-white bg-green-600 border rounded-md shadow-xl hover:bg-blue-700 '> Accepter </button>
                        <button className='flex items-center gap-2 p-2 text-xs text-white bg-red-600 border rounded-md shadow-xl hover:bg-red-700 '> Supprimer</button>
                        <a href={item.SITE_MDP} className='no-underline '><span  className='flex items-center gap-2 p-2 text-xs text-white bg-yellow-600 border rounded-md shadow-xl hover:bg-yellow-700 '>Visiter le site web</span></a>
                      </div>

                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>


      </div>
    </div>
  )
}

export default Inbox;
