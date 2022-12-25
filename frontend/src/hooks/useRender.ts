import React from "react";

const useRender = () => {
  const [_, set_] = React.useState(0);
  const render = React.useCallback(() => {
    set_(_ + 1);
  }, [_]);
  return { render };
};
export default useRender;
