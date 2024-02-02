import { UnorderedList } from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import {useAppSelector} from "../store";
import React from "react";

const ListProducts = () => {
  const products = useAppSelector((state) => state.products.products);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
      setCurrentPage(newPage);
    };
  
    const handlePageSizeChange = (newPageSize: React.SetStateAction<number>) => {
      setPageSize(newPageSize);
    };

  return (
    <>
      <UnorderedList styleType="none">
        {products?.slice(currentPage  *  pageSize, currentPage  *  pageSize + pageSize).map((p) => (
          <ProductItem key={p.id} name={p.title} id={p.id} isBuy={p.isBuy} />
        ))}
      </UnorderedList>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Предыдущая
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <span key={i}>
            {i + 1}
          </span>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Следующая
        </button>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={15}>15</option>
        </select>
      </div>
    </>
  );
};

export default ListProducts; 