import type { BaseTemplate, Challenge, GameTemplate, ChallengeType } from '../types/templates.js';
import SocialTemplate from '../templates/social/SocialTemplate.js';
// Import other templates as they are created
// import EcommerceTemplate from '../templates/ecommerce/EcommerceTemplate';
// import BlogTemplate from '../templates/blog/BlogTemplate';

import AuthenticationChallenge from '../challenges/AuthenticationChallenge.js';
import XSSChallenge from '../challenges/XSSChallenge.js';
import IDORChallenge from '../challenges/IDORChallenge.js';
import CSRFChallenge from '../challenges/CSRFChallenge.js';

const templates: BaseTemplate[] = [
  SocialTemplate,
  // Add other templates here
];

const challenges: Challenge[] = [
  AuthenticationChallenge,
  XSSChallenge,
  IDORChallenge,
  CSRFChallenge,
];

export class GameGenerator {
  private static instance: GameGenerator;
  private currentTemplate?: GameTemplate;

  private constructor() {
    // Log available challenges for debugging
    console.log('Available challenges:', challenges.map(c => ({
      id: c.id,
      type: c.type,
      name: c.name
    })));
  }

  public static getInstance(): GameGenerator {
    if (!GameGenerator.instance) {
      GameGenerator.instance = new GameGenerator();
    }
    return GameGenerator.instance;
  }

  private serializeChallenge(challenge: Challenge) {
    const { component, ...rest } = challenge;
    return rest;
  }

  public generateGame(): GameTemplate {
    // Select a random template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // For each challenge slot in the template, find a suitable challenge
    const selectedChallenges = template.challengeSlots.map(slot => {
      const compatibleChallenges = challenges.filter(challenge => 
        slot.allowedTypes.includes(challenge.type)
      );
      
      console.log(`Finding challenge for slot ${slot.id}:`, {
        allowedTypes: slot.allowedTypes,
        compatibleChallenges: compatibleChallenges.map(c => c.type)
      });
      
      if (compatibleChallenges.length === 0) {
        console.warn(`No compatible challenges found for slot ${slot.id}`);
        return null;
      }
      
      const selectedChallenge = compatibleChallenges[Math.floor(Math.random() * compatibleChallenges.length)];
      console.log(`Selected challenge for slot ${slot.id}:`, {
        id: selectedChallenge.id,
        type: selectedChallenge.type,
        name: selectedChallenge.name
      });
      
      return this.serializeChallenge(selectedChallenge);
    });

    const game: GameTemplate = {
      template,
      challenges: selectedChallenges
    };

    console.log('Generated game:', {
      template: {
        type: game.template.type,
        name: game.template.name,
        slots: game.template.challengeSlots.map(s => s.id)
      },
      challenges: game.challenges.map(c => c ? {
        id: c.id,
        type: c.type,
        name: c.name
      } : null)
    });

    this.currentTemplate = game;
    return game;
  }

  public getCurrentGame(): GameTemplate | undefined {
    return this.currentTemplate;
  }

  public validateFlag(challengeId: string, submittedFlag: string): boolean {
    if (!this.currentTemplate) return false;

    const challenge = this.currentTemplate.challenges.find(c => c?.id === challengeId);
    return challenge?.flag === submittedFlag;
  }

  public getChallengeByType(type: ChallengeType): Challenge[] {
    return challenges.filter(challenge => challenge.type === type);
  }
} 