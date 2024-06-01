/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { getSponsors } from "~/lib/get-sponsors";
import classNames from "clsx";
import Image from "next/image";
import { mergeSeo } from "~/lib/merge-seo";
import { Link } from "~/components/link";

export const revalidate = 600; // 10 minutes

const pageTitle = "Sponsors";
const pageDescription = "A list of active and inactive sponsors.";

export const metadata = mergeSeo({
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://casperiv.dev/thanks",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
  keywords: ["sponsors casper iversen", "sponsorships", "appreciation", "thank you"],
});

export default async function App() {
  const { tiers, githubSponsorsCustomizations } = await getSponsors();

  return (
    <main className="mt-16 mx-auto max-w-6xl pb-6 px-5 md:px-0">
      <h1 className="text-3xl font-bold capitalize md:text-4xl font-title">Sponsors</h1>

      <h2 className="my-2 text-lg font-medium bg-gradient-to-tr bg-clip-text text-transparent from-[#1150d4] to-[#a245fc]">
        Thanks a lot for sponsoring me! I absolutely appreciate everyone who supports my open-source
        work!
      </h2>

      <p className="mt-5 mb-2 font-normal text-secondary-light">
        A list of <span className="border-b-accent border-b font-medium">active</span> and inactive
        sponsors. Please contact me to get customized perks on this page.
      </p>

      <Link
        href="https://github.com/sponsors/casperiv0"
        target="_blank"
        intent="secondary"
        extras="icon"
        className="max-w-fit group mt-3"
      >
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className="fill-[#d25e9c] group-hover:scale-125 transition-transform duration-200"
        >
          <path
            fillRule="evenodd"
            d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
          />
        </svg>
        Become a sponsor
      </Link>

      {tiers.map((tier) => (
        <section className="my-5" key={tier.tier}>
          <h2 className="text-2xl font-bold">${tier.tier}</h2>

          <ul className="mt-2 flex flex-col bg-white border border-gray-extralight rounded-md overflow-hidden">
            {tier.sponsors.map((sponsor, idx) => {
              const customization = githubSponsorsCustomizations.find(
                (customization) => customization.login === sponsor.login,
              );

              const name = customization?.name || sponsor.name || sponsor.login;
              const bio = customization?.bio || sponsor.bio;
              const url = customization?.url || `https://github.com/${sponsor.login}`;
              const avatarUrl = customization?.avatar?.src || sponsor.avatarUrl;
              const placeholder = customization?.avatar?.placeholder?.base64 || undefined;

              const isNextActive = tier.sponsors[idx + 1]?.isActive;
              const isPreviousActive = tier.sponsors[idx - 1]?.isActive;
              const isLast = idx === tier.sponsors.length - 1;

              const isActiveAndNextActiveClassname = classNames(
                sponsor.isActive && (isNextActive || isPreviousActive)
                  ? ""
                  : "first:rounded-t-md last:rounded-b-md",
                sponsor.isActive && isNextActive ? "border-b-0" : "",
              );

              return (
                <li
                  className={classNames(
                    "hover:bg-gray-100 transition-colors ease-in-out first:rounded-t-md last:rounded-b-md",
                    isActiveAndNextActiveClassname,
                    isNextActive && !sponsor.isActive ? "border-none" : "",
                    sponsor.isActive
                      ? "border-accent border-2"
                      : isLast
                        ? ""
                        : "border-b-2 border-gray-extralight",
                  )}
                  key={sponsor.login}
                >
                  <a className="flex gap-5 items-start z-20 p-3" href={url}>
                    <Image
                      className="w-10 h-10 rounded-full object-cover mt-2"
                      width={40}
                      height={40}
                      src={avatarUrl}
                      alt={name}
                      blurDataURL={placeholder}
                    />

                    <div>
                      <h3 className="text-lg font-medium">{name}</h3>
                      <p>{bio}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
