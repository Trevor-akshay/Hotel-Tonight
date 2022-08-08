import './featured.css';
import useAxios from '../../hooks/useAxios';

const Featured = () => {
	const url = 'http://localhost:8000/hotels?cities=Delhi,Bangalore,Mumbai';

	const { data, error, loading } = useAxios(url);

	return (
		<div className="featured">
			{loading ? (
				'please wait loading'
			) : (
				<>
						<div className="featuredItem">
						<div className="overlay"></div>
						<img
							src="https://t-cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
							alt="Delhi"
							className="featuredImg"
						/>
						<div className="featuredTitles">
							<h1>Delhi</h1>
							<h2>{data[0]} properties</h2>
						</div>
					</div>

					<div className="featuredItem">
						<img
							src="https://t-cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
							alt="Bangalore"
							className="featuredImg"
						/>
						<div className="featuredTitles">
							<h1>Bangalore</h1>
							<h2>{data[1]} properties</h2>
						</div>
					</div>
					<div className="featuredItem">
						<img
							src="https://t-cf.bstatic.com/xdata/images/city/square250/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
							alt="Mumbai"
							className="featuredImg"
						/>
						<div className="featuredTitles">
							<h1>Mumbai</h1>
							<h2>{data[2]} properties</h2>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Featured;
