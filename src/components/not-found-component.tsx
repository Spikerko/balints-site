"use client";

import { useTranslation } from "react-i18next";
import FuzzyText from "./FuzzyText";

export default function NotFoundClientComponent() {
  const { t } = useTranslation();

  return (
    <>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        fuzzRange={30}
        fps={60}
        transitionDuration={0}
        letterSpacing={0}
        direction="horizontal"
        enableHover={true}
        clickEffect={false}
        glitchMode={false}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        fuzzRange={30}
        fps={60}
        transitionDuration={0}
        letterSpacing={0}
        direction="horizontal"
        enableHover={true}
        clickEffect={false}
        glitchMode={false}
        fontSize={"3rem"}
      >
        {t("notFound.text")}
      </FuzzyText>
    </>
  );
}
