import { useEffect, useRef, useState } from "react";
import "./index.css";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  multiple: number;
  threshold: number;
  onAnimation?: (povScroll: number) => void;
}

// 1.

export function AnimateOnScroll({
  children,
  multiple,
  threshold = 0.1,
  onAnimation,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const vh = window.innerHeight;
  const scrollSize = multiple * vh;

  function handleScroll() {
    if (!isVisible) {
      return;
    }
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
  }

  useEffect(() => {
    if (!wrapperRef.current) return;

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
  }, [threshold, isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollSize, isVisible]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    function firstCall() {
      const top = scrollContainerRef.current?.getBoundingClientRect().top ?? 0;

      const scrollY = window.scrollY;
      const povScroll = scrollY - top;

      window.requestAnimationFrame(() => {
        wrapperRef.current?.style.setProperty(
          "--pov-scroll",
          povScroll.toString()
        );
        onAnimation?.(povScroll);
      });
    }
    firstCall();
  }, [scrollSize, onAnimation]);

  return (
    <div
      className="animate-on-scroll"
      ref={scrollContainerRef}
      style={{
        height: `${scrollSize}px`,
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
