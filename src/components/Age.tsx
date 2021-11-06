import { useAge } from "lib/useAge";
import { calculateAge } from "lib/utils";

export const Age = () => {
  const age = calculateAge(false);
  const ageRef = useAge();

  return (
    <span className="cursor-pointer" ref={ageRef}>
      {age}
    </span>
  );
};
