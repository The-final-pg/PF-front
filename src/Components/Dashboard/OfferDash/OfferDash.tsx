import React, {useState ,useEffect} from 'react'
import './OfferDash.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOffers, getUserById, isActiveFalseOfferPost, isActiveOffer} from "../../../Redux/Reducer/reducer";


function OfferDash() {

	const dispatch = useDispatch();

	const offers = useSelector((state:any) => state.workService.offers);

	const [modalEdit, setModalEdit] = useState(false)
	const [modalDelete, setModalDelete] = useState(false)

	const [dataOffer, setDataOffer] = useState<any>({})

	useEffect(() => {
		dispatch(getOffers());
	  }, [dataOffer])

	function handleModalEdit(offers:any) {
		setModalEdit(true)
		setDataOffer(offers)
	}


	function handleModalEditClose() {
		setModalEdit(false)
	}


	function handleModalDelete(offers:any) {
		setModalDelete(true)
		setDataOffer(offers)
	}


	const [offerState, setOfferState] = useState(true)

	function handleSelect( e: any) {

		const select = e.target.value

		let isSet: boolean = true;
		 
		if (select.toLowerCase() === 'true') {
			isSet = true;
		}
		 
		if (select.toLowerCase() === 'false') {
			isSet = false;
		}		

		setOfferState(isSet)
	}

	function handleOnClick() {
		let id = dataOffer.idOffer
		console.log(id)
		let isActive = offerState
		isActiveOffer(id , isActive)
		.then(()=> {
			dispatch(getOffers())
		  })
	}


  return (
    <div className='OfferDash_Component'>
        <div className='OfferDash_divContent'>

					{
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>Id de la publicacion: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.idOffer}</span>
									</div>
									
									<div>
										<p className='OfferDash_divModalTitle'>Dueño de la publicacion: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.userClient.name} </span>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.userClient.lastName}</span>
									</div>

									<div>
										<p className='OfferDash_divModalTitle'>estado actual: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.isActive === false ? "Cerrada" : "Abierta"}</span>
									</div>
								</div>

								<hr className='OfferDash_hr' />

								<div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Actualiza el estado</label>

									<select onChange={handleSelect}>
										<option value="true">Abierta</option>
										<option value="false">Cerrada</option>
									</select>

								</div>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={handleOnClick}>guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalEditClose}>cancelar</button>
							</div>
						</div>
					}

					{
						modalDelete &&
						<div className='OfferDash_Modal'>
							<div className='OfferDash_modalDeleteText'>
								<p className='OfferDash_divModalTitle'>Estas seguro que deseas borrar la oferta con el id:</p>
								<span className='OfferDash_MOdalTextInfo'>{dataOffer.idOffer}</span>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk'>si</button>
								<button className='OfferDash_modalCancelar' onClick={() => setModalDelete(false)}>cancelar</button>
							</div>
						</div>
					}

					<table className='OfferDash_divMap'>
						<thead >
							<tr>
								<th>Dueño</th>
								<th>Id</th>
								<th>Fecha</th>
								<th>Estado</th>
								<th>Mas</th>
							</tr>
						</thead>
						<tbody className='OfferDash_tableBody'>
							{offers.map((offer:any, i:any) => {
								return (
									<tr className='OfferDash_divOffer' key={i}>

										<td className='OfferDash_divCardOffer'>
											<div className='OfferDash_divUserInfo'>
												<span className='OfferDash_userName'>{offer.userClient.name} </span>
												<span className='OfferDash_userName'>{offer.userClient.lastName}</span>
											</div>
										</td>

										<td className='OfferDash_divUserMail'>
											{offer.idOffer}
										</td>
										
										<td>
											{offer.post_date.slice(0,10)}
										</td>

										<td>
											{offer.isActive === false ? "Cerrada" : "Abierta"}
										</td>

										{/* <td>
											<button className='OfferDash_moreButton'><img className='OfferDash_more' src={more} alt="" /></button>
										</td> */}
										
										<td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' onClick={() => handleModalEdit(offers[i])}>Editar</button>
											<button className='OfferDash_deleteButton' onClick={() => handleModalDelete(offers[i])}>Eliminar</button>
										</td>

									</tr>
								)
							})}
						</tbody>
					</table>

        </div>
    </div>
  )
}

export default OfferDash