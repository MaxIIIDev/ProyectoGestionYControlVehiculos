import "../css/GeneralContainer.css";

interface GeneralContainerProps {
  title: string;
}

export default function GeneralContainer({
  title,
  children,
}: React.PropsWithChildren<GeneralContainerProps>) {
  return (
    <div className="general-container">
      <h1>{title}</h1>
      <div className="">{children}</div>
    </div>
  );
}
