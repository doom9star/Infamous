import { useMediaQuery } from "react-responsive";

const useScreen = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 620px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 620px)",
  });
  return { isMobile, isDesktop };
};
export default useScreen;
