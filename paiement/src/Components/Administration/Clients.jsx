import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import { StoreContext } from '../Store';
import { NavLink } from 'react-router-dom';
import './styles.css';
const Clients = () => {
  const { formData } = useContext(StoreContext);

  const { code } = formData; // Récupérer le code depuis les données du formulaire
  const [contact, setContact] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState('');
  const [autreNom, setAutreNom] = useState('');
  
  const [autreCode, setAutreCode] = useState('');
  const [autresPaiements, setAutresPaiements] = useState([]);
  const [donnees, setDonnees] = useState([]);
  const [params, setParams] = useState({
    NOM: '',
    PRENOM:'',
    password: '',
    NUM_TEL: '',
    EMAIL: '',
    DATE_EXP: '',
    PAYS: ''
  });
  const [searchTerms, setSearchTerms] = useState({
    NOM: '',
    password: '',
    NUM_TEL: '',
    EMAIL: '',
    PAYS: ''
  });

  useEffect(() => {

    const getContact = () => {
      axios.get('http://localhost:3001/api/clients')
        .then(res => setContact(res.data.data))
        .catch(err => console.log(err));
    };


    getContact();

  }, []);


  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  const handlePaymentChange = (event) => {
    setMoyenPaiement(event.target.value);
  };

  const handleSearch = (event, columnName) => {
    setSearchTerms({ ...searchTerms, [columnName]: event.target.value });
  };

  const [client, setClient] = useState(null);

  const getClient = (id) => {
    axios.get(`http://localhost:3001/api/client/${id}`)
      .then(res => setClient(res.data.data))
      .catch(err => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nouvelleDonnee = {
      NOM: params.NOM,
      password: params.password,
      NUM_TEL: params.NUM_TEL,
      EMAIL: params.EMAIL,
      DATE_EXP: params.DATE_EXP,
      PAYS: params.PAYS,
      moyenPaiement: moyenPaiement
    };
    setDonnees([...donnees, nouvelleDonnee]);

    setParams({
      NOM: '',
      password: '',
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };



  return (
    <>
      <div style={{
        width: '100%',
        maxWidth: '100%',
      }}>
        <Header title="Utilisateurs" />
        <section className='p-4 '>
         
            
              {/* <div className='p-4 border fpopup' >
                <form onSubmit={handleSubmit} className='w-full col-span-1 p-4 border '>
                  <h2 className='text-4xl text-center text-gray-600'>Enregistrer un nouveau client</h2>
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
                      type="text"
                      className="form-control"
                      id="NUM_TEL"
                      name="NUM_TEL"
                      value={params.NUM_TEL}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group ">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      name="password"
                      value={params.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                  <button
                    className='w-full px-1 py-2 text-white rounded-md shadow-md bg-sky-600'
                    type="submit"
                  >
                    Enregistrer
                  </button>

                </form>
              </div> */}
           
          <div className='w-full col-span-3 px-4 m-auto'>
            
            {contact && (
              <table className='w-full text-left bg-stone-600'>
                <thead>
                  <tr className='text-stone-300 bg-stone-600 '>
                    <th className='p-2 border'>N°</th>
                    <th className='p-2 border'>Nom</th>
                    <th className='p-2 border'>Prenom</th>
                    <th className='p-2 border'>Numéro de téléphone</th>
                    <th className='p-2 border'>Email</th>
                    <th className='p-2 border'>Pays</th>
                    <th className='p-2 border'> </th>
                  </tr>
                </thead>
                <tbody>
                  {contact
                   .filter((data) => {
                    // Filtrer les données en fonction des termes de recherche saisis
                    return (
                      (!searchTerms.NOM || data.NOM.toLowerCase().includes(searchTerms.NOM.toLowerCase())) &&
                      (!searchTerms.PRENOM || data.PRENOM.toLowerCase().includes(searchTerms.PRENOM.toLowerCase())) &&
                      (!searchTerms.NUM_TEL || data.NUM_TEL.toString().toLowerCase().includes(searchTerms.NUM_TEL.toLowerCase())) &&
                      (!searchTerms.EMAIL || data.EMAIL.toLowerCase().includes(searchTerms.EMAIL.toLowerCase())) &&
                      (!searchTerms.PAYS || data.PAYS.toLowerCase().includes(searchTerms.PAYS.toLowerCase()))
                    );
                  })
                    .map((data, index) => (
                      <tr key={index} className='bg-white'>
                        <td className='p-2 border'>{index + 1}</td>
                        <td className='p-2 border'>{data.NOM}</td>
                        <td className='p-2 border'>{data.PRENOM}</td>
                        <td className='p-2 border'>{data.NUM_TEL}</td>
                        <td className='p-2 border'>{data.EMAIL}</td>
                        <td className='p-2 border'>{data.PAYS}</td>
                        <td className='flex gap-3 p-1'>
                          {/* <button className='py-2 my-1 text-xs text-white bg-red-600 rounded-md shadow-md px-7'
                            type="button">
                            Supprimer
                          </button>

                          <button className='py-2 my-1 text-xs text-white bg-yellow-400 rounded-md shadow-md px-7'
                            type="button">
                            Modifier
                          </button> */}
                        </td>
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

export default Clients;








