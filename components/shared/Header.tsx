import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import NavMobile from "./NavMobile";

const Header = () => {
  return (
    <header className="w-full border-b flex justify-center">
      <div className=" flex items-center justify-between w-full max-w-screen-xl">
        <Link href={"/"} className="w-36">
          <Image
            src="/assets/images/logo.svg"
            alt="Ticket Logo"
            width={144}
            height={36}
          />
        </Link>
        <SignedIn>
          <nav className="md:flex md:justify-between hidden w-full max-w-xs">
            <Navbar />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" />
            <NavMobile />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
