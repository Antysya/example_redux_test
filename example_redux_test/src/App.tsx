import "./App.css";
import ListProducts from "./components/ListProducts";
import Form from "./components/Form";

function App() {
  return (
    <div className="container">
      <h1>Список покупок</h1>
      <Form />
      <ListProducts />
    </div>
  );
}

export default App;
