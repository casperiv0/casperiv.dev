import type { TimelineItem as TTimelineItem } from "types/Timeline";

interface Props {
  item: TTimelineItem;
}

export const TimelineItem = ({ item }: Props) => {
  return (
    <li className="my-5">
      <h5 className="text-lg font-medium">
        {item.url ? (
          <a target="_blank" rel="noreferrer noopener" href={item.url}>
            {item.title}
          </a>
        ) : (
          item.title
        )}
      </h5>

      <p className="mt-1 text-base text-gray-300">{item.text}</p>
    </li>
  );
};
