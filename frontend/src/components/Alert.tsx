import React from "react";
import styled from "styled-components";

const Container = styled.div<{ variant: string }>`
  display: flex;
  justify-content: space-between !important;
  width: 100%;
  background-color: ${({ variant }) =>
    variant === "error" ? "rgba(255, 220, 200)" : "rgba(220, 255, 200)"};
  padding: 1rem 0rem;
  font-size: 0.9rem;
  font-weight: bold;

  & > * {
    padding: 0rem 1rem;
  }
`;

interface Props {
  message: string;
  variant: "error" | "success";
}

const Alert: React.FC<Props> = ({ message, variant }) => {
  const color = variant === "error" ? "rgb(200, 50, 50)" : "rgb(50, 200, 50)";
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const close = React.useCallback(() => {
    containerRef.current!.style.display = "none";
  }, []);

  return (
    <Container variant={variant} ref={containerRef}>
      <span style={{ color }}>{message}</span>
      <i
        className="fas fa-times"
        style={{ color, cursor: "pointer" }}
        onClick={close}
      />
    </Container>
  );
};

export default Alert;
