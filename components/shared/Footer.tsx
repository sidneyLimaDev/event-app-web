import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="items-center wrapper flex flex-col justify-center gap-4 p-5 md:justify-between md:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Ticket Logo"
            width={144}
            height={36}
          />
        </Link>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ticket. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
