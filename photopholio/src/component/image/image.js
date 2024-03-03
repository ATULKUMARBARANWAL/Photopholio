// image.js
import style from "./image.module.css";

function Image({ image, index, handleImageDelete, handleImageUpdate, openLightBox }) {
    return (
        <div className={style.imageCard}>
            <div className={style.imageBox} onClick={() => openLightBox(index)}>
                <img src={image.link} alt="image" />
            </div>
            {image.name}
            <button onClick={() => handleImageDelete(image)}>
                Delete
            </button>
            <button onClick={() => handleImageUpdate(image)}>
                Edit
            </button>
        </div>
    );
}

export default Image;
