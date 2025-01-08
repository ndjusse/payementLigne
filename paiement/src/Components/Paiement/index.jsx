import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { FaUserPlus, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import Header from '../Header';
import { NavLink } from 'react-router-dom';

const Paiement = () => {

  // Déclaration des variables

  const [paiements, setPaiements] = useState([]);
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
  const [popup, setPopup] = useState(false);
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


  // A l'ouverture de la page les fonctions suivants sont traitées

  useEffect(() => {
    const uid = localStorage.getItem('token');
    const getPaiment = (idClient) => {
      axios.get('http://localhost:3001/api/paiement/tel/' + idClient)
        .then(res => setPaiements(res.data.data))
        .catch(err => console.log(err));
    };
    const getOptionsPaiement = () => {
      axios.get('http://localhost:3001/api/moyen_de_paiement')
        .then(res => setOptionsPaiement(res.data.data))
        .catch(err => console.log(err));
    };

    const createToken = () => {
      const data = {
        username: "5JAzpb5s7n6VZNabchJV79fKh44GfWxdDiDT1AiDXrNyCparg-y-EIWNvw2k7G7tboeMbDndN0d9x3OkDCKaYA",
        password: "oMOumXwydE_jEhNh0_dK4mtW4dpVBLw8Pn_ifsVpN4_fMLsb1n9rFz87E2-emphq8PVMu4UNlnf1_bTxNDv8Bg"
      }
      axios.post('https://demo.campay.net/api/token/', data)
        .then((res) => { console.log(res.data); if(res.data.token) {localStorage.setItem("campay", res.data.token)} })
        .catch(err => console.log(err));
    };

    if (!uid) {
      const loginNavLink = document.getElementById('loginNavLink')
      loginNavLink.click()
    } else {
      setUser(JSON.parse(uid));
      getPaiment(JSON.parse(uid).NUM_TEL);
      createToken();
    }
    getOptionsPaiement();
  }, []);

  // Déclaration des fonctions

  const getPaiments = () => {
    const uid = localStorage.getItem('token');
    if (uid) {
    axios.get('hhttp://localhost:3001/api/paiement/tel/' + JSON.parse(uid).NUM_TEL)
      .then(res => setPaiements(res.data.data))
      .catch(err => console.log(err));
  };}
  const ouvrirFormulaire = () => {
    setPopup(true)
  }
  const fermerFormulaire = () => {
    setPopup(false)
  }
  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  // Annuler une transaction en cours 
  const annulerPaiement = (id) => {
    axios.put('http://localhost:3001/api/paiement', id)
      .then(res => { getPaiments(); setPopup(false) })
      .catch(err => console.log(err));
  }
  // Créer une transaction 
  const handleSubmit = (event) => {
    var bol = window.confirm('Confirmer la transaction');
    if (bol) {
      event.preventDefault();
      const uid = localStorage.getItem('token');
      const campay = localStorage.getItem('campay');
      if (uid && campay) {
        const user = JSON.parse(uid);
        const data = {
          ID_CLIENT: user.ID_CLIENT,
          ID_MOYEN_DE_PAIEMENT: parseInt(params.ID_MOYEN_DE_PAIEMENT),
          NUM_PAYANT: parseInt(params.NUM_PAYANT),
          NUM_RECE: user.NUM_TEL,
          DATE_PAIEMENT: Date.now(),
          MONTANT: parseInt(params.MONTANT),
          ETAT: 'effectuer',
          ACTIF: 0
        }
        axios.post('http://localhost:3001/api/paiement', data)
        .then(res => { 
          console.log(res.data) 
          const collect = {
            amount: `${parseInt(params.MONTANT)}`,
            currency: "XAF",
            from: `237${params.NUM_PAYANT}`,
            description: "Test",
            external_reference: "",
            redirect_url: "http://localhost:3000/admin/Paiements"
          }
          axios
          .post('https://demo.campay.net/api/collect/', collect, { headers: { "Authorization": `Token ${campay}`, "Content-Type": "application/json"}}).then((r) => {  
            if(r.data.reference){
              const data = {
                amount: `${parseInt(params.MONTANT)}`,
                to: user.NUM_TEL,
                description: "Test",
                external_reference: ""
              }
         
              axios.post('https://demo.campay.net/api/withdraw/', data, { headers: { "Authorization": `Token ${campay}`, "Content-Type": "application/json"}}).then((rs) => {
                console.log(rs);
                setPopup(false);getPaiments(); 
              })
            }else{
              getPaiments(); setPopup(false) 
            }
          }
          ).catch((err)=> { 
            getPaiments(); setPopup(false) 
          } )
        })
        .catch(err => console.log(err) );
      }
    } else {
      alert('Opération annulée');
      getPaiments(user.ID_CLIENT);
      setPopup(false)
    }
  };


  return (

    <div >
      <Header title="Paiements" />
      <div style={{ border: 'none', marginTop: '3%' }} className='p-5'>
        <div className='grid grid-cols-4 my-5 text-left'>
          <div className='col-span-1 pl-4'>
            <h6>Via un moyen de paiement</h6>
            <button className='p-2 text-white bg-blue-600 border rounded-md shadow-xl hover:bg-blue-700 ' style={{ fontSize: '100%' }} onClick={ouvrirFormulaire}> Effectuer une transaction </button>
          </div>
        </div>
        <hr />
        <h2 style={{ textAlign: 'center' }}>Toutes les transactions effectuées</h2>
        {
          popup && (
            <div className='p-4 border fpopup' >
              <form onSubmit={handleSubmit}>
                <h2 className='text-2xl text-center text-gray-600'>Nouvelle transaction</h2>
                <div className="my-4 form-group">
                  <label htmlFor="NUM_PAYANT">Numéro de téléphone du payeur:</label>
                  <input style={{ display: 'flex', }}
                    type="number"
                    className="form-control"
                    name="NUM_PAYANT"
                    id='NUM_PAYANT'
                    onChange={handleChange}
                    required
                  />
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
                      <option key={option.ID_MOYEN_DE_PAIEMENT} value={option.ID_MOYEN_DE_PAIEMENT}>
                        {option.LABEL}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <button type='submit' className='w-full px-1 py-2 my-2 text-white rounded-md shadow-md bg-sky-600 hover:bg-sky-500' >Enregistrer</button>
                  <button type='button' className='w-full px-1 py-2 my-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500' onClick={fermerFormulaire} >Annuler</button>
                </div>
              </form>

            </div>
          )
        }
        <table className='w-full text-left '>
          <thead>
            <tr className='text-gray-300 bg-gray-900 '>
              <th className='p-2 border'>N°</th>
              <th className='p-2 border'>Numéro payant</th>
              <th className='p-2 border'>Numéro receveur</th>
              <th className='p-2 border'>Mode de paiement utilisé</th>
              <th className='p-2 border'>Montant</th>
              <th className='p-2 border'>État</th>
              <th className='p-2 border'>Date</th>
              {/* <th className='p-2 border'> </th> */}
            </tr>
          </thead>
          {
            optionsPaiement.length > 0 && (
              <tbody>
                {paiements.map((item, index) => (
                  <tr key={index} className='bg-white'>
                    <td className='p-2 border'>TRF{index + 1}</td>
                    <td className='p-2 border'>{item.NUM_PAYANT}</td>
                    <td className='p-2 border'>{item.NUM_RECE}</td>
                    <td className='flex items-center gap-2 p-2 border'> <img width={35} src={optionsPaiement[item.ID_MOYEN_DE_PAIEMENT - 1].IMG}></img>{optionsPaiement[item.ID_MOYEN_DE_PAIEMENT - 1].LABEL} ({optionsPaiement[item.ID_MOYEN_DE_PAIEMENT - 1].REF}) </td>
                    <td className='p-2 border'>{item.MONTANT}</td>
                    <td className={(item.ETAT == "en cours" ? 'p-2 text-yellow-800 border' : 'p-2 text-green-800 border')}>{item.ETAT}</td>
                    <td className='p-2 border'>{item.DATE_PAIEMENT}</td>
                    {/* <td className='p-2 border'>
                      <button className='flex items-center gap-2 p-2 text-xs text-white bg-red-600 border rounded-md shadow-xl hover:bg-red-700 ' onClick={ouvrirFormulaire}> {<FaTrashAlt />} Annuler </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            )}
        </table>
      </div>
      <NavLink to='/login' id="loginNavLink" className={'hidden'}>
        <span className='font-bold text-blue-500'>Dashboard</span>
      </ NavLink>
    </div>
  );
};

export default Paiement;