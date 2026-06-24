export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  image: string;
  description: string;
  role: string;
  tech: string[];
  challenge: string;
  solution: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
