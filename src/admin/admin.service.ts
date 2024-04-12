import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import CreateAdminDto from './dto/create-admin.dto';
import UpdateAdminDto from './dto/update-admon.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findOne(_id: string): Promise<Admin> {
    return await this.adminModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(username: string): Promise<Admin> {
    return this.adminModel.findOne({ username }).exec();
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().select('-password').exec();
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const user = await this.findOneByUsername(createAdminDto.username);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.adminModel(createAdminDto);
    createdUser.password = await bcrypt.hash(createdUser.password, 10);
    return createdUser.save();
  }

  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise</*UpdateResult*/ any> {
    if (updateAdminDto.password)
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    return this.adminModel.updateOne({ _id: id }, updateAdminDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.adminModel.deleteOne({ _id: id });
  }
}
