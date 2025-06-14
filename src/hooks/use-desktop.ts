import { useState, useEffect } from "react";
import { isDesktop as isDesktopUtils } from "../utils/is-desktop";

export function useDesktop() {
  const [isDesktop, setIsDesktop] = useState(isDesktopUtils());

  useEffect(() => {
    function handleResize() {
      setIsDesktop(isDesktopUtils());
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;
}
