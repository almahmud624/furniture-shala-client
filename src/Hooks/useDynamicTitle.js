import { useEffect } from "react";
const useDynamicTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Furniture Shala`;
  }, [title]);
};

export default useDynamicTitle;
