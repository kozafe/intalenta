import axios from "axios";
import { useEffect, useState } from "react";

export const useQueryHook = <T>({
  defaultValue = [],
  formatter = (data: any) => data,
  url,
  woInit,
}: {
  defaultValue?: any;
  formatter?: Function;
  url: string;
  woInit?: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>(defaultValue);

  const refetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://my-json-server.typicode.com/cutamar/mock/${url}`
      );
      setData((prev: T) => formatter(data, prev));
    } catch (error) {
      alert("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (woInit) return;
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { refetch, data, setData, loading };
};
