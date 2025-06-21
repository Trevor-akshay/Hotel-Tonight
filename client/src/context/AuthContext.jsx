import { useEffect } from 'react';
import { useReducer, createContext } from 'react';

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')),
	loading: false,
	error: undefined,
};

export const AuthContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return {
				user: action.payload,
				loading: false,
				error: undefined,
			};
		case 'LOADING':
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case 'ERROR':
			return {
				...state,
				error: action.payload,
			};
		case 'LOGOUT': {
			localStorage.removeItem('user');
			window.location.reload();
			return INITIAL_STATE;
		}
		default: {
			return state;
		}
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
