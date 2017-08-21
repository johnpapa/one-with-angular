import { Character } from '../app/core/models/character';
import { Planet } from '../app/core/models/planet';
import { SummaryData } from '../app/core/models/summary-data';

export const allegiances = [
  'rebel',
  'imperial',
  'sith',
  'jedi',
  'bounty hunter'
];

export const planets = [
  new Planet(1, 'Tatooine'),
  new Planet(2, 'Alderaan'),
  new Planet(3, 'Yavin IV'),
  new Planet(4, 'Hoth'),
  new Planet(5, 'Dagobah'),
];

export const characters = [
  new Character(21, 'Boba Fett', 2, 'bounty hunter'),
  new Character(101, 'K-2S0', 1, 'rebel'),
  new Character(102, 'Jyn Erso', 2, 'rebel'),
  new Character(103, 'Cassian Andor', 3, 'rebel'),
  new Character(104, 'Saw Gererra', 4, 'rebel'),
  new Character(105, 'Chirrut Îmwe', 5, 'rebel'),
  new Character(106, 'Baze Malbus', 5, 'rebel'),
  new Character(107, 'Bodhi Rook', 5, 'rebel'),
  new Character(110, 'Orson Krennic', 3, 'imperial'),
];

export const planetSummary = [
  new SummaryData('Tatooine', 11),
  new SummaryData('Alderaan', 3),
  new SummaryData('Yavin IV', 18),
  new SummaryData('Hoth', 7),
  new SummaryData('Dagobah', 25),
];

export const allegianceSummary = [
  new SummaryData('rebel', 44),
  new SummaryData('imperial', 38),
  new SummaryData('sith', 8),
  new SummaryData('jedi', 12),
  new SummaryData('bounty hunter', 22),
];
