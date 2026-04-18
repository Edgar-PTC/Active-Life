import { useState, useEffect, useRef } from "react";

const INTERVAL = 5000;

function TextCarousel({ textosArray }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + textosArray.length) % textosArray.length);
      setVisible(true);
    }, 350);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % textosArray.length;
        setVisible(false);
        setTimeout(() => setVisible(true), 350);
        return next;
      });
    }, INTERVAL);
  };

  useEffect(() => {
    if (playing) startTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const handleNav = (dir) => {
    if (playing) startTimer();
    goTo(current + dir);
  };

  return (
    <div className="flex flex-col p-8 container w-full justify-between gap-20">
      {/* Caja principal */}
      <div className="CarruselText gap-8">
        {textosArray[current].head ? (
          <>
            <h2
              style={{
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-10px)"
              }}
            >
              {textosArray[current].head}
            </h2>
            <p
              style={{
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-10px)",
                  fontSize: textosArray[current].head? "20px" : "50px",
                  fontWeight: textosArray[current].head? "200" : "500"
              }}
            >
              {textosArray[current].text}
            </p>
          </>
        ) : (
        <p
          style={{
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
              fontSize: textosArray[current].head? "20px" : "50px",
              fontWeight: textosArray[current].head? "200" : "500"
          }}
        >
          {textosArray[current].text}
        </p>
        )}
        
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-4 m-4">
        {textosArray.map((_, i) => (
          <button key={i} onClick={() => { if (playing) startTimer(); goTo(i); }} className="dots"  
          style={{
              background: i === current ? "#111" : "#ccc"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TextCarousel;