import styled from "styled-components";
import { sVars } from "../ts/constants";

export const DefaultSpinner = styled.div`
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: spin 1s linear infinite;
  border: 1px solid black;
  border-bottom: none;

  @keyframes spin {
    from {
      transform: rotateZ(0deg);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
`;

export const DefaultImage = styled.img`
  border-radius: 100%;
  object-fit: cover;
`;

export const DefaultEditIcon = styled.i`
  position: absolute;
  color: white !important;
  font-size: 50%;
  background-color: ${sVars.sc};
  padding: 1%;
  border-radius: 100%;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  opacity: 0.3;
`;
