// import axios from 'axios';
// import React, { useState } from 'react'
// import{useHistory, useParams} from "react-router-dom";


// const Edit = () => {

//  let history = useHistory();
//  const {id} = useParams();


//     const [user, setUser] = useState({
//       NOM: '',
      
//       NUM_TEL: '',
//       EMAIL: '',
//       DATE_EXP: '',
//       PAYS: ''
//     });

//     const { NOM, NUM_TEL ,EMAIL, DATE_EXP, PAYS } = user ;
//     const onInputChange = e => {
//       setUser({...user, [e.target.name]: e.target.value});
//     };

//     const onsubmit= async e => {
//       e.preventDefault();
//       await axios.put('http://localhost:3000/dashboard/Edit/${id}', user);
//       history.push("/"); 
//     };

//     const loadUser= async () => {
//       const result = await axios.get('http://localhost:3000/dashboard/Edit/${id}');
//       setUser(result.data);
//     }; 

    


//   return (
//     <div>
//           <h2>Edit a user</h2> 
//           <form onSubmit={ e => onsubmit(e)} className='col-span-1 w-full p-4 border '>
//               <h2 className='text-4xl text-gray-600 text-center'>Enregistrer un nouveau client</h2>
//               <div className="form-group">
//                 <label htmlFor="NOM">Nom</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="NOM"
//                   name="NOM"
//                   value={params.NOM}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <br />
//               <div className="form-group">
//                 <label htmlFor="NUM_TEL">Numéro de téléphone</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="NUM_TEL"
//                   name="NUM_TEL"
//                   value={params.NUM_TEL}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <br />
//               <div className="form-group ">
//                 <label htmlFor="password">Mot de passe</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   value={params.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <br />
//               <div className="form-group">
//                 <label htmlFor="EMAIL">Adresse email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="EMAIL"
//                   name="EMAIL"
//                   value={params.EMAIL}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <br />
//               <div className="form-group">
//                 <label htmlFor="PAYS">Pays</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="PAYS"
//                   name="PAYS"
//                   value={params.PAYS}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <br />
//               <div className="form-group">
//                   <label htmlFor="paymentMethod">Moyen de paiement</label>
//                   <select
//                               id="paymentMethod"
//                               name="paymentMethod"
//                               value={moyenPaiement}
//                               onChange={handlePaymentChange}
//                               required
//                             >
//                   <option value="">Choisissez un moyen de paiement</option>
//                   <option value="momo">Mobile Money (MOMO)</option>
//                   <option value="om">Orange Money (OM)</option>
                  
//                   </select>
//                   </div>
                 
                  
//                   <br />
                 
                 



//               <button
//                 className='w-full px-1 py-2 text-white rounded-md shadow-md bg-sky-600'
//                 type="submit"
//               >
//                 Enregistrer
//               </button>

//             </form>
//     </div>
    
//   )
// }

// export default Edit