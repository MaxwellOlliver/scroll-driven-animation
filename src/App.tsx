import { useEffect, useRef, useState } from "react";
import "./App.css";
import { AnimateOnScroll } from "./components/AnimateOnScroll";
import bg from "./assets/bg-min.jpg";
import bg2 from "./assets/bg2-min.jpg";
import bg3 from "./assets/bg3-min.jpg";
import bg4 from "./assets/bg4-min.jpg";
import bg5 from "./assets/bg5-min.jpg";
import bg7 from "./assets/bg7-min.jpg";
import { useDesktop } from "./hooks/use-desktop";

const images = [bg, bg2, bg3, bg4, bg5, bg7];

function App() {
  const ref3 = useRef<HTMLDivElement>(null);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const isDesktop = useDesktop();

  useEffect(() => {
    const promises = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = image;
        img.onload = resolve;
      });
    });

    Promise.all(promises).then(() => {
      setIsAllLoaded(true);
    });
  }, []);

  function handleHScrollAnimation(povScroll: number) {
    if (ref3.current) {
      ref3.current.scrollLeft =
        ref3.current.scrollWidth * (povScroll / 1000 / 5);
    }
  }

  if (!isAllLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div data-animation-enabled={isDesktop} style={{ width: "100%" }}>
      <AnimateOnScroll multiple={2} threshold={0.5} disabled={!isDesktop}>
        <div className="img-container">
          <img src={bg7} alt="" />
          <div className="text-container">
            <h1>
              {isDesktop
                ? "Just scroll."
                : "Scroll animation only available on desktop."}
            </h1>
          </div>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll
        multiple={3.5}
        threshold={1}
        onAnimation={handleHScrollAnimation}
        disabled={!isDesktop}
      >
        <div className="horizontal-scroll" ref={ref3}>
          <div className="horizontal-scroll-item">
            <h1>Vertical scroll</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
          <div
            className="horizontal-scroll-img"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div
            className="horizontal-scroll-img"
            style={{ backgroundImage: `url(${bg2})` }}
          />
          <div
            className="horizontal-scroll-img"
            style={{ backgroundImage: `url(${bg3})` }}
          />
          <div
            className="horizontal-scroll-img"
            style={{ backgroundImage: `url(${bg4})` }}
          />
          <div
            className="horizontal-scroll-img"
            style={{ backgroundImage: `url(${bg5})` }}
          />
        </div>
      </AnimateOnScroll>
    </div>
  );
}

export default App;
