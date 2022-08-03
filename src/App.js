import { useState } from "react";
import { getTestData } from "./apis/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  async function getTest() {
    let res = await getTestData();
    setProducts(res);
    console.log(res);
  }

  return (
    <div className="App" onClick={getTest}>
      click me
      {products.map((product) => (
        <div key={product._id}>
          <h2>title: {product.title}</h2>
          <h2>description: {product.description}</h2>
          <h2>price: {product.price}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
