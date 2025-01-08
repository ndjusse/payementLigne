import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { FaUserPlus, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import Header from '../Header';



const MoyenPaiements= () => {
  
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

    const getOptionsPaiement = () => {
      axios.get('http://localhost:3001/api/moyen_de_paiement')
        .then(res => setOptionsPaiement(res.data.data))
        .catch(err => console.log(err));
    };
   
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
                
                </li>
            ))}
            </ul>
        </div>



      </div>
    </div>
  )
}

export default MoyenPaiements
