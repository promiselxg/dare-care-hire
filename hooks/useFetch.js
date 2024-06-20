import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const API_URL = "/api";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const uniqueUrl = `${API_URL}${url}`;
        const res = await axios.get(uniqueUrl, {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
