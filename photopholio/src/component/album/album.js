
import style from "./album.module.css"
export default function Album({info,setOpenAlbum})
{
function handleClick(){
    setOpenAlbum({albumId:info.id,open:true})
}

return(<>
<div className={style.cardContainer}>
<div className={style.cardImage} onClick={handleClick}>

</div>
<div className={style.cardName}>
                    {info.Albumname}
                </div>
</div>
</>)
}

