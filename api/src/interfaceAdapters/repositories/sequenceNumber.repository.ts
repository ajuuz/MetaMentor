import { ISequenceNumberRepository } from "domain/repositoryInterfaces/sequenceNumberRepository.interface";
import { SequenceNumberModel } from "frameworks/database/models/sequenceNumber.model";

export class SequenceNumberRepository implements ISequenceNumberRepository {
  async findAndUpdate(name: string): Promise<number | null> {
    const sequenceNumberDocument = await SequenceNumberModel.findOneAndUpdate(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return sequenceNumberDocument ? sequenceNumberDocument.seq : null;
  }
}
