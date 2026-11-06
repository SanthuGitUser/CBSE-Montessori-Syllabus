export interface SyllabusBlock {
  phase: string;
  topics: string[];
}

export interface SyllabusSubject {
  name: string;
  blocks: SyllabusBlock[];
}

export interface MonthSyllabus {
  month: string;
  year: string;
  subjects: SyllabusSubject[];
}

export interface CatalogTopic {
  title: string;
  key: string;
  phases: string[];
  months: string[];
}

export interface SubjectCatalog {
  name: string;
  topics: CatalogTopic[];
}

export interface SyllabusCatalog {
  academicYear: string;
  sourceMonths: number;
  topicCount: number;
  subjects: SubjectCatalog[];
}

export interface TopicGuide {
  summary: string;
  atSchool: string;
  atHome: string[];
  watchFor: string;
}

export type ParentNotes = Record<string, boolean>;
