export interface ISequenceNumberRepository {
  findAndUpdate(name: string): Promise<number|null>;
}
