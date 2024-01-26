import "./App.css";
import ListProducts from "./components/ListProducts";
import Form from "./components/Form";
import Alert from "./components/Alert";
import { Button } from "@chakra-ui/react";
import Icon from "./components/Icon";

function App() {
  return (
    <div className="container">
      <Alert
        color="warning"
        header="some value"
        icon={<Icon iconName="info" />}
      >
        <>This is some content of component</>
        <Button>text</Button>
      </Alert>
      <h1>Список покупок</h1>
      <Form />
      <ListProducts />
    </div>
  );
}



export default App;