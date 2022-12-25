import React, { ReactElement } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { DefaultSpinner } from "../styles/scmps";
import { sVars } from "../ts/constants";

type fillOptions = "outlined" | "contained";

interface Props {
  label?: string | ReactElement;
  icon?: string;
  fill?: fillOptions;
  color: string;
  bgColor?: string;
  buttonProps?: object;
  loading?: boolean;
  spinnerStyles?: object;
  hasToolTip?: boolean;
}

const StyledButton = styled.button<{
  fill: fillOptions;
  color: string;
  bgColor: string;
}>`
  pointer-events: visible;
  font-family: ${sVars.ff};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: ${({ fill, color }) =>
    fill === "outlined" ? `1px solid ${color}` : "none"};
  position: relative;
  outline: none;
  cursor: pointer;
`;

const Spinner = styled(DefaultSpinner)<{ color: string }>`
  width: 15px;
  height: 15px;
  border: 1px solid ${({ color }) => color};
  border-bottom: none;
  top: 30%;
  left: 40%;
`;

const Button: React.FC<Props> = ({
  label,
  icon,
  fill,
  color,
  bgColor,
  loading,
  spinnerStyles,
  buttonProps,
  hasToolTip,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <StyledButton
      type="button"
      fill={fill || "contained"}
      color={color}
      bgColor={bgColor || "transparent"}
      disabled={loading}
      ref={buttonRef}
      onMouseEnter={() => hasToolTip && ReactTooltip.show(buttonRef.current!)}
      onMouseLeave={() => hasToolTip && ReactTooltip.hide(buttonRef.current!)}
      {...buttonProps}
    >
      {React.isValidElement(label) ? (
        label
      ) : (
        <span style={{ opacity: loading ? 0 : undefined }}>
          {icon && <i className={icon}></i>}
          {label}
        </span>
      )}
      {loading && <Spinner style={spinnerStyles} color={color} />}
    </StyledButton>
  );
};

export default Button;
