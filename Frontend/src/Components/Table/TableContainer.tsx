interface TableContainerProps {
  children?: React.ReactNode;
  title?: string;
}

export default function TableContainer({
  children,
  title,
}: TableContainerProps) {
  return (
    <div className="table-container">
      <h2 className="text-center my-2 py-2">{title}</h2>
      {children}
    </div>
  );
}
