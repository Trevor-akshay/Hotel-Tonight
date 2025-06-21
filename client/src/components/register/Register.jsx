import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import showPasswordIcon from '../../icons/view.png';
import hidePasswordIcon from '../../icons/hide.png';

import styles from './Register.module.css';
const Register = () => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

	const onUpdateField = (e) => {
		const nextDataState = {
			...data,
			[e.target.name]: e.target.value,
		};
		setData(nextDataState);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setEmailError('');
		setPasswordError('');
		setConfirmPasswordError('');
		setError('');
		if (!validateName()) {
			setNameError('Name should be more than two characters');
			return;
		}

		if (!validateEmail(data.email)) {
			setEmailError('Enter a valid email');
			return;
		}
		if (!validatePassword(data.password)) {
			setPasswordError(
				'Password should contain at least 8 characters, one capital letter and a special character among (!@#$%)'
			);
			return;
		}
		if (!validatePasswordMatch()) {
			setConfirmPasswordError('Password should Match');
			return;
		}
		try {
			const postData = {
				name: data.name,
				email: data.email,
				password: data.password,
			};

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
			};
			await axios.post(
				'http://localhost:8000/users/signup',
				postData,
				axiosConfig
			);
			navigate('/login');
		} catch (error) {
			setError(error.response.data);
		}
	};

	const validateName = () => {
		return data.name.length >= 3;
	};

	const validateEmail = () => {
		return EMAIL_REGEX.test(data.email.toLowerCase());
	};

	const validatePassword = () => {
		return PWD_REGEX.test(data.password);
	};

	const validatePasswordMatch = () => {
		return data.password === data.confirmPassword;
	};

	const icon = showPassword ? showPasswordIcon : hidePasswordIcon;
	const confirmIcon = showConfirmPassword ? showPasswordIcon : hidePasswordIcon;

	return (
		<div className={styles.registerContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.dataContainer}>
					<label className={styles.lab}>Name </label>
					<input
						autoFocus
						type="text"
						className={styles.input}
						name="name"
						autoComplete="new-password"
						placeholder="Enter your name"
						value={data.name}
						onChange={onUpdateField}
						required
					/>
					{nameError && <p className={styles.errorMessage}>{nameError}</p>}
					<label className={styles.lab}>Email Address </label>
					<input
						type="email"
						className={styles.input}
						name="email"
						autoComplete="new-password"
						placeholder="Enter your email address"
						value={data.email}
						onChange={onUpdateField}
						required
					/>
					{emailError && <p className={styles.errorMessage}>{emailError}</p>}
					<label className={styles.lab}>Password </label>
					<div className={styles.passwordContainer}>
						<input
							type={showPassword ? 'text' : 'password'}
							className={styles.input}
							name="password"
							autoComplete="xyz"
							placeholder="Enter your password"
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
					<label className={styles.lab}>Confirm Password</label>
					<div className={styles.passwordContainer}>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							className={styles.input}
							name="confirmPassword"
							placeholder="Enter your password"
							autoComplete="xyz"
							value={data.confirmPassword}
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
					{confirmPasswordError && (
						<p className={styles.errorMessage}>{confirmPasswordError}</p>
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
							Register
						</button>
					</div>
					<div className={styles.login}>
						<label className={styles.lab}>Already registered?</label>
						<Link to="/login">
							<button className={styles.btn}>Login</button>
						</Link>
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

export default Register;
