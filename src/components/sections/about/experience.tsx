"use client";

import { ExperienceItem } from "@ronin/casper";
import { format } from "date-fns/format";

interface ExperienceSectionProps {
  experienceItems: ExperienceItem[];
}

export function ExperienceSection(props: ExperienceSectionProps) {
  return (
    <section className="mx-auto max-w-6xl w-full pb-32 px-5 md:px-0">
      <header>
        <h2 className="text-3xl md:text-4xl font-semibold">Work Experience</h2>
      </header>

      <ul className="flex flex-col mt-5">
        {props.experienceItems.map((item) => {
          const startDate = format(new Date(item.startDate), "MMM yyyy");
          const endDate = !isPresentDate(item.endDate as Date | null)
            ? format(new Date(item.endDate), "MMM yyyy")
            : "Present";

          return (
            <li key={item.id} className="mt-5">
              <a
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col sm:flex-row justify-between w-full"
                href={item.url}
              >
                <h3 className="text-lg font-semibold group-hover:underline">{item.name}</h3>

                <div className="flex flex-col sm:flex-row sm:gap-4 justify-between w-full sm:max-w-fit">
                  <h4 className="text-gray-dark text-medium mt-1 min-w-fit">{item.role}</h4>
                  <h5 className="text-gray-light mt-1 min-w-fit">
                    {startDate} - {endDate}
                  </h5>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function isPresentDate(date: Date | null): boolean {
  if (!date) return true;

  const isEpochStart = date.getTime() === 0;
  return isEpochStart;
}
