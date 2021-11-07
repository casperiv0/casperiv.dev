export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full h-40 px-5 pt-8">
      <div className="flex items-center justify-between w-full h-40 max-w-4xl">
        <p>
          Created by{" "}
          <a className="underline" href="https://github.com/dev-caspertheghost/caspertheghost.me">
            CasperTheGhost
          </a>{" "}
          with ❤️
          <br />
          Built with{" "}
          <a className="underline" href="https://nextjs.org">
            Next.js
          </a>
        </p>

        <div className="flex flex-col md:flex-row md:gap-2">
          <a
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
            href="https://twitter.com/casper124578"
          >
            Twitter
          </a>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/dev-caspertheghost"
          >
            GitHub
          </a>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/casper-iversen"
          >
            LinkedIn
          </a>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.npmjs.com/~casper124578"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
};
