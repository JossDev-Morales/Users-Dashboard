import axios, { formToJSON } from 'axios'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import './../App.css'

function Form({newUser,id,switchForm,setSucces}) {   
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [editableuser,setEditableUser]=useState()
    const [FN,setFN]=useState("")
    const [LN,setLN]=useState("")
    const [EM,setEM]=useState("")
    const [BD,setBD]=useState("")
    const [PW,setPW]=useState("")
     idk()
    function idk() {
        if (id!=undefined) {
            axios.get(`https://users-crud.academlo.tech/users/${id.id}/`)
            .then(res=>{
                setFN(res.data.first_name)
                setLN(res.data.last_name)
                setEM(res.data.email)
                setBD(res.data.birthday)
                setPW(res.data.password)
            })  
        }
        
    }

function onSubmit (data){
    console.log(data);
    if (newUser==true) {
        axios.post(`https://users-crud.academlo.tech/users/`,data)
        .then(()=>{
            setSucces()
            setTimeout(()=>{location.reload()},3000)
        })
        .catch(err=>console.log(err.response.status))
    }else if(newUser==false) {
        axios.put(`https://users-crud.academlo.tech/users/${id.id}/`,data)
        .then(()=>{
            setSucces()
            setTimeout(()=>{location.reload()},3000)
        })
        .catch(error=>console.log(error.response.status+" "+error.response.textEstatus))
    }
    
}

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <h2>New User</h2>
    <div onClick={()=>{
        switchForm(false)
        setTimeout(() => {
            document.querySelector(".form").classList.add("display-none")
        }, 1000);
        }} className="closeForm glass"><FontAwesomeIcon icon={faXmark} /></div> 
    <label htmlFor="FN">
        <p>First name</p>
        <input onChange={(e)=>setFN(e.target.value)} defaultValue={FN} id='FN'  {...register("first_name",{ required: true })} placeholder="Your first name" />
        {errors.first_name && <span>This field is required</span>}
    </label>
      
    <label htmlFor="LN">
        <p>Last name</p>
        <input onChange={(e)=>setLN(e.target.value)} defaultValue={LN} id='LN' {...register("last_name", { required: true })} placeholder="Your last name" />
        {errors.last_name && <span>This field is required</span>}
    </label>
      
    <label htmlFor="EM">
        <p>E-mail</p>
        <input onChange={(e)=>setEM(e.target.value)} defaultValue={EM} id='EM' {...register("email", { required: true })} placeholder="Your email" />
        {errors.email && <span>This field is required</span>}
    </label>
      
    <label htmlFor="BD">
        <p>Birthday</p>
        <input onChange={(e)=>setBD(e.target.value)} defaultValue={BD} id='BD' type={"date"} {...register("birthday", { required: true })} placeholder="Your birthday" />
        {errors.birthday && <span>This field is required</span>}
    </label>
         
    <label htmlFor="PW">
        <p>Password</p>
        <input onChange={(e)=>setPW(e.target.value)} defaultValue={PW} id='PW' type={"password"} {...register("password", { required: true })} placeholder="Your password" />
        {errors.password && <span>This field is required</span>}
    </label>
      

    <button onClick={()=>{
        switchForm(false)
        setTimeout(() => {
            document.querySelector(".form").classList.add("display-none")
        }, 1000);
        }} className="btn submit">{newUser==true?"New":"Save"}</button>
    </form>
  );
}
export default Form
