import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sVars } from "../ts/constants";

interface Props {
  color: "white" | "black";
  styles?: object;
}

const StyledLogo = styled.div`
  pointer-events: visible;
  & > a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${(p: Props) => (p.color === "black" ? sVars.mc : p.color)};
    & > div {
      background-color: ${(p: Props) =>
        p.color === "black" ? sVars.mc : p.color};
      width: 1px;
      &:nth-child(1) {
        height: 40px;
        margin-right: 0.5em;
      }
      &:nth-child(2) {
        height: 20px;
        margin-right: 1em;
      }
    }
  }
`;

function Logo({ color, styles }: Props) {
  return (
    <StyledLogo color={color} style={styles}>
      <Link to="/">
        <div></div>
        <div></div>
        <span>Infamous</span>
      </Link>
    </StyledLogo>
  );
}

export default Logo;
