import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./index.css";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  multiple: number;
  threshold: number;
  onAnimation?: (povScroll: number) => void;
  disabled?: boolean;
}

// 1.

export function AnimateOnScroll({
  children,
  multiple,
  threshold = 0.1,
  onAnimation,
  disabled = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const vh = window.innerHeight;
  const scrollSize = multiple * vh;

  const handleScroll = useCallback(() => {
    const top =
      (scrollContainerRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY;

    const scrollY = window.scrollY;
    const povScroll = scrollY - top;

    window.requestAnimationFrame(() => {
      const wrapper = scrollContainerRef.current?.querySelector(
        ".wrapper"
      ) as HTMLElement;
      wrapper?.style.setProperty("--pov-scroll", povScroll.toString());
      onAnimation?.(povScroll);
    });
  }, [onAnimation]);

  useEffect(() => {
    if (!wrapperRef.current || disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: threshold,
      }
    );

    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, isVisible, disabled]);

  useEffect(() => {
    if (disabled || !isVisible) return;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [disabled, isVisible, handleScroll]);

  useLayoutEffect(() => {
    if (!scrollContainerRef.current || disabled) return;

    function firstCall() {
      const top =
        (scrollContainerRef.current?.getBoundingClientRect().top ?? 0) +
        window.scrollY;

      const scrollY = window.scrollY;
      const povScroll = scrollY - top;

      console.log("init", povScroll);

      window.requestAnimationFrame(() => {
        wrapperRef.current?.style.setProperty(
          "--pov-scroll",
          povScroll.toString()
        );
        onAnimation?.(povScroll);
      });
    }
    firstCall();
  }, [scrollSize, onAnimation, disabled]);

  return (
    <div
      className="animate-on-scroll"
      ref={scrollContainerRef}
      style={{
        height: disabled ? "fit-content" : `${scrollSize}px`,
      }}
    >
      <div
        className="wrapper"
        ref={wrapperRef}
        style={{ "--pov-scroll": "0" } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
