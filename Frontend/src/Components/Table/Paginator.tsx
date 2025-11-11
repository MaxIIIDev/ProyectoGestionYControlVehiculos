import { Pagination } from "react-bootstrap";
interface PaginatorProps {
  previousPage: () => void;
  nextPage: () => void;
  totalCountPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  stylePagination?: React.CSSProperties;
  stylePaginationItem?: React.CSSProperties;
  stylePaginationItemPreviousAndNext?: React.CSSProperties;
  classNamePagination?: string;
  classNamePaginationItem?: string;
  classNamePaginationItemPreviousAndNext?: string;
}
export const PaginatorForTable = ({
  previousPage,
  nextPage,
  totalCountPages,
  currentPage,
  onPageChange,
  stylePagination,
  stylePaginationItem,
  stylePaginationItemPreviousAndNext,
  classNamePagination,
  classNamePaginationItem,
  classNamePaginationItemPreviousAndNext,
}: PaginatorProps) => {
  const items = [];
  for (let i = 1; i <= totalCountPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
        style={stylePaginationItem}
        className={classNamePaginationItem}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <Pagination style={stylePagination} className={classNamePagination}>
      <Pagination.Prev
        onClick={previousPage}
        style={stylePaginationItemPreviousAndNext}
        className={classNamePaginationItemPreviousAndNext}
      />
      {items}
      <Pagination.Next
        onClick={nextPage}
        style={stylePaginationItemPreviousAndNext}
        className={classNamePaginationItemPreviousAndNext}
      />
    </Pagination>
  );
};
