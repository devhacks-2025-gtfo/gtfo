import { ReactNode, FC } from 'react';

export type TemplateType = 'social' | 'ecommerce' | 'blog';

export interface BaseTemplate {
  type: TemplateType;
  name: string;
  description: string;
  layout: ReactNode;
  challengeSlots: {
    id: string;
    position: string;
    allowedTypes: ChallengeType[];
  }[];
}

export type ChallengeType = 
  | 'authentication'
  | 'injection'
  | 'xss'
  | 'csrf'
  | 'idor';

export interface Challenge {
  id: string;
  type: ChallengeType;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  component?: FC;
  solution: string;
}

export interface GameTemplate {
  template: BaseTemplate;
  challenges: (Challenge | null)[];
} 