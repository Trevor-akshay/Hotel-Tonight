import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import ChangePassword from './components/changePassword/ChangePassword';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Error from './pages/error/Error';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="change-password" element={<ChangePassword />} />
				<Route path="/header" element={<Header />} />
				<Route path="/hotels" element={<List />} />
				<Route path="/hotels/:id" element={<Hotel />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
