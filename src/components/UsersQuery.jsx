import React, { useState } from "react";
import { useFetchPosts, useAddPost, useUpdatePost } from "../components/Action";

function UsersAxios() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        userId: "",
        title: "",
        body: "",
    });

    const { data, isLoading } = useFetchPosts();
    const { mutate, isPending } = useAddPost();
    const { mutate: updatePost } = useUpdatePost();

    const submitData = () => {
        mutate(formData);

        setFormData({
            userId: "",
            title: "",
            body: "",
        });
    };

    const openModal = (item) => {
        setSelectedId(item.id);
        setFormData({
            userId: item.userId,
            title: item.title,
            body: item.body,
        });
        console.log("item ...........", item)
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        console.log("iddddddd", selectedId)
        updatePost({
            id: selectedId,
            postData: formData
        });
    }

    if (isLoading) return <h2>Loading...</h2>;

    return (
        <>
            <input
                value={formData.userId}
                onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                }
            />

            <input
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />

            <input
                value={formData.body}
                onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                }
            />

            <button onClick={submitData} disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>

            {data.map((item) => (
                <div key={item.id} onClick={() => openModal(item)}>
                    <h3>
                        {item.id} - {item.title}
                    </h3>
                </div>
            ))}

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
                                setFormData({ ...formData, userId: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            value={formData.title}
                            placeholder="Title"
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <textarea
                            value={formData.body}
                            placeholder="Body"
                            onChange={(e) =>
                                setFormData({ ...formData, body: e.target.value })
                            }
                        />

                        <br />
                        <br />

                        <button onClick={() => { handleUpdate() }}>Update</button>

                        <button onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}

export default UsersAxios;