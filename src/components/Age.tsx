import { useAge } from "lib/hooks/useAge";
import { calculateAge } from "lib/utils";
import classNames from "clsx";

interface Props {
  withColor?: boolean;
}

export const Age = ({ withColor }: Props) => {
  const age = calculateAge(false);
  const ageRef = useAge();

  return (
    <button
      className={classNames("inline-block cursor-pointer", {
        "bg-gradient-to-tr px-1.5 py-0.5 rounded-md from-[#1150d4] to-[#a245fc]": withColor,
      })}
      ref={ageRef}
    >
      {age}
    </button>
  );
};
