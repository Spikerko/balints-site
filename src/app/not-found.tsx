import I18NText from "@/components/I18NText";
import NotFoundClientComponent from "@/components/not-found-component";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5 bg-black">
      <NotFoundClientComponent />
      <Link href={"/"} prefetch={true}>
        <Button variant={"link"} className="text-white cursor-pointer">
          <IconArrowLeft /> <I18NText text={"notFound.back"} />
        </Button>
      </Link>
    </div>
  );
}
