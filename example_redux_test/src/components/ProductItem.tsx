import { Button, ListItem } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../store";
import { deleteProduct, markProductAsBuy } from "../store/productsSlice";

interface IProps {
  name: string;
  id: string;
  isBuy: boolean;
}

const ProductItem: React.FC<IProps> = ({ name, isBuy, id }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="itemContainer">
      <ListItem className={classNames("listItem", isBuy && "isBuyStyle")}>
        {name}
      </ListItem>
      <div className="buttons">
        <Button onClick={()=> dispatch(markProductAsBuy(id))} size='sm' colorScheme={isBuy ? "gray":"green"}>{isBuy ? "Вернуть" :" Купил "}</Button>
        <Button onClick={()=> dispatch(deleteProduct(id))} size='sm' colorScheme="red">Удалить</Button>
      </div>
    </div>
  );
};

export default ProductItem;
