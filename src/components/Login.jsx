import React, { useContext, useState } from 'react'
import api from '../axios/axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const {login}=useContext(AuthContext)

    const submitData = async () => {
        // if(formdata.email.length < 2 || formdata.password.length < 2){
        //     alert("Please enter valid email and password");
        //     return
        // }
        // console.log("formdata",formdata);
        let response = await api.post("/api/v1/auth/login",formdata)
        login(response.data.access_token);
        console.log(response);

    }
    return (
        <div>
            <input type="email" placeholder='enter email' onChange={(e) => { setFormdata({ ...formdata, email: e.target.value }) }} />
            <input type="text" placeholder='enter password' onChange={(e) => { setFormdata({ ...formdata, password: e.target.value }) }} />
            <button onClick={submitData}>Submit data</button>
            <p>changeme</p>
            <p>john@mail.com</p>
        </div>
    )
}

export default Login
