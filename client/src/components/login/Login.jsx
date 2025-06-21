import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import showPasswordIcon from '../../icons/view.png';
import hidePasswordIcon from '../../icons/hide.png';
import styles from './Login.module.css';

const Login = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const context = useContext(AuthContext);

	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

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

	const validateEmail = () => {
		return EMAIL_REGEX.test(data.email.toLowerCase());
	};

	const validatePassword = () => {
		return PWD_REGEX.test(data.password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setEmailError('');
		setPasswordError('');
		setError('');

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

		try {
			const postData = {
				email: data.email,
				password: data.password,
			};

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
			};
			const response = await axios.post(
				'http://localhost:8000/users/login',
				postData,
				axiosConfig
			);
			context.dispatch({ type: 'SUCCESS', payload: response.data });
			navigate('/');
		} catch (error) {
			context.dispatch({ type: 'ERROR', payload: error.response.data });
			setError(error.response.data);
		}
	};

	const icon = showPassword ? showPasswordIcon : hidePasswordIcon;
	return (
		<div className={styles.LoginContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.dataContainer}>
					<label className={styles.lab}>Email Address </label>
					<input
						autoFocus
						type="email"
						className={styles.input}
						name="email"
						placeholder="Enter your email address"
						value={data.email}
						onChange={onUpdateField}
						required
					/>
					{emailError && <p className={styles.errorMessage}>{emailError}</p>}
					<label className={styles.lab}>Password </label>
					<div className={styles.passwordContainer}>
						<input
							type={showPassword ? 'text ' : 'password'}
							className={styles.input}
							name="password"
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
							Login
						</button>
					</div>
					<div className={styles.login}>
						<label className={styles.lab}>Not registered?</label>
						<Link to="/register">
							<button className={styles.btn}>Register</button>
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

export default Login;
