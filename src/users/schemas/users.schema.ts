import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ require: true, type: String })
  nom: string;
  @Prop({ require: true, type: String })
  prenom: string;
  @Prop({ require: true, type: String })
  num_cin: string;
  @Prop({ require: true, type: String })
  date_naiss: string;
  @Prop({ require: true, type: String })
  num_tel1: string;
  @Prop({ type: String })
  num_tel2?: string;
  @Prop({ require: true, type: String })
  adresse: string;
  @Prop({ require: true, type: String })
  ville: string;
  @Prop({ require: true, type: String })
  code_p: string;
  @Prop({ require: true, type: String })
  email: string;
  @Prop({ require: true, type: String })
  situation: string;
  @Prop({ require: true, type: String })
  niveau: string;
  @Prop({ type: String })
  specia?: string;
  @Prop({ require: true, type: String })
  experi: string;
  @Prop({ require: true, type: Boolean })
  question1: boolean;
  @Prop({ require: true, type: String })
  question2: string;
  @Prop({ require: true, type: String })
  question3: string;
  @Prop({ require: true, type: String })
  cover_cv: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
