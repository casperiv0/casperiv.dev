import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { Github, Twitter } from "react-bootstrap-icons";
import classNames from "clsx";

export const Nav = () => {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-center w-full px-5 h-15 bg-blue"
      id="nav"
    >
      <nav className="flex items-center justify-between w-full h-20 max-w-4xl">
        {/* <h1 className="text-2xl font-bold">
          <a href="/">
            Casper <span className="hidden sm:inline">Iversen</span>
          </a>
        </h1> */}

        <ul className="flex items-center h-full space-x-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#projects">Projects</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/snippets">Code Snippets</Link>
          </li>
        </ul>

        <ul className="flex items-center h-full space-x-3">
          <li>
            <a aria-label="GitHub profile" href="https://github.com/dev-caspertheghost">
              <Github width={21} height={21} />
            </a>
          </li>
          <li>
            <a aria-label="Twitter profile" href="https://twitter.com/casper124578">
              <Twitter width={21} height={21} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Link = (props: JSX.IntrinsicElements["a"]) => {
  const router = useRouter();

  const isActive = props.href === router.pathname;

  return (
    <NextLink href={props.href!}>
      <a
        {...props}
        className={classNames(
          { "bg-blue-1 font-medium": isActive },
          "p-1.5 px-3 duration-200 transition-colors rounded-md hover:bg-blue-1",
        )}
      >
        {props.children}
      </a>
    </NextLink>
  );
};
