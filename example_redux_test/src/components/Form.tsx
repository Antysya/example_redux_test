import {Button, Input} from "@chakra-ui/react";
import {addProduct} from "../store/productsSlice";
import {useState} from "react";
import {useAppDispatch} from "../store";

const Form = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState("");

    const handleButtonClick = () => {
        dispatch(addProduct(text));
        setText("");
    }

    return (
        <div className="input">
            <Input
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите название товара"
                value={text}
            />
            <Button colorScheme="blue" onClick={handleButtonClick}>
                Добавить
            </Button>
        </div>
    );
};

export default Form;
