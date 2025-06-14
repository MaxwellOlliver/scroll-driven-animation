import { useRef } from "react";
import "./App.css";
import { AnimateOnScroll } from "./components/AnimateOnScroll";
import bg from "./assets/bg-min.jpg";
import bg2 from "./assets/bg2-min.jpg";
import bg3 from "./assets/bg3-min.jpg";
import bg4 from "./assets/bg4-min.jpg";
import bg5 from "./assets/bg5-min.jpg";
import bg6 from "./assets/bg6-min.jpg";
import bg7 from "./assets/bg7-min.jpg";
import bg8 from "./assets/bg8-min.jpg";

function App() {
  const ref3 = useRef<HTMLDivElement>(null);
  const isReady = useRef(false);

  const images = [bg, bg2, bg3, bg4, bg5, bg6, bg7, bg8];
  images.forEach((image) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      isReady.current = true;
    };
  });

  if (!isReady.current) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <AnimateOnScroll multiple={2} threshold={0.5}>
        <div className="img-container">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-container">
              <h1>Scroll me!</h1>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll
        multiple={3.5}
        threshold={1}
        onAnimation={(povScroll) => {
          if (ref3.current) {
            ref3.current.scrollLeft =
              ref3.current.scrollWidth * (povScroll / 1000 / 5);
          }
        }}
      >
        <div className="horizontal-scroll" ref={ref3}>
          <div style={{ backgroundImage: `url(${bg})` }} />
          <div style={{ backgroundImage: `url(${bg2})` }} />
          <div style={{ backgroundImage: `url(${bg3})` }} />
          <div style={{ backgroundImage: `url(${bg4})` }} />
          <div style={{ backgroundImage: `url(${bg5})` }} />
          <div style={{ backgroundImage: `url(${bg6})` }} />
          <div style={{ backgroundImage: `url(${bg7})` }} />
          <div style={{ backgroundImage: `url(${bg8})` }} />
        </div>
      </AnimateOnScroll>
    </div>
  );
}

export default App;
