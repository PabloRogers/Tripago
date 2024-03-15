import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setIsPending(false);

        setData(json);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Clould not fetch the data.");
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
