import styled from "styled-components";

interface SwitchProps {
  checked?: boolean;
  onChange?: () => void;
  id?: string;
}

const Switch = ({ checked, onChange, id = "checkbox" }: SwitchProps) => {
  return (
    <StyledWrapper>
      <div className="container">
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="label"></label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    height: 24px;
    width: 48px;
    background-color: #a59f9f;
    border-radius: 12px;
    box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 1),
      inset 0 0 8px 1px rgba(0, 0, 0, 0.2), 2px 4px 8px rgba(0, 0, 0, 0.08),
      inset 0 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s;
  }

  .label:hover {
    transform: perspective(60px) rotateX(3deg) rotateY(-3deg);
  }

  #checkbox:checked ~ .label:hover {
    transform: perspective(60px) rotateX(-3deg) rotateY(3deg);
  }

  #checkbox {
    display: none;
  }

  #checkbox:checked ~ .label::before {
    left: 28px;
    background-color: #000000;
    background-image: linear-gradient(315deg, #000000 0%, #414141 70%);
    transition: 0.3s;
  }

  .label::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #000000;
    background-image: linear-gradient(
      130deg,
      #757272 10%,
      #ffffff 11%,
      #726f6f 62%
    );
    left: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 4px 4px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    top: 4px;
  }
`;

export default Switch;
