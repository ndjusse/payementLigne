/*import React, { useState } from 'react';
import {  FaPlus,  FaTimes} from 'react-icons/fa'
import { Item } from './Item';

function AjouterPaiement() {
  const [nom, setNom] = useState('');
  const [code, setCode] = useState('');
  const [formulaires, setFormulaires] = useState(Item);

  const [showPopup, setShowPopup] = useState(false);

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nom.trim() || !code.trim()) {
      alert('Les champs sont obligatoires');
      return;
    }

    setFormulaires([...formulaires, { nom, code }]);
    setNom('');
    setCode('');
    setShowPopup(false);
  };

  const handleAnnuler = () => {
    setNom('');
    setCode('');
    setShowPopup(false);
  };

  const handleSupprimer = (index) => {
    const newFormulaires = [...formulaires];
    newFormulaires.splice(index, 1);
    setFormulaires(newFormulaires);
  };

  return (
    <div>
        
      <div >
                 
        <div>
           
            Choisissez votre moyen de paiement ou ajouter un nouveau moyen 
            <button onClick={() => setShowPopup(true)}>< FaPlus  style={{marginLeft:'4%'}}/></button>
        </div>
      
        {showPopup && (
        <div style={{display:'flex', border:'solid 1px', marginLeft:'90%', width:'50%' }}>
          <form onSubmit={handleSubmit}>
            <label>
              Nom :
              <input type="text" value={nom} onChange={handleNomChange} />
            </label>
            <br />
            <label>
              Code :
              <input type="text" value={code} onChange={handleCodeChange} />
            </label>
            <br />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={handleAnnuler}>
              Annuler
            </button>
          </form>
        </div>
        )}
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formulaires.map((current, index) => ( 
             
                <tr key={index}>
                  <td>{current.name}</td>
                  <td>{current.code}</td>
                  <button onClick={() => handleSupprimer(index)}>< FaTimes/> </button>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AjouterPaiement ;*/