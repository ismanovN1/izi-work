export type ColorT = 'blue' | 'black' | 'bright_grey' | 'ghost' | 'grey' | 'red' | 'white' | 'green';

export interface VacancyI {
  _id: string;
  category: { _id: string; childId: string; name?: string };
  salary?: { from?: number; to?: number; period?: 'PER_MONTH' | 'PER_HOUR' | 'PER_DAY' };
  about: { descriptions: string; requirements: string; circumstances: string };
  schedule: { shedule: 'FULL_TIME' | 'PART_TIME'; shift_work?: string; get_started_right_away?: boolean };
  address: { name: string; coords?: number[] };
  questions?: Array<{ question: string; options: string[] }>;
  photo?: any;
  views?: number;
  status?: string;
  responses?: number;
  favorite?: number;
}
export interface ResumeI {
  _id: string;
  owner_id?: string;
  category: { _id: string; childId: string; name?: string };
  salary?: { from?: number; to?: number; period?: 'PER_MONTH' | 'PER_DAY' };
  about?: string;
  experience?: string;
  address: { name: string; coords?: number[] };
  photo?: any;
}
