import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus,faMoon,faSun} from '@fortawesome/free-solid-svg-icons'
import Card from './components/UserCard'
import { useState,useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import PopSucces from './components/PopSucces'
import {InfinitySpin} from  'react-loader-spinner'

function App() {
  const [allUsers,setAllUsers]=useState()
  const [formStatus,setFormStatus]=useState(true)
  const [openedForm,setOpenedForm]=useState(false)
  const [id,setId]=useState()
  const switchForm=(value)=>{setOpenedForm(value)}
  const setFS=(value)=>{setFormStatus(value)}
  const setTheId=(theId)=>{setId(theId)}
  const [scheme,setScheme]=useState(false)
  const [succes,setSucces]=useState(false)
  const [error,setError]=useState(false)
  const [loader,setLoader]=useState("true")
  useEffect(()=>{
    axios.get(`https://users-crud.academlo.tech/users/`)
    .catch(err=>{console.log(err)})
    .then(res => {
      setAllUsers(res.data)
      setTimeout(() => {
        setLoader(false)
      }, 2000);
    })
    
  },[openedForm])
function switchmode() {
  if (scheme) {
   setScheme(false)
   document.getElementById('root').classList.replace('white-scheme','dark-scheme') 
  }else{
    setScheme(true)
    document.getElementById('root').classList.replace('dark-scheme','white-scheme') 
  }
}function succesFunc() {
  setSucces(true)
}
  return (
    <>
    {(loader?<div className='loader'><InfinitySpin width='200'color="#ffff"/></div>:
    <div className='App'>
    {succes==true&&<PopSucces reset={succesFunc}/>}
    <header>
      <div onClick={switchmode} className="btn glass schemebtn">{scheme==true?(<FontAwesomeIcon icon={faSun} />):(<FontAwesomeIcon icon={faMoon} />)}</div>
      <h1 className='glass'>Users</h1>
      <div onClick={()=>{setOpenedForm(true)}} className="btn glass">Create<FontAwesomeIcon icon={faUserPlus}/></div>
    </header>
    {allUsers?.map(e=>(<Card user={e} switchForm={switchForm} setFS={setFS} setId={setTheId} setSucces={succesFunc}/>))}
    {allUsers?.length==0&&(<h2>No Users Yet..</h2>)}
    <div className={openedForm==true?"form openedForm":"form closedForm"}>
      <Form newUser={formStatus} id={id} switchForm={switchForm} setSucces={succesFunc}/>
    </div>
    
  </div>)}
       
    </>
  )
}

export default App
