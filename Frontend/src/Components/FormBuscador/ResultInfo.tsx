import "../css/ResultInfo.css";

interface ResultInfoProps {
  title: string;
  info: { label: string; value: string }[];
}

export default function ResultInfo({ title, info }: ResultInfoProps) {
  return (
    <div className="result-info-container">
      <h5 className="result-info-title">{title}</h5>
      <div className="result-info-row">
        {info.map((item, index) => (
          <span className="result-info-item" key={index}>
            <span className="result-info-label">{item.label}:</span>{" "}
            {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
