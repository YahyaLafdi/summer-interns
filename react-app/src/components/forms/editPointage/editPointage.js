import { ErrorMessage, Form, Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react'
import { pointageValidation, pointagesDetails1 } from '../addPointage/utils';
import axios from 'axios';

const EditPointage = ({ visible, activeTab, setLoading, refetch, setRefetch, item }) => {
    const [isReady, setIsReady] = useState(false);
    const [formInfos, setFormInfos] = useState(item);
  
    useEffect(() => {
      const doAdd = async () => {
        try{
          console.log(formInfos)
          setLoading(true);
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${item.id}`, formInfos);
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
      <header>Modifier un pointage</header>
      {/* <form> dans les autres formulaires */}
      <div id="form">
        <div className="form first">
          <div className="details personal">
            <span className="title"> Détails du pointage</span>

            <Formik initialValues={item} validationSchema={pointageValidation} >
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
                  <button disabled={!props.isValid } type='button' onClick={()=>{
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

export default EditPointage