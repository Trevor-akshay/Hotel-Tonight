import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import User from '../user/User';
import './navbar.css';

const Navbar = () => {
	const { user } = useContext(AuthContext);
	useEffect(() => {}, [user]);
	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/" className="nav">
					<span className="logo">Hotel Tonight</span>
				</Link>
				<div className="navItems">
					{user !== null ? (
						<User />
					) : (
						<>
							<Link to="/register">
								<button className="navButton">Register</button>
							</Link>
							<Link to="/login">
								<button className="navButton">Login</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
