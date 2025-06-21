import { Link, useNavigate } from 'react-router-dom';
import './searchItem.css';

const SearchItem = ({ hotel }) => {
	const navigate = useNavigate();
	return (
		<div className="searchItem">
			<Link to={`/hotels/${hotel._id}`}>
				<img src={hotel.photos[0]} alt="logo" className="siImg" />
			</Link>
			<div className="siDesc">
				<Link to={`/hotels/${hotel._id}`} style={{ textDecoration: 'none' }}>
					<h1 className="siTitle">{hotel.name}</h1>
				</Link>
				<span className="siDistance">500m from center</span>
				<span className="siFeatures">{hotel.description}</span>
				<span className="siCancelOp">Free cancellation </span>
				<span className="siCancelOpSubtitle">
					You can cancel later, so lock in this great price today!
				</span>
			</div>
			<div className="siDetails">
				<div className="siRating">
					<span>{hotel.rating > 7.5 ? 'Excellent' : 'Average'}</span>
					<button>{hotel.rating}</button>
				</div>
				<div className="siDetailTexts">
					<span className="siPrice">${hotel.price}</span>
					<span className="siTaxOp">Includes taxes and fees</span>
					<Link to={`/hotels/${hotel._id}`}>
						<button className="siCheckButton">See availability</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchItem;
