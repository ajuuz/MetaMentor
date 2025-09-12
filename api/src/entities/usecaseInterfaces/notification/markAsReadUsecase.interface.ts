
export interface IMarkAsReadUsecase {
  execute(userId:string): Promise<void>;
}
