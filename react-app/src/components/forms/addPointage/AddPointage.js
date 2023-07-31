import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { initPointages, pointageValidation, pointagesDetails1 } from './utils'
import axios from 'axios'

const AddPointage = ({ visible, activeTab, setLoading, refetch, setRefetch }) => {
  const [isReady, setIsReady] = useState(false);
  const [formInfos, setFormInfos] = useState(initPointages);
  const [unitProds, setUnitProds] = useState(null);
  const [personnels, setPersonnels] = useState(null);

  useEffect(() => {
    setRefetch(!refetch);
    console.log("refetching...");
  },[])

  useEffect(() => {
    const getUnitProd = async () => {
      try {
        console.log("calling function getUnitProd()...")
        let {data}  = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/produnit`
        );
        setUnitProds(data.data);
        let pers = (await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/personnels`
        )).data;
        setPersonnels(pers.data);
      } catch (e) {
        console.error(e);
      }
    };
    getUnitProd();
    console.log(unitProds)
  }, [refetch]);

  useEffect(() => {
    console.log(personnels)
  }, [personnels])
  
 

  useEffect(() => {
    const doAdd = async () => {
      try{        
        console.log(formInfos)
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s`, formInfos);
        setLoading(false);
        visible(false);
        setRefetch(!refetch);
      } catch(error){
        setLoading(false);
        console.log(error);
      }
    }
     if(isReady){
      doAdd();
     }
     console.log(formInfos)
  }, [isReady])
  

  
  
  return (
    <div className="blur">
      <div className="container">
        <i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
        <header>Ajouter un pointage</header>
        {/* <form> dans les autres formulaires */}
        <div id="form">
          <div className="form first">
            <div className="details personal">
              <span className="title"> Détails du pointage</span>

              <Formik initialValues={initPointages} validationSchema={pointageValidation} >
                {(props) => (
                  <Form>
                    <div className="fields">
                      {pointagesDetails1.map((elt) => (
                        <div className="input-field">
                          <label>{elt.label}</label>
                          {(elt.name!=="codeUnitProd" && elt.name!=="matricule")&& <Field
                            type={elt.type}
                            placeholder={elt.label}
                            name={elt.name}
                          />}
                          {elt.name==="codeUnitProd" && <>
                            <Field 
                              as={elt.type}
                              name={elt.name}
                              id="codeUnitProd"
                              placeholder="Start typing..."
                            >
                             <option value="" disabled selected>
                                  Code Unité de production
                                </option>
                              {unitProds?.map(unit =>(
                                <option key={unit.id} value={unit.id}>{unit.id}</option>
                              ))}
                            </Field>
                          </>}
                          {elt.name==="matricule" && <> 
                          <Field
                            as="input"
                            name="matricule"
                            id="matricule"
                            placeholder="Matricule"
                            list="matricules"
                          />
                          <datalist id='matricules' >
                                {personnels?.map(pers =>(
                                  <option key={pers.id} value={pers.matricule}>{pers.nom} {pers.prenom}  </option>
                                ))}
                          </datalist>
                          </>}
                          <ErrorMessage
                            name={elt.name}
                            component="div"
                            className="error"
                          />
                        </div>
                      ))}
                    </div>
                    <button disabled={!props.isValid || !props.touched.codeUnitProd } type='button' onClick={()=>{
                      setFormInfos(props.values);
                     setIsReady(true);
                    }} className="">
                      <span className="btnText">Enregistrer</span>
                      <i className="uil uil-navigator"></i>
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPointage