import FuzzyText from "@/components/FuzzyText";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5 bg-black">
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
        Not Found
      </FuzzyText>
      <Link href={"/"} prefetch={true}>
        <Button variant={"link"} className="text-white cursor-pointer">
          <IconArrowLeft /> Go Back
        </Button>
      </Link>
    </div>
  );
}
