export interface IRateMentorUseCase {
  execute(mentorId: string, rating: number): Promise<void>;
}