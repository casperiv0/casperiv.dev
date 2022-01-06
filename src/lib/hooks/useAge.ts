import * as React from "react";
const DATE_OF_BIRTH = "2005-07-21";

export function useAge() {
  const [withMagic, setWithMagic] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const currentRef = ref.current;

    const handler = () => {
      setWithMagic((v) => !v);
    };

    if (currentRef) {
      currentRef.addEventListener("click", handler);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("click", handler);
      }
    };
  }, []);

  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (withMagic) {
      if (ref.current) {
        ref.current.classList.add("underline");
        ref.current.textContent = calculateAge(true);
      }

      interval = setInterval(() => {
        if (ref.current) {
          ref.current.classList.add("underline");
          ref.current.textContent = calculateAge(true);
        }
      }, 100);
    } else {
      if (ref.current) {
        ref.current.classList.remove("underline");
        ref.current.textContent = calculateAge(false);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [withMagic]);

  return ref;
}

export function calculateAge(withMagic: boolean): string {
  const date = new Date(DATE_OF_BIRTH).getTime();
  const age = (Date.now() - date) / (60 * 60 * 24 * 365.25 * 1000);

  if (withMagic) {
    return age.toFixed(8);
  }

  return age.toString().split(".")[0]!;
}
