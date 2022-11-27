import { Dispatch, SetStateAction, useEffect, useState } from "react";

function getLocalStorageJsonItem<S>(key: string): S | undefined {
  const json = localStorage.getItem(key);
  if (!json) {
    return;
  }

  return JSON.parse(json);
}

export function useLocalStorage<S>(
  key: string
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>();

  useEffect(() => {
    setValue(getLocalStorageJsonItem(key));
  }, []);

  return [
    value,
    (value: S | undefined) => {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      setValue(value);
    },
  ];
}
