import { useNavigate } from "react-router-dom";

export function useModalTableEditHandler() {
  const navigate = useNavigate();

  return (endpoint: string) => {
    navigate(endpoint);
  };
}
