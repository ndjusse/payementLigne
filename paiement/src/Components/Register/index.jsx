import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import myImage from '../../assets/mobil.jpg';

import { StoreContext } from '../Store';

import 'bootstrap/dist/css/bootstrap.css'; // Importez le fichier CSS de Bootstrap
import { NavLink } from 'react-router-dom';

const Register = () => {
  const { formData } = useContext(StoreContext);
  const { code } = formData; // Récupérer le code depuis les données du formulaire

  const [moyenPaiement, setMoyenPaiement] = useState('');
  const [autreNom, setAutreNom] = useState('');
  const [autreCode, setAutreCode] = useState('');
  const [autresPaiements, setAutresPaiements] = useState([]);
  const [donnees, setDonnees] = useState([]);
  const [params, setParams] = useState({
    NOM: '',
    PRENOM: '',
    PASSWORD: '',
    NUM_TEL: '',
    EMAIL: '',
    DATE_EXP: '',
    PAYS: ''
  });

  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  const optionsPaiement = ['MOMO', 'OM', 'Autre', code];

  const handleChangeMoyenPaiement = (event) => {
    setMoyenPaiement(event.target.value);
  };

  useEffect (()=>{
    const uid= localStorage.getItem('token');
    if(uid){
      const homeNavLink = document.getElementById('homeNavLink')
      homeNavLink.click()
    }
  },[]);  

  const handleChangeAutreNom = (event) => {
    setAutreNom(event.target.value);
  };

  const handleChangeAutreCode = (event) => {
    setAutreCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nouvelleDonnee = {
      NOM: params.NOM,
      PRENOM: params.PRENOM,
      PASSWORD: params.PASSWORD,
      NUM_TEL: params.NUM_TEL,
      EMAIL: params.EMAIL,
      DATE_EXP: params.DATE_EXP,
      PAYS: params.PAYS,
      moyenPaiement: moyenPaiement
    };
    if(nouvelleDonnee.PASSWORD.length >= 8){
      setDonnees([...donnees, nouvelleDonnee]);

      setParams({
        NOM: '',
        PRENOM: '',
        PASSWORD: '',
        NUM_TEL: '',
        EMAIL: '',
        DATE_EXP: '',
        PAYS: ''
      });
      setMoyenPaiement('');
  
      // if (moyenPaiement === 'Autre' && autreNom && autreCode) {
      //   const nouvelAutrePaiement = { nom: autreNom, code: autreCode };
      //   setAutresPaiements([...autresPaiements, nouvelAutrePaiement]);
  
      //   setAutreNom('');
      //   setAutreCode('');
      // }
  
      // Configuration des en-têtes par défaut pour les requêtes POST
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      // Envoi d'une requête POST à l'URL spécifiée avec les paramètres spécifiés
      axios
        .post('http://localhost:3001/api/clients', params)
        .then((res) => {
          alert("Votre compte a été créer!")
          // Récupération de la référence de l'élément avec l'ID 'loginNavLink'
          const loginNavLink = document.getElementById('loginNavLink')
           // Déclenchement d'un clic programmé sur l'élément 'loginNavLink'
          loginNavLink.click()
        })
        .catch((err) => console.log(err.response));
    }else{
      alert("Entrée au moins 8 caractères au niveau du mot de passe")
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
    }}>
    <div className="min-h-screen bg-center bg-cover " style={{ backgroundImage: `url(${myImage})`  }}>
      
        
        
          
        
        <div className='flex justify-center '>
          <section className='container flex items-center justify-center col-span-2 m-auto mt-5 '>
            <form onSubmit={handleSubmit} class="bg-white max-w-2xl w-full m-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 " >
              <h2 className='text-4xl font-bold text-center'>s'inscrire</h2>
              <div className="form-group ">
                <label htmlFor="NOM"  >
                  Nom</label>
                <input
                  type="text"
                  className="form-control "
                  id="NOM"
                  name="NOM"
                  value={params.NOM}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group ">
                <label htmlFor="PRENOM"  >
                  Prenom</label>
                <input
                  type="text"
                  className="form-control "
                  id="PRENOM"
                  name="PRENOM"
                  value={params.PRENOM}
                  onChange={handleChange}
                  required
                />
              </div>
              <br/>
              <div className="form-group ">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="PASSWORD"
                  name="PASSWORD"
                  value={params.PASSWORD}
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
                <label htmlFor="DATE_EXP">Date d'expiration</label>
                <input
                  type="date"
                  className="form-control"
                  id="DATE_EXP"
                  name="DATE_EXP"
                  value={params.DATE_EXP}
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
                <label htmlFor="moyenPaiement">Moyen de paiement :</label>
                <select
                  className="form-control"
                  id="moyenPaiement"
                  name="moyenPaiement"
                  value={moyenPaiement}
                  onChange={handleChangeMoyenPaiement}
                  required
                >
                  <option value="">Sélectionnez un moyen de paiement</option>
                  {optionsPaiement.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div> */}
{/* 
              {moyenPaiement === 'Autre' && (
                <div>
                  <div className="fpopup">
                    <div>
                      <h4 style={{ marginBottom: '20%', textAlign: 'center' }}>
                        Veuillez saisir un autre moyen de paiement
                      </h4>
                      <label style={{ display: 'flex', marginLeft: '13%' }}>Nom :</label> <br />
                      <input
                        style={{ display: 'flex', marginLeft: '13%' }}
                        type="text"
                        value={autreNom}
                        onChange={handleChangeAutreNom}
                        required
                      /><br />

                      <label style={{ display: 'flex', marginLeft: '13%' }}>Code :</label> <br />
                      <input
                        style={{ display: 'flex', marginLeft: '13%' }}
                        type="text"
                        value={autreCode}
                        onChange={handleChangeAutreCode}
                        required
                      />
                      <br /><br />

                      <button type="submit" style={{ marginLeft: '13%' }}>Valider</button>
                      <button type="button" onClick={() => setMoyenPaiement('')} style={{ marginLeft: '22%' }}>Annuler</button>
                    </div>
                  </div>
                </div>
              )} */}

              {/* <div>
                <h3>Autres moyens de paiement enregistrés :</h3>
                {autresPaiements.length === 0 ? (
                  <p>Aucun autre moyen de paiement enregistré.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {autresPaiements.map((paiement, index) => (
                        <tr key={index}>
                          <td>{paiement.nom}</td>
                          <td>{paiement.code}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div> */}
              <br />
              <button
                  className='w-full px-1 py-2 my-3 text-white rounded-md shadow-md bg-sky-600'
                  type="submit"
              >
                  Enregistrer
              </button>
              <NavLink to='/login' id="loginNavLink">
                  <span className='font-bold text-blue-500'>Se connecter</span>
              </ NavLink>
              <NavLink to='/dashboard' id="homeNavLink" className={'hidden'}>
                  <span className='font-bold text-blue-500'>Home</span>
              </ NavLink>
            </form>
          </section>
        </div>

       
      </div>
  </div>
  );
}

export default Register;








