import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { FaUserPlus, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import Header from '../Header';
import { NavLink } from 'react-router-dom';

const MoyenPaie = () => {

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
    const uid = localStorage.getItem('token');
    const getDemande = (idClient) => {
      axios.get('http://localhost:3001/api/demandebyidclient/' + idClient)
        .then(res => setDemande(res.data.data))
        .catch(err => console.log(err));
    };
    const getOptionsPaiement = () => {
      axios.get('http://localhost:3001/api/moyen_de_paiement')
        .then(res => setOptionsPaiement(res.data.data))
        .catch(err => console.log(err));
    };
    if (!uid) {
      const loginNavLink = document.getElementById('loginNavLink')
      loginNavLink.click()
    } else {
      setUser(JSON.parse(uid));
      getDemande(JSON.parse(uid).ID_CLIENT);
    }
    getOptionsPaiement();
  }, []);

  const getDemande = () => {
    const uid = localStorage.getItem('token');
    axios.get('http://localhost:3001/api/demandebyidclient/' + JSON.parse(uid).ID_CLIENT)
      .then(res => setDemande(res.data.data))
      .catch(err => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const uid = localStorage.getItem('token');
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
      <Header title="Moyen de paiement" />
      <div  className='container min-h-screen mt-10 overflow-x-hidden overflow-y-auto'>
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
                  <button onClick={() => {document.getElementById(`index${index}`).hidden = !document.getElementById(`index${index}`).hidden}} className='my-1 font-bold text-blue-500'>Plus d'information</button>
                  <div className='flex items-center justify-center w-5 h-5 p-2 border rounded-full'>
                    {index + 1}
                  </div>
                </li>
            ))}
            </ul>
        </div>

        <h3 >Demander l'ajout d'un moyen de paiement</h3>
        <p className='max-w-xl'>Envoyer une demande pour ajouter un moyen de paiement qui sera utilisé dans tout le site. Rassurer vous que le moyen de paiement est sécurisé et fiable.</p>
        
        <div className='grid items-start grid-cols-3 gap-5 mt-10'>
          <form onSubmit={handleSubmit} className='max-w-3xl col-span-1 p-5 bg-white rounded-lg'>
            <div className="my-4 form-group">
              <label htmlFor="LIB_MDP" className='font-semibold'>Nom du moyen de paiement</label> <br />
              <input type="text" name="LIB_MDP" onChange={handleChange} id="" className='w-full max-w-3xl p-2 form-control bg-stone-100' />
            </div>
            <div className="my-4 form-group">
              <label htmlFor="SITE_MDP" className='font-semibold'>Site web</label> <br />
              <input type="url" name="SITE_MDP" onChange={handleChange} id="" className='w-full max-w-3xl p-2 form-control bg-stone-100' />
            </div>
            <div className="my-4 form-group">
              <label htmlFor="MESSAGE" className='font-semibold'>Pourquoi?</label><span className='px-2 text-xs'>Pourquoi voulez vous ajouter ce moyen de paiement en particulier?</span> <br />
              <textarea name='MESSAGE' onChange={handleChange} className='w-full max-w-3xl p-2 form-control bg-stone-100'>
              </textarea>
            </div>
            <button
              className='w-full px-1 py-2 my-3 text-white rounded-md shadow-md bg-sky-600 hover:bg-sky-700'
              type="submit"
            >
              Enregistrer
            </button>
          </form>
          <div className='w-full col-span-2 overflow-x-hidden overflow-y-auto'>
            <h6>Vos requêtes</h6>
            <table className='w-full h-full' >
              <thead>
                <tr className='text-gray-300 bg-gray-900 '>
                  <th className='p-2 border'>N°</th>
                  <th className='p-2 border'>Libellé</th>
                  <th className='p-2 border'>Site web</th>
                  <th className='p-2 border'>Message</th>
                  <th className='p-2 border'> </th>
                </tr>
              </thead>
              {
                optionsPaiement && (
                  <tbody>
                    {demande.map((item, index) => (
                      <tr key={index} className='bg-white'>
                        <td className='p-2 border'>TRF{index + 1}</td>
                        <td className='p-2 border'>{item.LIB_MDP}</td>
                        <td className='p-2 border'>{item.SITE_MDP}</td>
                        <td className='p-2 border'>{item.MESSAGE}</td>

                        <td className='flex gap-1 p-2 border'>
                          <button className='flex items-center gap-2 p-2 text-xs text-white bg-red-600 border rounded-md shadow-xl hover:bg-red-700 '> Supprimer</button>
                          <button className='flex items-center gap-2 p-2 text-xs text-white bg-blue-600 border rounded-md shadow-xl hover:bg-blue-700 '> Modifier </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
            </table>
          </div>
        </div>


      </div>
      <NavLink to='/login' id="loginNavLink" className={'hidden'}>
        <span className='font-bold text-blue-500'>Dashboard</span>
      </ NavLink>
    </div>
    
  )
}

export default MoyenPaie
