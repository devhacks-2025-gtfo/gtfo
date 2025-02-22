export interface ChallengeProps {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface UserResponse {
  message: string;
  success: boolean;
  flag?: string;
} 