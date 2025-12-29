import Beams from "@/components/Beams";
import SiteeRedirect from "@/components/sitee-redirect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="fixed inset-0 w-full h-full opacity-70">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <Card className="w-sm md:w-lg bg-black/10 backdrop-blur-xl shadow-xs border-[oklch(0.4 0.04 230 / 40%)] border">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-3xl font-bold">there is nothing here unc</CardTitle>
          <CardDescription className="text-center mt-2">imma redirect u to my Sitee</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-full flex items-center justify-center gap-2 flex-col">
          <Spinner className="size-8" />
          <SiteeRedirect />
        </CardContent>
      </Card>
    </div>
  );
}