import React from "react";
import styled from "styled-components";
import { sVars } from "../ts/constants";

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  border: 2px solid ${sVars.sc};
  background-color: ${sVars.mc};
  padding: 0rem 1rem;
  animation: slideDown 100ms linear;

  @keyframes slideDown {
    from {
      transform: translate(0px, -20px);
    }
    to {
      transform: translate(0px, 0px);
    }
  }
  @keyframes slideUp {
    from {
      transform: translate(0px, 0px);
    }
    to {
      transform: translate(0px, -20px);
    }
  }
`;

const Item = styled.div`
  padding: 1rem 2rem 1rem 0.5rem;
  cursor: pointer;
  font-size: 80%;
  color: white;
  transition: all 1s;
  i {
    margin-right: 1rem;
    color: ${sVars.sc};
  }
  &:hover {
    color: ${sVars.sc};
  }
`;

interface Props {
  items: ({
    label: string;
    icon: string;
    click?: () => void;
  } | null)[];
  children: ({
    ref,
  }: {
    ref: React.MutableRefObject<any>;
  }) => React.ReactElement;
  containerStyle?: React.CSSProperties;
  offset?: [number, number];
}

function Dropdown({ items, children, containerStyle, offset }: Props) {
  const [render, setRender] = React.useState(false);
  const [position, setPosition] = React.useState([0, 0]);

  const targetRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const toggle = React.useCallback(() => {
    if (render) {
      containerRef.current!.style.animation = "slideUp 100ms linear";
      setTimeout(() => {
        setRender(false);
      }, 90);
    } else setRender(true);
  }, [render]);
  React.useEffect(() => {
    const target = targetRef.current as HTMLElement;
    if (target) {
      target.onclick = () => toggle();
      target.onmouseenter = () => {
        const box = target.getBoundingClientRect();
        setPosition([
          Math.round(box.x + (offset ? offset[0] : 0)),
          Math.round(
            box.y + box.height + (offset ? offset[1] : 0) + window.scrollY
          ),
        ]);
      };
    }
  }, [toggle, offset]);
  return (
    <React.Fragment>
      {children({ ref: targetRef })}
      {render && (
        <Container
          style={{
            left: `${position[0]}px`,
            top: `${position[1]}px`,
            ...containerStyle,
          }}
          ref={containerRef}
        >
          {items.map(
            (item) =>
              item && (
                <Item
                  key={item.label}
                  onClick={() => {
                    toggle();
                    item.click && item.click();
                  }}
                >
                  <i className={item.icon} />
                  <span>{item.label}</span>
                </Item>
              )
          )}
        </Container>
      )}
    </React.Fragment>
  );
}

export default Dropdown;
