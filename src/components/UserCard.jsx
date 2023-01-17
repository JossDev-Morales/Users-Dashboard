import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPen,faTrash} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import './../App.css'
function UserCard({user,switchForm,setFS,setId,setSucces}) {

    function deleteUser() {
        axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`)
        .then(()=>{
            setSucces()
            setTimeout(()=>{location.reload()},3000)
        })
        .catch(error=>console.log(error.response.status+" "+error.response.textEstatus))
    }
    return(
        <div className='card glass'>
            <h2>{user.first_name+" "+user.last_name}</h2>
            <div className="card__info">
                <div><span>Birthday: </span><p>{user.birthday}</p></div>
                <div><span>E-mail: </span><p>{user.email}</p></div>
                <div><span>Password: </span><p>{user.password}</p></div>
                <div><span>Id: </span><p>{user.id}</p></div>
            </div>
            <div onClick={()=>{switchForm(true);setFS(false);setId(user)}} className="btn edit__user"><FontAwesomeIcon icon={faUserPen} /></div>
            <div onClick={deleteUser} className="btn delete__user"><FontAwesomeIcon icon={faTrash} /></div>
        </div>
    )
}
export default UserCard