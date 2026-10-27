import { bi, type Bi } from './bi';

export type Course = { title: Bi; detail: Bi };

export const EDUCATION: Course[] = [
  { title: bi('Tecnólogo em Análise e Desenvolvimento de Sistemas', 'Associate Degree in Systems Analysis and Development'), detail: bi('Faculdade Impacta, 2020 a 2021', 'Faculdade Impacta, 2020 to 2021') },
  { title: bi('Desenvolvimento Full Stack, 240h', 'Full Stack Development, 240h'), detail: bi('Udemy: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker e CI/CD', 'Udemy: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker and CI/CD') },
  { title: bi('Java Elite, UNIPDS (pós-graduação interrompida)', 'Java Elite, UNIPDS (postgraduate program, not completed)'), detail: bi('Spring Boot, APIs REST, mensageria e arquitetura de software', 'Spring Boot, REST APIs, messaging and software architecture') },
  { title: bi('Java Programmer I a III, 100h', 'Java Programmer I to III, 100h'), detail: bi('Impacta: Java SE, orientação a objetos, JDBC e MySQL', 'Impacta: Java SE, object-oriented programming, JDBC and MySQL') },
];
