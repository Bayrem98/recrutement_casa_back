import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import CreateUsersDto from './dto/create-users.dto';
import UpdateUsersDto from './dto/update-users.dto';

@Injectable()
export class UsersService {
  async search(status: string) {
    return this.usersModel.find({ status }).exec();
  }
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async findOne(_id: string): Promise<Users> {
    return await this.usersModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(nom: string): Promise<Users> {
    return this.usersModel.findOne({ nom }).exec();
  }

  async findAll(): Promise<Users[]> {
    return await this.usersModel.find().select('-password').exec();
  }

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const user = await this.findOneByUsername(createUsersDto.nom);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.usersModel(createUsersDto);
    return createdUser.save();
  }

  async update(
    id: string,
    updateUsersDto: UpdateUsersDto,
  ): Promise</*UpdateResult*/ any> {
    return this.usersModel.updateOne({ _id: id }, updateUsersDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.usersModel.deleteOne({ _id: id });
  }

  async changeStatus(
    id: string,
    status: { status: string; color: string },
  ): Promise<Users> {
    const isValidObjectId = Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.usersModel.findOneAndUpdate(
        { _id: id },
        { status: status }, // Mettez à jour le champ status avec l'objet contenant à la fois l'état et la couleur
        { new: true },
      );

      if (!result) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      console.error('Error in updateStatus:', error);
      throw new HttpException(
        'Failed to update user status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
