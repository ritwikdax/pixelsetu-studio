type ObjectTransformer<T> = {
  [K in keyof T]?: (value: T[K]) => any;
};

type Transformed<T, C extends ObjectTransformer<T>> = {
  [K in keyof T]: K extends keyof C
    ? C[K] extends (value: any) => infer R
      ? R
      : T[K]
    : T[K];
};

export function transform<T, C extends ObjectTransformer<T>>(
  obj: T,
  config: C,
): Transformed<T, C> {
  const result: any = {};

  for (const key in obj) {
    const k = key as keyof T;
    const fn = config[k] as ((value: any) => any) | undefined;
    result[key] = fn ? fn(obj[k]) : obj[k];
  }

  return result;
}

export function dateFormatter(
  date: Date,
  options?: { includeDay?: boolean },
): string {
  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];

  function getOrdinal(n: number): string {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const includeDay = options?.includeDay ?? true;
  return includeDay
    ? `${day}${getOrdinal(day)} ${month}, ${year}`
    : `${month}, ${year}`;
}
