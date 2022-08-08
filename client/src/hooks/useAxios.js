import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
  const [data, setData] = useState([]);
	const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
	useEffect(() => {
    setLoading(true);
		const getData = async () => {
      try {
        const data = await axios.get(url);
        setData(data.data);
      } catch (error) {
        setError(error);
      }
			setLoading(false);
		};
		getData();
	},[url]);

	const reFetch = async () => {
		setLoading(true);
		try {
      const data = await axios.get(url);
      setData(data.data);
    } catch (error) {
      setError(error);
    }
		setLoading(false);
  };
  
  return { data, loading, error, reFetch };
};

export default useAxios;
