import type { TimelineItem as TTimelineItem } from "types/Timeline";

interface Props {
  item: TTimelineItem;
}

export const TimelineItem = ({ item }: Props) => {
  return (
    <li className="my-5 first-of-type:mt-0">
      <h5 className="text-xl font-medium text-neutral-800 dark:text-gray-200">
        {item.tag ? (
          <span className="mr-2 px-1.5 p-0.5 text-base lowercase rounded-md bg-gradient-to-tr from-[#1150d4] to-[#a245fc] text-white dark:text-black">
            {item.tag}
          </span>
        ) : null}

        {item.url ? (
          <a target="_blank" rel="noreferrer noopener" href={item.url}>
            {item.title}
          </a>
        ) : (
          item.title
        )}
      </h5>

      <p className="mt-1 text-lg text-neutral-700 dark:text-gray-300">{item.text}</p>
    </li>
  );
};
