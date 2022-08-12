import React, {useState} from 'react';
import './CardOffer.css';
import {Link} from 'react-router-dom';
import more from '../../../images/more.svg';
import save from "../../../images/icon_guardar.png";
import report from '../../../images/icon_report.svg';
import { useDispatch, useSelector } from 'react-redux';
import { remFavorite, getFavorites } from '../../../Redux/Reducer/reducer';
import {BsBookmarksFill, BsBookmarks} from "react-icons/bs"

const CardOffer = ({props}:any) => {
  
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const favorites = useSelector((state:any) => state.workService.favorites);

  function handleClick() {
    setOpen(!open);
  }

  const addFavorite = (props:any) => {
    if(favorites.includes(props)){
        return dispatch(remFavorite(props));
    }else{
        console.log(props);
        return dispatch(getFavorites(props));
    }
}

  const showFavorite = (props:any) => {
    const favoritesStorage:any = localStorage.getItem("favorites");
    const storageParsed:any = JSON.parse(favoritesStorage);
    const allFavorites = storageParsed?.map((f:any) => {
        if(f?.idOffer === props.idOffer){
            return f
        }
    })
    if(props.idOffer==="1f8p") return;    
    if(allFavorites?.filter((e:any)=>e)[0]?.title === props.title){
        return <BsBookmarksFill className='guardar_icon'/>
    }else{
        return <BsBookmarks className='guardar_icon'/>
    }
}

  return (
    <div className='CardOffer_component'>
      <div className='div_profileSection'>
        <div className='div_infoUser'>
          <div className='Card_divContImageProfile'>
            <img className='Card_profileImage' src={props.userClient?.photo} alt="Client Photo" />
          </div>
          <div className='div_userDatos'>
            <Link to={`/profile/${props.userClientId}`} className='Card_userName'>{props.userClient?.name}</Link>
            <span className='Card_userRating'>Rating: {props.userClient?.rating}</span>
          </div>
        </div>
        <div className='div_cardButton'>
          <button onClick={handleClick} className='cardButton_options'>
            <img className='more' src={more} alt="more" />
          </button>
          {open &&
            <div className='Card_option'>
              <div className='CardOption_divGuardar' onClick={(e) => {addFavorite(props)}}>
                <span className='report_cardButton'>Guardar</span>
                {showFavorite(props)}
                {/*<img className='guardar_icon' src={save} alt="guardar" />*/}
              </div>
              {/* <hr /> */}
              <div className='CardOption_divReport'>
                <span className='report_cardButton'>Reportar</span>
                <img className='report_icon' src={report} alt="report" />
              </div>
            </div>
          }
        </div>
      </div>
      <hr />
      <div className='div_infoWorkSection'>
        <span className='card_title'>{props.title}</span>
        <div className='div_remuneration'>
          <span>ARS </span>
          <span>{`${props.min_remuneration} - ${props.max_remuneration}`}</span>
          <span>$</span>
        </div>
        <div className='div_cardDescription'>
          <p>{props.offer_description}</p>
        </div>
        <div className='card_divTags'>
          <span className='card_tags'>{props.profession?.join(', ')}</span>
        </div>
        <div>
          <Link className='button_details' to={`/detailOffer/${props.idOffer}`}>Ver mas</Link>
        </div>
      </div>
    </div>
  )
}

export default CardOffer