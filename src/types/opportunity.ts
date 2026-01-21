export interface Opportunity {
  _id?: string;
  id?: string;
  title: string;
  company: string;
  category?: "internship" | "hackathon" | "scholarship" | "competition" | "workshop";
  deadline: string | Date;
  location: string;
  skills: string[];
  description: string;
  link: string;
  matchScore?: number;
}
