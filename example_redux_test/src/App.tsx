import "./App.css";
import ListProducts from "./components/ListProducts";
import Form from "./components/Form";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { getProducts } from "./store/productsSlice";
import { Alert, AlertDescription, AlertTitle, Button, Input, Select, Table, TableCaption, Tbody, Td, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import { setItemsPerPage } from "./store/settingsSlice";
import axios from 'axios'

type Post = {
  title:string;
  body: string;
  userId:1;
  id: number;
} 

function App() {
  const [posts, setPosts] = useState(Array<Post>);
  const [count, setCountPosts] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const handleChangeBody = (event) => {
    setBody(event.target.value);
  };
  const handleChange = (event) => {
    setCountPosts(event.target.value);
    setCurrentPage(1);
  };

  const getPosts=()=> {  
    axios.get("https://jsonplaceholder.typicode.com/posts",{
      params: {
        _limit:{count},
        _page: currentPage  
      }
    }).then((resp)=>{
      console.log(resp);
    }).catch(()=>{
      console.log('some error occured during get');
    })
    .finally(()=>{
      console.log('some needed actions in this code block...');
    });
  };

const savePost=()=>{
  axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body,
        userId: 1,
      })
      .then((response) => {
        setPosts([
          {
            title: response.data.title,
            body: response.data.body,
            userId: response.data.userId,
            id: response.data.id,
          },
          ...posts,
        ]);
        setTitle("");
        setBody("");
        setCurrentPage(1);
      })
      .catch((error) => {
        console.log(error);
      });

};

useEffect(getPosts,[count, currentPage]);

  return(
    <>
    <h1>Axios example</h1>
    <form>
      <Input 
        value={title} 
        onChange={handleChangeTitle} 
        placeholder="Заголовок" 
        mb={4} 
      />
      <Textarea 
        value={body} 
        onChange={handleChangeBody} 
        placeholder="Введите Ваш пост" 
        mb={4} 
      />
      <Button type="button" onClick={savePost} colorScheme="blue">
        Добавить пост
      </Button>
    </form>
      <Table variant="simple">
        <TableCaption>Список постов</TableCaption>
        <Thead>
          <Tr>
            <Th>Заголовок</Th>
            <Th>Тело</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr key={post.id}>
              <Td>{post.title}</Td>
              <Td>{post.body}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div>
      <select value={count} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <p>Выбрано {count} постов</p>
    </div>
    <div>
      <Button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Предыдущая</Button>
      <Button onClick={() => setCurrentPage(prev => prev + 1)}>Следующая</Button>
      <p>Текущая страница: {currentPage}</p>
    </div>
    </>
  );

  
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