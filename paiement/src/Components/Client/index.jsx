import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import { StoreContext } from '../Store';
import { NavLink } from 'react-router-dom';

const Client = () => {

  const { formData } = useContext(StoreContext);
  const { code } = formData; // Récupérer le code depuis les données du formulaire
  const [contactList, setContactList] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState('');
  const [autreNom, setAutreNom] = useState('');
  const [autreCode, setAutreCode] = useState('');
  const [autresPaiements, setAutresPaiements] = useState([]);
  const [donnees, setDonnees] = useState([]);
  const [params, setParams] = useState({
    NOM: '',
    PASSWORD: '',
    NUM_TEL: '',
    EMAIL: '',
    DATE_EXP: '',
    PAYS: ''
  });
  const [contact, setContact] = useState({
    ID_CONTACT: 0,
    IDC: 0,
    IDT: 0,
  });
  useEffect(() => {
   
    const getContact = (id) => {
      axios.get(`http://localhost:3001/api/clients/list/${id}`)
        .then(res => setContactList(res.data.data))
        .catch(err => console.log(err));
    };
    
    const uid = localStorage.getItem('token');
    if (!uid) {
      const loginNavLink = document.getElementById('loginNavLink')
      loginNavLink.click()
    }else{
      const clientId = JSON.parse(uid).ID_CLIENT;
      getContact(clientId);
    }
  }, []);


  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };


  const handlePaymentChange = (event) => {
    setMoyenPaiement(event.target.value);
  };

  const [client, setClient] = useState(null);

  const getContact = (id) => {
    axios.get(`http://localhost:3001/api/clients/list/${id}`, params)
      .then(res => setContactList(res.data.data))
      .catch(err => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nouvelleDonnee = {
      NOM: params.NOM,
      PASSWORD: params.PASSWORD,
      NUM_TEL: params.NUM_TEL,
      EMAIL: params.EMAIL,
      DATE_EXP: params.DATE_EXP,
      PAYS: params.PAYS,
      moyenPaiement: moyenPaiement
    };
    setDonnees([...donnees, nouvelleDonnee]);

    setParams({
      NOM: '',
      PASSWORD: '',
      NUM_TEL: '',
      EMAIL: '',
      DATE_EXP: '',
      PAYS: ''
    });
    setMoyenPaiement('');

    if (moyenPaiement === 'Autre' && autreNom && autreCode) {
      const nouvelAutrePaiement = { nom: autreNom, code: autreCode };
      setAutresPaiements([...autresPaiements, nouvelAutrePaiement]);

      setAutreNom('');
      setAutreCode('');
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .post('http://localhost:3001/api/clients', params)
      .then((res) => {console.log(res);   const uid = localStorage.getItem('token'); getContact(JSON.parse(uid).ID_CLIENT)})
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <div style={{
        width: '100%',
        maxWidth: '100%',
      }}>
        <Header title="Mes contacts" />
        <section className='grid items-start justify-start grid-cols-4 p-4'>
          <form onSubmit={handleSubmit} className='w-full col-span-1 p-4 border '>
            <h4 className='text-2xl text-center text-gray-600'>Enregistrer un nouveau contact</h4>
            <div className="form-group">
              <label htmlFor="NOM">Nom</label>
              <input
                type="text"
                className="form-control"
                id="NOM"
                name="NOM"
                value={params.NOM}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="NUM_TEL">Numéro de téléphone</label>
              <input
                type="tel"
                className="form-control"
                id="NUM_TEL"
                name="NUM_TEL"
                value={params.NUM_TEL}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="EMAIL">Adresse email</label>
              <input
                type="email"
                className="form-control"
                id="EMAIL"
                name="EMAIL"
                value={params.EMAIL}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="PAYS">Pays</label>
              <input
                type="text"
                className="form-control"
                id="PAYS"
                name="PAYS"
                value={params.PAYS}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            {/* <div className="form-group">
              <label htmlFor="paymentMethod">Moyen de paiement</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={moyenPaiement}
                onChange={handlePaymentChange}
                required
              >
                <option value="">Choisissez un moyen de paiement</option>
                <option value="momo">Mobile Money (MOMO)</option>
                <option value="om">Orange Money (OM)</option>

              </select>
            </div>
            <br /> */}
            <button
              className='w-full px-1 py-2 text-white rounded-md shadow-md bg-sky-600'
              type="submit"
            >
              Enregistrer
            </button>

          </form>
          <div className='col-span-3 px-4'>
            <h4 className='text-2xl text-center text-gray-600'>Liste des contacts</h4>
            {contactList && (
              <table className='w-full text-left bg-gray-900'>
                <thead >
                  <tr className='text-gray-300 '>
                    <th className='p-2 border'>Nom</th>
                    <th className='p-2 border'>Numéro de téléphone</th>
                    <th className='p-2 border'>Email</th>
                    <th className='p-2 border'>Pays</th>
                  </tr>
                </thead>
                <tbody>
                  {contactList.map((data, index) => (
                    <tr key={index} className='bg-white'>
                      <td className='p-2 border'>{data.NOM}</td>
                      <td className='p-2 border'>{data.NUM_TEL}</td>
                      <td className='p-2 border'>{data.EMAIL}</td>
                      <td className='p-2 border'>{data.PAYS}</td>
                      <td className="p-2 border">
                      </td> {/* Bouton "Edit" pour chaque ligne */}
                    </tr>
                  ))}
                </tbody>
              </table>)}
          </div>
        </section>
      </div>
      <NavLink to='/login' id="loginNavLink" className={'hidden'}>
        <span className='font-bold text-blue-500'>Dashboard</span>
      </ NavLink>
    </>
  );
}




export default Client;

// En résumé, le premier morceau de code récupère tous les contacts,
// le deuxième morceau de code récupère un client spécifique en fonction de l'ID,
// et le troisième morceau de code ajoute un nouveau client






