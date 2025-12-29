import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="w-full fixed bottom-3 left-0 flex items-center justify-center flex-col">
      <div className="text-muted-foreground text-sm">
        <span>Site made by</span>
        <a href="https://yoursit.ee/spikerko" target="_blank">
          <Button
            variant={"link"}
            className="-ml-1.5 text-muted-foreground hover:text-white underline cursor-pointer"
          >
            @spikerko
          </Button>
        </a>
      </div>
    </div>
  );
}
