import { featured } from '../projects.js';
import { home } from './home.js';
import { about } from './about.js';
import { projectPage } from './project.js';
import { notFound } from './not-found.js';

export const pages = () => [home(), about(), ...featured.map(projectPage), notFound()];
