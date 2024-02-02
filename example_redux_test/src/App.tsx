import "./App.css";
import ListProducts from "./components/ListProducts";
import Form from "./components/Form";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";
import Loader from "./components/Loader";
import { getProducts } from "./store/productsSlice";
import { Alert, AlertDescription, AlertTitle, Select } from "@chakra-ui/react";
import { setItemsPerPage } from "./store/settingsSlice";

function App() {  
  const dispatch = useAppDispatch();  
  const { isLoading, error } = useAppSelector((s) => s.products);
  const { itemsPerPage } = useAppSelector((s) => s.settings);
  const handleSelect = (event) => {    
      dispatch(setItemsPerPage(event.target.value));
        };  
      useEffect(() => { 
        dispatch(getProducts());
      }, [dispatch, itemsPerPage]);  
  return (    
    <div className="container">      
      <h1>Список покупок</h1>      
      <Form />      
      {error && (        
      <Alert status="error">  
        <AlertTitle>Error</AlertTitle>          
        <AlertDescription>{error}</AlertDescription>        
      </Alert>      
    )}      
      {isLoading && !error ? <Loader /> : <ListProducts />}
      <Select        
          placeholder="Количество продуктов на странице"        
          onChange={handleSelect}      
          >        
          <option value="5">5</option>        
          <option value="10">10</option>        
          <option value="15">15</option>        
          <option value="30">30</option>      
      </Select>    
    </div>  
);}
export default App;