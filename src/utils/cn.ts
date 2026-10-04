/** Joins class names, skipping falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/** "Ada Okafor" -> "AO" */
export const getInitials = (name: string, max = 2) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, max)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
