import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import GridStories from "../components/GridStories";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import getSearchStories from "../graphql/queries/getSearchStories";
import getStories from "../graphql/queries/getStories";
import {
  GetSearchStoriesQuery,
  GetSearchStoriesQueryVariables,
  GetStoriesQuery,
  GetStoriesQueryVariables,
  StoryType,
} from "../graphql/types";
import useRedirectWithState from "../hooks/useRedirectWithState";
import { DefaultImage } from "../styles/scmps";
import "../styles/stories.scss";
import { genres, sVars } from "../ts/constants";

const ThumbnailContainer = styled.div`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  padding: 5px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Thumbnail = styled(DefaultImage)`
  width: 100%;
  height: 100%;
`;

function Stories() {
  const redirect = useRedirectWithState();

  const [genre, setGenre] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [loadingResults, setLoadingResults] = React.useState(false);
  const [qSearch, { data: searchResults }] = useLazyQuery<
    GetSearchStoriesQuery,
    GetSearchStoriesQueryVariables
  >(getSearchStories, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setLoadingResults(false);
    },
  });
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const {
    loading: loadingStories,
    data: stories,
    refetch,
  } = useQuery<GetStoriesQuery, GetStoriesQueryVariables>(getStories, {
    variables: {
      type: StoryType.Public,
      genre,
    },
  });

  const handleGenre = React.useCallback(
    (genre: string) => {
      setGenre(genre);
      refetch({
        type: StoryType.Public,
        genre,
      });
    },
    [refetch]
  );

  React.useEffect(() => {
    if (query) {
      setLoadingResults(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        qSearch({
          variables: {
            query,
          },
        });
      }, 2000);
    }
  }, [query, qSearch]);

  return (
    <div className="stories-container">
      <Input
        inputProps={{
          type: "text",
          placeholder: "Search for stories...",
          value: query,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value),
          style: {
            padding: "0.8rem",
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            outline: "none",
          },
        }}
      />
      <div className="stories-container-genres">
        {["All", ...genres].map((g) => (
          <span
            key={g}
            style={{
              color: sVars.mc,
              fontFamily: genre === g ? "fantasy" : "initial",
            }}
            onClick={() => handleGenre(g)}
          >
            {g}
          </span>
        ))}
      </div>
      {query !== "" && (
        <div className="stories-container-search-results">
          {loadingResults ? (
            <Spinner styles={{ left: "45%", top: "20%" }} />
          ) : (searchResults?.getSearchStories.stories.length || 0) > 0 ? (
            searchResults?.getSearchStories.stories.map((s) => (
              <div
                key={s.id}
                onClick={() => redirect(`/home/stories/view/${s.id}`)}
              >
                <ThumbnailContainer>
                  <Thumbnail
                    src={
                      s.thumbnail?.url
                        ? s.thumbnail.url
                        : "/images/noBanner.png"
                    }
                  />
                </ThumbnailContainer>
                <span>{s.title}</span>
                <span>~ {s.user?.anonymous ? "Anonymous" : s.user?.name}</span>
              </div>
            ))
          ) : (
            <div className="stories-container-search-results-none">
              <i
                className="fas fa-frown"
                style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}
              />
              <span>Couldn't find "{query}"...</span>
            </div>
          )}
        </div>
      )}
      {loadingStories ? (
        <Spinner />
      ) : (
        <GridStories stories={stories?.getStories.public!} published={true} />
      )}
    </div>
  );
}

export default Stories;
