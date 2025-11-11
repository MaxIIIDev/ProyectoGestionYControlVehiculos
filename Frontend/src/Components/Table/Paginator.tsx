import { Pagination } from "react-bootstrap";
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
        onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>
      <Pagination.Prev onClick={previousPage} />
      {items}
      <Pagination.Next onClick={nextPage} />
    </Pagination>
  );
};
