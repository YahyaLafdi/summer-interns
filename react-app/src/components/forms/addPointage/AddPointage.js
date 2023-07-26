import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { initPointages, pointageValidation, pointagesDetails1 } from './utils'
import axios from 'axios'

const AddPointage = ({ visible, activeTab, setLoading, refetch, setRefetch }) => {
  /* useEffect(() => {
    const form = document.querySelector("#form"),
      nextBtn = form.querySelector(".nextBtn"),
      backBtn = form.querySelector(".backBtn");
    nextBtn.addEventListener("click", () => {
      form.classList.add("secActive");
    });
    backBtn.addEventListener("click", () => form.classList.remove("secActive"))
  })*/
  const [isReady, setIsReady] = useState(false);
  const [formInfos, setFormInfos] = useState(initPointages);

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
                          <Field
                            type={elt.type}
                            placeholder={elt.label}
                            name={elt.name}
                          />
                          <ErrorMessage
                            name={elt.name}
                            component="div"
                            className="error"
                          />
                        </div>
                      ))}
                    </div>
                    <button disabled={!props.isValid || !props.touched.numBordereau } type='button' onClick={()=>{
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