import I18NText from "./I18NText";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="w-full fixed bottom-3 left-0 flex items-center justify-center flex-col">
      <div className="text-muted-foreground text-sm">
        <span>
          <I18NText
            text={"footer.siteMadeBy"}
            components={[
              <a href="https://yoursit.ee/spikerko" target="_blank" key={0} className="-ml-2.75">
                <Button
                  variant={"link"}
                  className="text-muted-foreground hover:text-white underline cursor-pointer"
                >
                  @spikerko
                </Button>
              </a>,
            ]}
          />
        </span>
      </div>
    </div>
  );
}
