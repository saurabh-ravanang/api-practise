import React, { useEffect, useState } from 'react'
import api from '../axios/axios'

function UsersAxios() {
    const [data, setData] = useState([])
    const [formdata, setFormdata]=useState({
        userId:"",
        title:"",
        body:""
    })

    useEffect(() => {
        fetchuser()
    }, [])

    const fetchuser = async()=>{
        try {
            let response = await api.get("/posts");
            console.log("response",response)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const submitData = async()=>{
        let response = await api.post("/posts",formdata);
        setData([response.data, ...data]);
        console.log("post response",response)
    }
    return (
        <div>
             <input type="text" placeholder='enter userid' onChange={(e) => { setFormdata({...formdata, userId:e.target.value}) }} />
            <input type="text" placeholder='enter title' onChange={(e) => { setFormdata({...formdata, title:e.target.value}) }} />
            <input type="text" placeholder='enter body' onChange={(e) => { setFormdata({...formdata, body:e.target.value}) }} />
                <button onClick={submitData}>Submit data</button>

                {data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1>{item.id}{item.title}</h1>
                        </div>
                    )
                })}
        </div>
    )
}

export default UsersAxios
