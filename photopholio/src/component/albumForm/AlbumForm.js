import { useRef } from "react";
import "./AlbumForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore"; 
import { useState } from "react";

const AlbumForm = () => {
    const nameRef = useRef(null);

    const clear = (e) => {
        e.preventDefault();
        nameRef.current.value = "";
        nameRef.current.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const docRef = await addDoc(collection(db, "album"), {
                Albumname: nameRef.current.value,
                imageList: []
            });

            console.log("Document written with ID: ", docRef.id);
            toast.success("New Album added!.");
            
            nameRef.current.value = "";
            nameRef.current.focus();
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error adding album. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="form">
                <h1><i>Create Your Album</i></h1>
                <form className="realForm" onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        required
                        ref={nameRef}
                    />
                    <button onClick={clear}>Clear</button>
                    <button type="submit">Add</button>
                </form>
            </div>
        </>
    );
};

export default AlbumForm;
