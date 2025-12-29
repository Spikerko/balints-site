"use client";

import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";

const REDIRECT_TIMEOUT_MS = 6700;

export default function SiteeRedirect() {
  const [text, setText] = useState("redirecting in 6.700s");
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const timeLeft = Math.max(0, REDIRECT_TIMEOUT_MS - elapsed);

      setText(`redirecting in ${(timeLeft / 1000).toFixed(3)}s`);

      if (timeLeft <= 0) {
        setText(`redirecting now...`);
        if (process.env.NODE_ENV === "development")
          console.log("Done! (would redirect in production)");
        else window.location.href = "https://yoursit.ee/balint2201";
      } else {
        animationId = requestAnimationFrame(tick);
      }
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <ShinyText
      text={text}
      speed={0.85}
      delay={0}
      color="#858585"
      shineColor="#ffffff"
      spread={120}
      direction="left"
      yoyo={true}
      pauseOnHover={false}
      className="text-muted-foreground text-xs mt-2.75"
    />
  );
}