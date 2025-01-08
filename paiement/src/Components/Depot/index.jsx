import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { FaUserPlus, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import Header from '../Header';
import { NavLink } from 'react-router-dom';

const Depot = () => {

    const [depots, setDepots] = useState([]);
    const [optionsPaiement, setOptionsPaiement] = useState([]);
    const [user, setUser] = useState({
        DATE_EXP: 0,
        EMAIL: '0',
        ID_CLIENT: '0',
        NOM: '0',
        NUM_TEL: '2',
        PASSWORD: Date.now(),
        PAYS: '0',
        MONTANT: 0,
        created: 'en cour'
    });

    useEffect(() => {
        const getDepots = (id) => {
            axios.get(`http://localhost:3001/api/paiement/tel/${id}`)
                .then(res => setDepots(res.data.data))
                .catch(err => console.log(err));
        };
        const getOptionsPaiement = () => {
            axios.get('http://localhost:3001/api/moyen_de_paiement')
                .then(res => setOptionsPaiement(res.data.data))
                .catch(err => console.log(err));
        };
        const uid = localStorage.getItem('token');
        if (!uid) {
            const loginNavLink = document.getElementById('loginNavLink')
            loginNavLink.click()
        } else {
            setUser(JSON.parse(uid));
            getDepots(JSON.parse(uid).NUM_TEL);
        }
        getOptionsPaiement();
    }, []);

    const getDepots = () => {
        axios.get(`http://localhost:3001/api/paiement/tel/${user.ID_CLIENT}`, params)
            .then(res => setDepots(res.data.data))
            .catch(err => console.log(err));
    };
    const [popup, setPopup] = useState(false);

    const ouvrirFormulaire = () => {
        setPopup(true)
    }

    const fermerFormulaire = () => {
        setPopup(false)
    }

    const [nouvelElement, setNouvelElement] = useState({
        numeroPayant: '',
        numeroReceveur: '',
        montant: '',
        moyen: ''
    });

    const [params, setParams] = useState({
        ID_CLIENT: 0,
        ID_MOYEN_DE_PAIEMENT: '0',
        NUM_PAYANT: '0',
        NUM_RECE: '0',
        NUM_TRANS: '2',
        DATE_PAIEMENT: Date.now(),
        MONTANT: '0',
        ETAT: 'en cour'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNouvelElement((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const uid = localStorage.getItem('token');
        if (uid) {
            const user = JSON.parse(uid);
            const data = {
                ID_CLIENT: user.ID_CLIENT,
                ID_MOYEN_DE_PAIEMENT: parseInt(params.ID_MOYEN_DE_PAIEMENT),
                DATE_DEPOT: Date.now(),
                MONTANT: parseInt(params.MONTANT),
            }
            axios.post('http://localhost:3001/api/depot', data)
                .then(res => { getDepots(); setPopup(false) })
                .catch(err => console.log(err));

        }
    };


    return (

        <div >
            <Header title="Depots" />

            <div style={{ border: 'none', marginTop: '3%' }} className='p-5'>
                <h4>Gérez votre nom, vos adresses e-mail et votre numéro de téléphone portable.</h4>
                <h5 className='text-slate-400'>Vous trouverez ci-dessous le nom et les adresses e-mail enregistrés pour votre compte.  </h5>
                <hr />
                <div>
                    <ul className='max-w-xl'>
                        <li className='flex justify-between my-3 border-b'><span className='font-bold '> Nom et prenom d'utilisateur </span>{user.NOM} {user.PRENOM}</li>
                        <li className='flex justify-between my-3 border-b'><span className='font-bold '> Adresse email </span>{user.EMAIL}</li>
                        <li className='flex justify-between my-3 border-b'><span className='font-bold '> Numèro de téléphone </span>{user.NUM_TEL}</li>
                        <li className='flex justify-between my-3 border-b'><span className='font-bold '> Date de naissance </span>{user.DATE_EXP}</li>
                        <li className='flex justify-between '><span className='font-bold '> Pays de résidence </span>{user.PAYS}</li>

                    </ul>

                    <button className='p-2 italic bg-white border rounded-md shadow-md ' style={{ marginLeft: '2%', fontSize: '100%' }} >  Modifier ces informations </button>

                </div>
                {
                    popup && (
                        <div className='p-4 border fpopup' >
                            <form onSubmit={handleSubmit}>
                                <h2 className='text-2xl text-center text-gray-600'>Effecuter un dépot</h2>

                                {/* <label htmlFor="ID_CLIENT">Clients:</label>
            <select name="ID_CLIENT" id="ID_CLIENT"   onChange={handleChange} >
            {clients.map((item, index)  => (
              <option value={item.ID_CLIENT} key={index}>{item.NOM}</option>
            ))}
              </select><br /><br /> */}

                                {/* <label htmlFor="ID_CLIENT">Numéro payant:</label>
            <select name="ID_CLIENT" id="ID_CLIENT"   onChange={handleChange} >
            {clients.map((item, index)  => (
              <option value={item.ID_CLIENT} key={index}>{item.NUM_TEL}</option>
            ))}
              </select><br /><br />       */}
                                {/* <div className="my-4 form-group">
                                    <label htmlFor="NUM_RECE"> Contact du receveur:</label>
                                    <select
                                        className="form-control"
                                        id="NUM_RECE"
                                        name="NUM_RECE"
                                        onChange={handleChange}
                                        required
                                    >
                                        <option >
                                            Selectionner un contact
                                        </option>
                                        <input type="text" />
                                        {contact.map((option) => (
                                            <option key={option.ID_CLIENT} value={option.NUM_TEL}>
                                                {option.NUM_TEL} ({option.NOM})
                                            </option>
                                        ))}
                                    </select>
                                </div> */}
                                <div className="my-4 form-group">
                                    <label htmlFor="">Montant:</label><br />
                                    <input style={{ display: 'flex', }}
                                        type="number"
                                        className="form-control"
                                        name="MONTANT"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* 
              <label>Moyen de paiement:</label>
              <input style={{display:'flex', marginLeft:'12%'}}
                type="text"
                name="ID_MOYEN_DE_PAIEMENTNI"
                onChange={handleChange}
                 required
              />    <br /><br /> */}

                                {/* <label htmlFor="ID_CLIENT">Moyen de paiement:</label>
              <select name="ID_CLIENT" id="ID_CLIENT"   onChange={handleChange} >
               {clients.map((item, index)  => (
                <option value={item.ID_CLIENT} key={index}>{item.moyenPaiement}</option>
               ))}
              </select><br /><br />         */}



                                <div className='grid justify-between grid-cols-2 gap-6'>
                                    <button type='submit' className='w-full px-1 py-2 text-sm text-white rounded-md shadow-md bg-sky-600 hover:bg-sky-500' >Enregistrer</button>
                                    <button type='button' className='w-full px-1 py-2 text-sm text-white bg-red-600 rounded-md shadow-md hover:bg-red-500' onClick={fermerFormulaire} >Annuler</button>
                                </div>
                            </form>

                        </div>
                    )
                }
              

            </div>
            <NavLink to='/login' id="loginNavLink" className={'hidden'}>
                <span className='font-bold text-blue-500'>Dashboard</span>
            </ NavLink>
        </div>
    );
};

export default Depot;