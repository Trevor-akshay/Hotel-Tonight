import { useState, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Reserve from '../../components/reserve/Reserve';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleArrowLeft,
	faCircleArrowRight,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

import './hotel.css';
const Hotel = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const id = location?.pathname?.split('/')[2];
	const url = `https://hotel-tonight.onrender.com/hotels/${id}`;
	const { data, loading, error } = useAxios(url);
	const [slideNumber, setSlideNumber] = useState(0);
	const [showReserve, setShowReserve] = useState(false);

	const { user } = useContext(AuthContext);
	const photos = [
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
		},
	];

	const handleMove = (direction) => {
		let newSlideNumber;

		if (direction === 'l') {
			newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
		} else {
			newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
		}

		setSlideNumber(newSlideNumber);
	};

	const handleClick = () => {
		console.log(user);
		if (user === null) {
			navigate('/login');
		} else {
			setShowReserve(true);
		}
	};

	return (
		<div>
			<Navbar />
			{loading ? (
				'loading'
			) : (
				<>
					<Header type="list" />
					<div className="hotelWrapper">
						<button
							className="bookNow"
							type="button"
							onClick={() => handleClick()}
						>
							Reserve or Book Now!
						</button>
						<h1 className="hotelTitle">{data[0].name}</h1>
						<div className="hotelAddress">
							<FontAwesomeIcon icon={faLocationDot} />
							<span>{data[0].address}</span>
						</div>
						<span className="hotelDistance">
							Excellent location – 500m from center
						</span>
						<span className="hotelPriceHighlight">
							Book a stay over ${data[0].price} at this property.
						</span>
					</div>
					<div className="hotelContainer">
						<div className="slider">
							<FontAwesomeIcon
								icon={faCircleArrowLeft}
								className="arrow"
								onClick={() => handleMove('l')}
							/>
							<div className="sliderWrapper">
								<img
									src={photos[slideNumber].src}
									alt=""
									className="sliderImg"
								/>
							</div>
							<FontAwesomeIcon
								icon={faCircleArrowRight}
								className="arrow"
								onClick={() => handleMove('r')}
							/>
						</div>
					</div>
					<div className="hotelWrapper">
						<div className="hotelDetails">
							<div className="hotelDetailsTexts">
								<h1 className="hotelTitle">Stay in the heart of City</h1>
								<p className="hotelDesc">{data[0].description}</p>
							</div>
							<div className="hotelDetailsPrice">
								<h1>Perfect for an awesome stay!</h1>
								<span>
									Located in the real heart of {data[0].city}, this property has
									an
									{data[0].rating > 7 ? 'excellent' : 'average'} location score
									of {data[0].rating}!
								</span>
								<h2>
									<b>${data[0].price}</b>
								</h2>
								<button
									onClick={() => {
										handleClick();
									}}
								>
									Reserve or Book Now!
								</button>
							</div>
						</div>
					</div>
					<MailList />
					<br></br>
					<Footer />
					{showReserve && <Reserve />}
				</>
			)}
		</div>
	);
};

export default Hotel;
