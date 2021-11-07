import { Button } from "components/Button";
import * as React from "react";
import { TimelineItem as TTimelineItem } from "types/Timeline";
import { TimelineItem } from "./TimelineItem";

export const Timeline = ({ timelineData }: { timelineData: TTimelineItem[] }) => {
  const [showAll, setShowAll] = React.useState(false);

  const yearsArr = [...new Set([...timelineData.map((v) => v.year)])];
  const years = showAll ? yearsArr : [yearsArr[0]!];

  return (
    <div className="flex flex-col pb-8 mt-3">
      {years.map((item) => {
        const items = timelineData.filter((v) => v.year === item);

        return (
          <div
            className="py-5 first:pt-0 border-b-[1px] border-blue-1 last-of-type:border-b-0"
            key={item}
          >
            <h3 className="mb-2 text-2xl font-semibold">{item}</h3>

            <ul>
              {items.map((item) => (
                <TimelineItem key={item.title + item.full_date} item={item} />
              ))}
            </ul>
          </div>
        );
      })}

      <Button className="mt-5 mx-auto w-[max-content]" onClick={() => setShowAll((v) => !v)}>
        {showAll ? "Show less" : "Show more"}
      </Button>
    </div>
  );
};
