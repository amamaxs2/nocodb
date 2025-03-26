import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "xc-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBzYWx0c3lzdGVtcy5jb20uYnIiLCJpZCI6InVzdWlubnRucnhiNXpsdGoiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yIiwidG9rZW5fdmVyc2lvbiI6IjgwNmIwOGU5YjNiY2QxMWMwZGYxNGNlN2Q2ZjEyNzdmY2RjMTM3MjBlZDE5NzEzNDBhMzVhYjY1YTdlNmMyYjEzYjUyZTlhNTBkYjk1YzJlIiwiaWF0IjoxNzQzMDE3MjM1LCJleHAiOjE3NDMwNTMyMzV9.z7NyZSBgZb6wdaNmk6gJlM_WVUtqBuJJ5o8A1LE-GN0",
          },
        });

        console.log("Dados da API:", response.data); // 

        if (response.data && response.data.list) {
          setData(response.data.list);
        } else if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.warn("Estrutura inesperada:", response.data);
          setData([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
