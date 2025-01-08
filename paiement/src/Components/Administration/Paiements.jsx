import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { FaUserPlus, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import Header from '../Header';
import { NavLink } from 'react-router-dom';

const Paiements = () => {

  //les donnes du tableau
  const [data, setData] = useState([{
    numeroPayant: '123456',
    numeroReceveur: '987654',
    numeroTransaction: 'ABC123',
    montant: 100, etat: 'En cours',
    date: '2023-05-24',
    moyen: 'Carte de crédit'

  }]);

  const [clients, setClients] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const optionsPaiement = [{ id: 1, name: 'MOMO' }, { id: 2, name: 'OM' }, { id: 3, name: 'Autre' }];
  const [telephone, setTelephone] = useState([]);
  const [contact, setContact] = useState(null);
  useEffect(() => {
    
    const getPaiment = () => {
      axios.get('http://localhost:3001/api/paiement', params)
        .then(res => setPaiements(res.data.data))
        .catch(err => console.log(err));
    };
    const getContact = () => {
      axios.get('http://localhost:3001/api/clients', params)
        .then(res => setContact(res.data.data))
        .catch(err => console.log(err));
    };
    getContact();
    getPaiment();

  }, []);
  const getPaiments = () => {
    axios.get('http://localhost:3001/api/paiement', params)
      .then(res => setPaiements(res.data.data))
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
  const enregistrerElement = (e) => {
    e.preventDefault();
    //verifier les champs obligatoires
    // if (nouvelElement.numeroPayant === '' || nouvelElement.numeroReceveur === '' || nouvelElement.montant === '' ||
    //   nouvelElement.moyen=== '' ) {
    //     alert('veuillez remplier tous les champs obligatoires.');
    //     return;
    // }
    // Générer le numéro de transaction, l'état et la date du jour par défaut
    const numeroTransaction = 'ABC123';
    const etat = 'encours';
    const date = '2023-05-24'
    // Ajouter le nouvel élément au tableau
    setData((prevData) => [...prevData, { ...nouvelElement, numeroTransaction, etat, date }]);
    // Réinitialiser les valeurs du formulaire après l'enregistrement
    // setParams({
    //   ID_CLIENT: '',
    //   ID_MOYEN_DE_PAIEMENTNI: '0',
    //   NUM_PAYANT: params.NUM_PAYANT,
    //   NUM_RECE: params.NUM_RECE,
    //   NUM_TRANS: params.NUM_TRANS,
    //   DATE_PAIEMENT : Date.now(),
    //   MONTANT : params.MONTANT,
    //   ETAT: 'en cour'
    // });
    axios.post('http://localhost:3001/api/paiement', params)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    fermerFormulaire();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNouvelElement((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  const deletePaiement = (id) => {
    axios.delete('http://localhost:3001/api/paiement', data)
    .then(res => {getPaiments();  setPopup(false)})
    .catch(err => console.log(err));
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const uid = localStorage.getItem('token');
    if (uid) {
      const user = JSON.parse(uid);
      const data = {
        ID_CLIENT: user.ID_CLIENT,
        ID_MOYEN_DE_PAIEMENT: parseInt(params.ID_MOYEN_DE_PAIEMENT),
        NUM_PAYANT: user.NUM_TEL,
        NUM_RECE: parseInt(params.NUM_RECE),
        DATE_PAIEMENT: Date.now(),
        MONTANT: parseInt(params.MONTANT),
        ETAT: 'en cour'
      }
      axios.post('http://localhost:3001/api/paiement', data)
        .then(res => {getPaiments();  setPopup(false)})
        .catch(err => console.log(err));
    }
  };
  const supprimerElement = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;

    // Filtrer les données en fonction du critère de recherche
    const filteredData = data.filter((item) => {
      return item[name].toString().toLowerCase().includes(value.toLowerCase());
    });

    // Mettre à jour les données affichées
    setData(filteredData);
  };

  return (

    <div >
      <Header title="Transaction" />
      <div style={{ border: 'none', marginTop: '3%' }} className='p-5'>


        <h2 style={{ textAlign: 'center' }}>Tout les transactions effectuées</h2>
        {
          popup && (
            <div className='p-4 border fpopup' >
              <form onSubmit={handleSubmit}>
                <h2 className='text-4xl text-center text-gray-600'>Transaction</h2>

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
                <div className="my-4 form-group">
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
                    {contact.map((option) => (
                      <option key={option.ID_CLIENT} value={option.NUM_TEL}>
                        {option.NUM_TEL} ({option.NOM})
                      </option>
                    ))}
                  </select>
                </div>
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

                <div className="my-4 form-group">
                  <label htmlFor="ID_MOYEN_DE_PAIEMENT">Moyen de paiement :</label>
                  <select
                    className="form-control"
                    id="ID_MOYEN_DE_PAIEMENT"
                    name="ID_MOYEN_DE_PAIEMENT"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un moyen de paiement</option>
                    {optionsPaiement.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
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



                <button type='submit' className='w-full px-1 py-2 my-2 text-white rounded-md shadow-md bg-sky-600 hover:bg-sky-500' >Enregistrer</button>
                <button type='button' className='w-full px-1 py-2 my-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500' onClick={fermerFormulaire} >Annuler</button>
              </form>

            </div>
          )
        }
        <table className='w-full text-left '>
          <thead>
            <tr className='text-gray-300 bg-gray-900 '>
              <th className='p-2 border'>Numéro payant</th>
              <th className='p-2 border'>Numéro receveur</th>
              <th className='p-2 border'>Montant</th>
              <th className='p-2 border'>État</th>
              <th className='p-2 border'>Date</th>
    
              <th className='p-2 border'> </th>
            </tr>
          </thead>

          <tbody>
            {paiements.map((item, index) => (
              <tr key={index}>
                <td className='p-2 border'>{item.NUM_PAYANT}</td>
                <td className='p-2 border'>{item.NUM_RECE}</td>
                <td className='p-2 border'>{item.MONTANT}</td>
                <td className='p-2 border'>{item.ETAT}</td>
                <td className='p-2 border'>{item.DATE_PAIEMENT}</td>
           
                <td className='p-2 border'>
                  <button onClick={() => supprimerElement(index)} style={{ color: 'red', backgroundColor: 'white', borderColor: 'white' }}>
                    {<FaTrashAlt onClick={ouvrirFormulaire} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavLink to='/login' id="loginNavLink" className={'hidden'}>
        <span className='font-bold text-blue-500'>Dashboard</span>
      </ NavLink>
    </div>
  );
};

export default Paiements;