import { ContactForm } from "./contact-form";
import { GithubLogo } from "~/components/icons/github-logo";
import { TwitterLogo } from "~/components/icons/twitter-logo";
import { LinkedinLogo } from "~/components/icons/linkedin-logo";
import { ArrowUpRight } from "~/components/icons/arrow-right-up";

export const socialLinks = [
  { icon: GithubLogo, name: "GitHub", url: "https://casperiv.dev/github" },
  { icon: TwitterLogo, name: "Twitter", url: "https://casperiv.dev/twitter" },
  { icon: LinkedinLogo, name: "LinkedIn", url: "https://casperiv.dev/linkedin" },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-secondary text-primary">
      <div className="mx-auto max-w-6xl w-full py-32 px-5 md:px-0">
        <h2 className="font-poppins font-medium text-4xl md:text-5xl relative max-w-fit leading-snug">
          Want to ask me <span className="italic">sum</span>?
          <br />
          Go for it!
        </h2>

        <div className="flex flex-col md:flex-row mt-14 gap-12 justify-between">
          <div className="w-full md:max-w-md">
            <p className="text-gray-extralight font-medium text-inter">
              {"I'm"} like a friendly neighborhood spider, always looking for new connections.
              Except I {"don't"} have eight legs, and I promise not to scare you.
            </p>

            <div className="flex mt-14 gap-12 w-full">
              <ul className="flex flex-col gap-y-2">
                {socialLinks.map((link) => (
                  <li className="group" key={link.name}>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center gap-1 text-gray-extralight hover:text-primary"
                      href={link.url}
                    >
                      {link.name}

                      <ArrowUpRight
                        className="group-hover:scale-110 origin-bottom-left transition"
                        width={12}
                        height={12}
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="w-1/2">
                <p className="uppercase text-sm font-semibold mb-1 text-gray-extralight font-poppins">
                  email me directly
                </p>
                <a href="mailto:hi@casperiv.dev" className="text-primary">
                  hi@casperiv.dev
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
