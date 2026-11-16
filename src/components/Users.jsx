import React, { useEffect, useState } from 'react'
import api from '../axios/axios'

function Users() {
    const [data, setData] = useState([])
    // const [userId, setUserid] = useState("")
    // const [title, setTitle] = useState("")
    // const [body, setBody] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormdata] = useState({
        userId: "",
        title: "",
        body: ""
    })
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let userData = await fetch("https://jsonplaceholder.typicode.com/posts");
        userData = await userData.json();
        console.log(userData)
        setData(userData)
    }

    const submitData = async () => {
        // let data = { userId, title, body }
        let userData = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        userData = await userData.json();
        console.log(userData)
    }

    const openModal = (item) => {
        setFormdata({
            userId: item.userId,
            title: item.title,
            body: item.body,
        });
        console.log("item ...........",item)
        // setUserid(item.userId);
        // setTitle(item.title);
        // setBody(item.body);

        setIsModalOpen(true);
    };
    return (
        <>
            <div>

                {/* <input type="text" placeholder='enter userid' onChange={(e) => { setUserid(e.target.value) }} />
                <input type="text" placeholder='enter title' onChange={(e) => { setTitle(e.target.value) }} />
                <input type="text" placeholder='enter body' onChange={(e) => { setBody(e.target.value) }} /> */}
                <input type="text" placeholder='enter userid' onChange={(e) => { setFormdata({...formData, userId:e.target.value}) }} />
            <input type="text" placeholder='enter title' onChange={(e) => { setFormdata({...formData, title:e.target.value}) }} />
            <input type="text" placeholder='enter body' onChange={(e) => { setFormdata({...formData, body:e.target.value}) }} />
                <button onClick={submitData}>Submit data</button>

                {data?.map((item, index) => {
                    return (
                        <div key={index} onClick={() => openModal(item)}>
                            <h1>{item.id}{item.title}</h1>
                        </div>
                    )
                })}

            </div>
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "20px",
                            width: "400px",
                            borderRadius: "10px",
                        }}
                    >
                        <h2>Edit User</h2>

                        <input
                            type="text"
                            value={formData.userId}
                            placeholder="User Id"
                            onChange={(e) =>
                                setFormdata({ ...formData, userId: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            value={formData.title}
                            placeholder="Title"
                            onChange={(e) =>
                                setFormdata({ ...formData, title: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <textarea
                            value={formData.body}
                            placeholder="Body"
                            onChange={(e) =>
                                setFormdata({ ...formData, body: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <button>Update</button>

                        <button onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users
