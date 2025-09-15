import { IUserEntity } from "domain/entities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUserModel, userModel } from "frameworks/database/models/user.model";
import { FilterQuery } from "mongoose";
import { IuserRegisterData } from "shared/dto/request/auth.dto";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository {
  async findByEmail(email: string): Promise<IUserModel | null> {
    const user = await userModel.findOne({ email });
    return user;
  }

  async findOne(filter: FilterQuery<IUserEntity>): Promise<IUserModel | null> {
    const user = await userModel.findOne(filter);
    return user;
  }

  async findBynumber(number: number): Promise<boolean> {
    const user = await userModel.findOne({ mobileNumber: number });
    return user ? true : false;
  }

  async createUser(formData: IuserRegisterData): Promise<IUserModel> {
    const newUser = new userModel(formData);
    await newUser.save();
    return newUser;
  }

  async updateOne(
    filter: FilterQuery<IUserEntity>,
    update: Partial<IUserEntity>
  ): Promise<void> {
    await userModel.updateOne(filter, update);
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUserModel | null> {
    const user = await userModel.findOne({ email, password });
    return user;
  }
}
