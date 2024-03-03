// ImageList.js

import { useState, useEffect } from "react";
import Image from "../image/image";
import ImageForm from "../imageForm/imageform";
import style from "./imagelist.module.css";
import { db } from "../../firebaseInit";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";

const ImageList = ({ openAlbum, setOpenAlbum }) => {
   
    const [showImageForm, setShowImageForm] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [updateImage, setUpdateImage] = useState(null);
    const[search,setSearch]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
            const data = doc.data().imageList;
            setImageList(data);
        });
        return unsub; // Cleanup function
    }, [openAlbum.albumId]);

    async function handleImageDelete(image) {
        const albumRef = doc(db, "album", openAlbum.albumId);
        await updateDoc(albumRef, {
            imageList: arrayRemove(image)
        });
    }

    function handleImageUpdate(image) {
        setUpdateImage(image);
        setShowImageForm(true);
    }

    function openLightBox(index) {
        setCurrentImageIndex(index);
        setIsOpen(true);
    }

    function closeLightbox() {
        setIsOpen(false);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <ImageForm
                setShowImageForm={setShowImageForm}
                showImageForm={showImageForm}
                albumId={openAlbum.albumId}
                setOpenAlbum={setOpenAlbum}
                openAlbum={openAlbum}
                setUpdateImage={setUpdateImage}
                updateImage={updateImage}
                search={search}
                setSearch={setSearch}
            />
            <h1 className={style.imageCollection}>
                <i><b>{imageList.length !== 0 ? "Your Collection" : "No Images in Your Collection"}</b></i>
            </h1>
            <div className={style.imageList}>

           {imageList.filter((image)=>{
            return search.toLocaleLowerCase()==''?image:image.name.toLocaleLowerCase().includes(search);
           }).map((image, i) => (
                    <Image
                        key={i}
                        index={i}
                        image={image}
                        handleImageDelete={handleImageDelete}
                        handleImageUpdate={handleImageUpdate}
                        openLightBox={openLightBox}
                    />
                ))}
            </div>
            {isOpen && (
                <div className="lightbox-overlay"onClick={closeLightbox}>
                    <div className="lightbox-container">
                        <button className="close-button" onClick={closeLightbox}>
                            Close
                        </button>
                        <img
                            className="lightbox-image"
                            src={imageList[currentImageIndex].link}
                            alt={`Image ${currentImageIndex}`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageList;
