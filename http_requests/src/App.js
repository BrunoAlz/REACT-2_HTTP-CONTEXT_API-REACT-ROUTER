import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products/";

function App() {
  const inputName = useRef(null);
  useEffect(() => {
    inputName.current.focus();
  }, []);

  const [products, setProducts] = useState([]);

  const { data: items } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Listando produtos - Requisição GET
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(url);

  //     const data = await response.json();

  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  // Adicionando produtos - Requisição POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      description,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // Exibição dinâmica dos dados Adicionandos no POST
    // Pega o produto do response do POST
    const addedProduct = await response.json();
    // Desempacota os Produtos anteriores, e Adiciona o novo no State
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    // Limpa os inputs
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              ref={inputName}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
