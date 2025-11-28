import { Pagination } from "react-bootstrap";
import "../css/Paginator.css";
interface PaginatorProps {
  previousPage: () => void;
  nextPage: () => void;
  totalCountPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export const PaginatorForTable = ({
  previousPage,
  nextPage,
  totalCountPages,
  currentPage,
  onPageChange,
}: PaginatorProps) => {
  const items = [];
  for (let i = 1; i <= totalCountPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
        className={"pagination-item"}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div className="pagination-container">
      <Pagination className={"pagination-core"}>
        <Pagination.Prev
          onClick={previousPage}
          className={"pagination-item-previous"}>
          <i className="bi bi-chevron-left"></i>
        </Pagination.Prev>
        {items}
        <Pagination.Next onClick={nextPage} className={"pagination-item-next"}>
          <i className="bi bi-chevron-right"></i>
        </Pagination.Next>
      </Pagination>
    </div>
  );
};
