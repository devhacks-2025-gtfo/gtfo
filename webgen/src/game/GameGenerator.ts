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
  private challengeFlags: Map<string, string> = new Map();
  private challengeIndices: Map<string, number> = new Map([
    ['auth-bypass-1', 0],
    ['xss-search-1', 1],
    ['idor-profile-1', 2],
    ['csrf-like-1', 2] // Using index 2 as backup since backend only generates 3 flags
  ]);

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

  public async fetchFlag(challengeId: string): Promise<string | undefined> {
    try {
      const flagIndex = this.challengeIndices.get(challengeId);
      if (flagIndex === undefined) {
        console.warn(`No flag index mapping for challenge ${challengeId}`);
        return undefined;
      }

      const response = await fetch('http://localhost:8000/api/flag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: flagIndex }),
      });
      
      if (!response.ok) {
        console.warn(`Failed to fetch flag for challenge ${challengeId}`);
        return undefined;
      }

      const data = await response.json();
      if (!data.flag) {
        console.warn(`No flag returned for challenge ${challengeId}`);
        return undefined;
      }
      return data.flag.flag; // Backend returns { flag: { flag: string, isVerified: boolean } }
    } catch (error) {
      console.error(`Error fetching flag for challenge ${challengeId}:`, error);
      return undefined;
    }
  }

  private serializeChallenge(challenge: Challenge) {
    const { component, flag, ...rest } = challenge;
    return rest;
  }

  public async generateGame(): Promise<GameTemplate> {
    // Select a random template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // For each challenge slot in the template, find a suitable challenge
    const selectedChallenges = await Promise.all(template.challengeSlots.map(async slot => {
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

      // Fetch and store the flag
      const flag = await this.fetchFlag(selectedChallenge.id);
      if (flag) {
        this.challengeFlags.set(selectedChallenge.id, flag);
      }
      
      return this.serializeChallenge(selectedChallenge);
    }));

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

  public getChallengeByType(type: ChallengeType): Challenge[] {
    return challenges.filter(challenge => challenge.type === type);
  }
} 