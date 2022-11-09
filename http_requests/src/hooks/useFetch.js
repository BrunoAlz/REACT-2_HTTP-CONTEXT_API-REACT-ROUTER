import { useState, useEffect } from "react";

// Criando um Custo Hook para fazer o fetch dos dados
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // Refatorando o POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // Criando estado de Load
  const [loading, setLoading] = useState(false);

  // Tratando Erros
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // estado de load
      setLoading(true);

      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {

        setError("Houve algum erro ao carregar os dados!");
        
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // Refatorando o POST
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];

        const response = await fetch(...fetchOptions);

        const json = await response.json();

        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
