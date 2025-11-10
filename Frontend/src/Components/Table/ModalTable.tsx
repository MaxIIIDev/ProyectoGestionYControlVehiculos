interface ModalTableProps {
  title: string;
  children?: React.ReactNode;
  show: boolean;
}

export default function ModalTable({ title, children, show }: ModalTableProps) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          minWidth: "320px",
          maxWidth: "90vw",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h3>{title}</h3>
        <div
          className="row"
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
