"use client";

import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import { useTranslation } from "react-i18next";

const REDIRECT_TIMEOUT_MS = 6700;

export default function SiteeRedirect() {
  const { t } = useTranslation()
  const [text, setText] = useState(t("siteeRedirection.redirectingIn").replace("{i}", "6.700"));
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const timeLeft = Math.max(0, REDIRECT_TIMEOUT_MS - elapsed);

      setText(t("siteeRedirection.redirectingIn").replace("{i}", (timeLeft / 1000).toFixed(3)));

      if (timeLeft <= 0) {
        setText(`${t("siteeRedirection.redirectingDone")}...`);
        if (process.env.NODE_ENV === "development")
          console.log("Done! (would redirect in production)");
        else window.location.href = "https://yoursit.ee/balint2201";
      } else {
        animationId = requestAnimationFrame(tick);
      }
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [t]);

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