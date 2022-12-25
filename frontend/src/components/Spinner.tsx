import React from "react";
import styled from "styled-components";
import { DefaultSpinner } from "../styles/scmps";

const StyledSpinner = styled(DefaultSpinner)`
  width: 40px;
  height: 40px;
`;

interface Props {
  styles?: React.CSSProperties;
}

function Spinner({ styles }: Props) {
  return <StyledSpinner style={styles} />;
}

export default Spinner;
