export interface ResumeSection {
  id: string;
  type: 'personal' | 'about' | 'education' | 'experience' | 'skills' | 'projects' | 'certificates' | 'languages' | 'references';
  content: PersonalInfo | AboutMe | Education[] | Experience[] | Skill[] | Project[] | Certificate[] | Language[] | Reference[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  links: Link[];
}

export interface Link {
  id: string;
  label: string;
  url: string;
}

export interface AboutMe {
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
  gpa?: string;
  location: string;
  points?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  location: string;
  points: string[];
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
}