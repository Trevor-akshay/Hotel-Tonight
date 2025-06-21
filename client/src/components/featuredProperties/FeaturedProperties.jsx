import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import './featuredProperties.css';
const FeaturedProperties = () => {
	const url = 'http://localhost:8000/hotels/getfeatured';
	const { data, loading, error } = useAxios(url);
	return (
		<div className="fp">
			{loading ? (
				'loading'
			) : (
				<>
					{data.map((item) => {
						return (
							<Link to={`/hotels/${item._id}`} className="link" key={item._id}>
							<div
								className="fpItem"
							>
								<img src={item.photos[0]} alt="logo" className="fpImg" />
								<span className="fpName">{item.name}</span>
								<span className="fpCity">{item.city}</span>
								<div className="fpRating">
									<span>{item.description}</span>
								</div>
							</div>
							</Link>
						);
					})}
				</>
			)}
		</div>
	);
};

export default FeaturedProperties;
