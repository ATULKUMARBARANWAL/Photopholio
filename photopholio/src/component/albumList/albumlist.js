import AlbumForm from "../albumForm/AlbumForm.js";
import styles from "./albumlist.module.css";
import { useEffect, useState } from "react";
import { db } from "../../firebaseInit.js";
import Album from "../album/album.js"
import { collection, onSnapshot } from "firebase/firestore";
import ImageList from "../imageList/imagelist.js"

const AlbumList = () => {
    const [albumList, setAlbumList] = useState([]);
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

    useEffect(() => {
        const unSub = onSnapshot(collection(db, "album"), (snapShot) => {
            const card = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbumList(card);
        });
        return () => unSub();
    }, []);

    return (
        <>
            {!openAlbum.open ? (
                <div>
                  
                    <div className={styles.first}>
                        <h1><b><i>Your Albums</i></b></h1> 
                         {showAlbumForm && <AlbumForm />}
                        <button
                            style={{backgroundColor: showAlbumForm ? "red" : "#75A99C" }}
                            onClick={() => setShowAlbumForm(!showAlbumForm)}
                        >
                            {showAlbumForm ? "Cancel" : "Add album"}
                        </button>
                    </div>
                    <div className={styles.albumContainer}>
                       {albumList.map((card, i) => (
                           <Album key={i} info={card} setOpenAlbum={setOpenAlbum} />
                       ))}
                    </div>
                </div>
            ) : (
                <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
            )}
        </>
    );
};

export default AlbumList;
