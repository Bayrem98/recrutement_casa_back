import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './schemas/users.schema';
import { MailModule } from 'src/mail/mail.module'; // Assurez-vous que le chemin est correct

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MailModule, // Assurez-vous que MailModule est bien importé ici
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
