export interface TimelineItem {
  year: number;
  title: string;
  text: string;
  url?: string;

  date?: string;
  full_date?: string; // eg: March 28, 2021
}
