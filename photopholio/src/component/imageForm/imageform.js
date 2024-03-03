import { useRef } from "react";
import style from "./imageform.module.css";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify"; // Import toast
import { useState } from "react";

const ImageForm = ({ setShowImageForm, showImageForm, albumId, setOpenAlbum, updateImage, setUpdateImage,search,setSearch }) => {
    const imageNameRef = useRef(null);
    const imageUrlRef = useRef(null);
   
    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowImageForm(!showImageForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };
        console.log(data);
        const albumRef = doc(db, "album", albumId);
        await updateDoc(albumRef, {
            imageList: arrayUnion(data)
        });
        toast.success("Image Added!"); // Show success toast
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const oldData = {
            name: updateImage.name,
            link: updateImage.link
        };
        const newData = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };
        const albumRef = doc(db, "album", albumId);
        await updateDoc(albumRef, {
            imageList: arrayUnion(newData)
        });
        await updateDoc(albumRef, {
            imageList: arrayRemove(oldData)
        });
        toast.success("Image Updated!"); // Show success toast
        setUpdateImage(null);

        // hide the ImageForm
        setShowImageForm(false);
    };

    const handleClear = (e) => {
        e.preventDefault();
        imageNameRef.current.value = "";
        imageNameRef.current.focus();
        imageUrlRef.current.value = "";
    };

    const handleBack = (e) => {
        e.preventDefault();
        setOpenAlbum({ albumId: "", show: false });
    };

    return (
        <>
     
            <div className={style.container}>
                <form className={style.form}>
                    <button className={style.button} onClick={handleBack}>Back</button>
                    <input placeholder="     SEARCH IMAGE"
                    onChange={((e)=>setSearch(e.target.value))}
                    />
                    <button className={style.button} onClick={handleButtonClick} style={{ backgroundColor: showImageForm ? "red" : "#008080" }}>
                        {!showImageForm ? "Add Image" : "Cancel"}
                    </button>
                </form>
            </div>
            {showImageForm ?
                <form onSubmit={updateImage ? handleUpdate : handleSubmit}>
                    <div className={style.addImage}>
                        <div className={style.addImageInput}>
                            <input placeholder="     Enter Name" ref={imageNameRef} />
                            <input placeholder="     Enter Url" ref={imageUrlRef} />
                        </div>
                        <div className={style.addImageButton}>
                            <button>{updateImage ? "Update" : "Add"}</button>
                            <button onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                </form> : ""}
                
        </>
    );
};

export default ImageForm;
