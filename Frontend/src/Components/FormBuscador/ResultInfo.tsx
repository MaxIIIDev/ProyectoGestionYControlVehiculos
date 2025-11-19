import "../css/ResultInfo.css";

interface ResultInfoProps {
  title: string;
  info: { label: string; value: string }[];
}

export default function ResultInfo({ title, info }: ResultInfoProps) {
  return (
    <div className="result-info-container">
      <h5 className="result-info-title">{title}</h5>
      <ul className="result-info-list">
        {info.map((item, index) => (
          <li key={index}>
            <span className="result-info-label">{item.label}:</span>{" "}
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
