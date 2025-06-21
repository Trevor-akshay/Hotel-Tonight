import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import showPasswordIcon from '../../icons/view.png';
import hidePasswordIcon from '../../icons/hide.png';

import styles from './ChangePassword.module.css';

const ChangePassword = () => {
	const [data, setData] = useState({
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});
	const { user } = useContext(AuthContext);

	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [newPasswordError, setNewPasswordError] = useState('');
	const [changePasswordError, setChangePasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

	const onUpdateField = (e) => {
		const nextDataState = {
			...data,
			[e.target.name]: e.target.value,
		};
		setData(nextDataState);
	};

	const validatePassword = (password) => {
		return PWD_REGEX.test(password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPasswordError('');
		setNewPasswordError('');
		setChangePasswordError('');
		setError('');

		if (!validatePassword(data.password)) {
			setPasswordError(
				'Password should contain at least 8 characters, one capital letter and a special character among (!@#$%)'
			);
			return;
		}
		if (!validatePassword(data.newPassword)) {
			setNewPasswordError(
				'Password should contain at least 8 characters, one capital letter and a special character among (!@#$%)'
			);
			return;
		}
		if (!validatePassword(data.confirmNewPassword)) {
			setChangePasswordError(
				'Password should contain at least 8 characters, one capital letter and a special character among (!@#$%)'
			);
			return;
		}
		if (data.newPassword === data.password) {
			setError('Current and New password must be different');
			return;
		}
		if (data.newPassword !== data.confirmNewPassword) {
			setError('New and Confirm New password must be Equal');
			return;
		}
		try {
			const postData = {
				email: user?.Email,
				password: data.password,
				newPassword: data.newPassword,
				confirmNewPassword: data.confirmNewPassword,
			};
			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
			};
			const response = await axios.post(
				'http://localhost:8000/users/changepassword',
				postData,
				axiosConfig
			);
			window.alert('Success');
			console.log(response);
			navigate('/');
		} catch (error) {
			setError(error.response.data);
		}
	};

	const icon = showPassword ? showPasswordIcon : hidePasswordIcon;
	const newIcon = showNewPassword ? showPasswordIcon : hidePasswordIcon;
	const confirmIcon = showConfirmPassword ? showPasswordIcon : hidePasswordIcon;

	return (
		<div className={styles.ChangePasswordContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.dataContainer}>
					<label className={styles.lab}>Current Password</label>
					<div className="passwordContainer">
						<input
							autoFocus
							type={showPassword ? 'text' : 'password'}
							className={styles.input}
							name="password"
							placeholder="Enter your current password"
							value={data.password}
							onChange={onUpdateField}
							required
						/>
						<img
							className={styles.psdImage}
							src={icon}
							alt="passwordShowHideIcon"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						/>
					</div>
					{passwordError && (
						<p className={styles.errorMessage}>{passwordError}</p>
					)}
					<label className="lab">Change Password </label>
					<div className={styles.passwordContainer}>
						<input
							type={showNewPassword ? 'text' : 'password'}
							className={styles.input}
							name="newPassword"
							placeholder="Enter your new password"
							value={data.newPassword}
							onChange={onUpdateField}
							required
						/>
						<img
							className={styles.psdImage}
							src={newIcon}
							alt="passwordShowHideIcon"
							onClick={() => {
								setShowNewPassword(!showNewPassword);
							}}
						/>
					</div>
					{newPasswordError && (
						<p className={styles.errorMessage}>{newPasswordError}</p>
					)}
					<label className={styles.lab}>Confirm Password </label>
					<div className={styles.passwordContainer}>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							className={styles.input}
							name="confirmNewPassword"
							placeholder="Enter your password again"
							value={data.confirmNewPassword}
							onChange={onUpdateField}
							required
						/>
						<img
							className={styles.psdImage}
							src={confirmIcon}
							alt="passwordShowHideIcon"
							onClick={() => {
								setShowConfirmPassword(!showConfirmPassword);
							}}
						/>
					</div>
					{changePasswordError && (
						<p className={styles.errorMessage}>{changePasswordError}</p>
					)}
					<div className={styles.buttonContainer}>
						<button
							className={styles.btn}
							onClick={() => {
								navigate('/');
							}}
						>
							Cancel
						</button>
						<button className={styles.btn} type="submit">
							Confirm
						</button>
					</div>
					{error && <p className={styles.errorMessage}>{error}</p>}
					<div className={styles.footer}>
						Hotel Tonight All Rights Reserved.
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
