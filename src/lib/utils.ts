const DATE_OF_BIRTH = "2005-07-21";

export function calculateAge(withMagic: boolean) {
  const date = new Date(DATE_OF_BIRTH).getTime();
  const age = (Date.now() - date) / (60 * 60 * 24 * 365.25 * 1000);

  if (withMagic) {
    return age.toFixed(8);
  }

  return age.toString().split(".")[0];
}
