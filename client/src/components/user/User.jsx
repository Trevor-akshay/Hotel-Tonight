import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './User.css';

const User = () => {
	const [showInfo, setShowInfo] = useState(false);
	const { user, error, dispatch } = useContext(AuthContext);
	useEffect(() => {}, [user]);

	const username = user.Username;

	const navigate = useNavigate();
	return (
		<>
			<div className="user" onClick={() => setShowInfo(!showInfo)}>
				{username}
			</div>
			{showInfo && (
				<div className="sectionContainer">
					<div className="section">
						<div
							className="sectionAction"
							onClick={() => {
								navigate('/change-password');
							}}
						>
							Change Password
						</div>
						<div
							className="sectionAction"
							onClick={() => {
								dispatch({ type: 'LOGOUT' });
							}}
						>
							Log Out
						</div>
					</div>
				</div>
			)}
			{error && <div>{error}</div>}
		</>
	);
};

export default User;
