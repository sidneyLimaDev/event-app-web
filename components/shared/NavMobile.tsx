import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Navbar from "./Navbar";
import Image from "next/image";
import { Separator } from "../ui/separator";

const NavMobile = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image
            src={"/assets/images/logo.svg"}
            alt="Ticket Logo"
            width={120}
            height={36}
          />
          <Separator />
          <Navbar />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavMobile;
