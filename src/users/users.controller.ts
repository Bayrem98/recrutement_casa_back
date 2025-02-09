import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUsersDto from './dto/create-users.dto';
import { Users } from './users.interface';
import UpdateUsersDto from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(
    @Query('status') status: string,
    @Query('categorie') categorie: string,
  ) {
    if (!status && !categorie) {
      return this.usersService.findAll();
    }

    if (status && categorie) {
      return this.usersService.search(status);
    } else if (status) {
      return this.usersService.search(status);
    } else if (categorie) {
      return this.usersService.search1(categorie);
    }
  }
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.usersService.findOne(_id);
  }

  @Post()
  create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.create(createUsersDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<Users> {
    return this.usersService.update(id, updateUsersDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put('changestatus/:id')
  changeStatus(
    @Param('id') id: string,
    @Body() status: { status: string; color: string },
  ): Promise<Users> {
    return this.usersService.update(id, status);
  }

  @Put('appointments/:id')
  async fixrdv(
    @Param('id') id: string,
    @Body() dateRDV: string,
  ): Promise<Users> {
    return this.usersService.fixrdv(id, dateRDV);
  }
}
