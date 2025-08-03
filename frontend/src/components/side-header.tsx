import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useQuery(userQueryOptions());
  console.log(user);

  return (
    <header className="border-border/40 bg-primary/95 supports-[backdrop-filter]:bg-primary/90 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex w-full items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            HackerNews
          </Link>
          <nav className="hidden w-full items-center space-x-4 md:flex">
            <Link to="/" className="hover:underline">
              new
            </Link>
            <Link to="/" className="hover:underline">
              top
            </Link>
            <Link to="/" className="hover:underline">
              submit
            </Link>
          </nav>
          {user ? (
            <div className="hidden items-center gap-4 justify-self-end md:flex">
              <span>{user}</span>
              <Button asChild className="bg-black! text-white!">
                <a href="/api/auth/logout">Logout</a>
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-4 justify-self-end md:flex">
              <Link to="/signup" className="hover:underline">
                signup
              </Link>
              <Link to="/login" className="hover:underline">
                login
              </Link>
            </div>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon" className="md:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="mb-2" side="right">
            <SheetHeader>
              <SheetTitle className="text-center text-xl">
                HackerNews
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 px-5">
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="hover:underline"
              >
                new
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="hover:underline"
              >
                top
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="hover:underline"
              >
                submit
              </Link>

              {user ? (
                <>
                  <span>{user}</span>
                  <Button asChild className="bg-black! text-white!">
                    <a href="/api/auth/logout">Logout</a>
                  </Button>
                </>
              ) : (
                <Button asChild className="bg-black! text-white!">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
