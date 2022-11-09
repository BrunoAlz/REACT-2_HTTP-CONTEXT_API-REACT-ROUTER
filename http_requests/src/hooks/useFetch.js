import { useState, useEffect } from "react";

// Criando um Custo Hook para fazer o fetch dos dados
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);

      const jsonData = await response.json();

      setData(jsonData);
    };

    fetchData();
  }, [url]);

  return { data };
};
