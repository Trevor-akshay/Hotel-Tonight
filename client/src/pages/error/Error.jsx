import { Link } from 'react-router-dom';
import './error.css';

const ErrorPage = () => {
	return (
		<div className="errorContainer">
			<div className="error">
				<div className="text">404 Page not found.</div>
				<Link to="/">
					<button className="btn">Go Back to the Home Page</button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
