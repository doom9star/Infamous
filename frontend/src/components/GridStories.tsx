import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Story } from "../graphql/types";
import useRedirectWithState from "../hooks/useRedirectWithState";

const Container = styled.div`
  display: grid;
  margin: 2rem 0rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 1s;

  &:hover {
    opacity: 0.7;
  }
`;

interface Props {
  stories?: Story[];
  published: boolean;
}

function GridStories({ stories, published }: Props) {
  const history = useHistory();
  const redirect = useRedirectWithState();

  return (
    <Container>
      {stories?.map((s) => (
        <Item
          key={s.id}
          onClick={() =>
            !published
              ? history.push("/home/stories/edit/" + s.id)
              : redirect(`/home/stories/view/${s.id}`)
          }
        >
          <img
            src={s.thumbnail?.url || "/images/noBanner.png"}
            alt={s.id}
            style={{ width: "100%", minHeight: "80%" }}
          />
          <span style={{ margin: "1rem 0rem" }}>{s.title}</span>
        </Item>
      ))}
    </Container>
  );
}

export default GridStories;
