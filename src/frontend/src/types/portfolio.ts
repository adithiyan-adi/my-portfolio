export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  category: "fpga" | "iot" | "ai" | "embedded";
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  type: "internship" | "project" | "competition";
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  image?: string;
  badge?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: "event" | "project" | "internship" | "portrait";
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  timeline: string;
  icon: string;
  status: "current" | "near" | "future";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
  scoreLabel: string;
  courses: string[];
  highlights: string[];
  accentFrom: string;
  accentTo: string;
  icon: "university" | "school";
  image?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  level: number; // filled dots
  maxLevel: number; // total dots
  accent: "primary" | "accent";
}

export type ProjectFilter = "all" | "fpga" | "iot" | "ai" | "embedded";
