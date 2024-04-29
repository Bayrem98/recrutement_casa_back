import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class UpdateUsersDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  nom?: string;
  @IsOptional()
  prenom?: string;
  @IsOptional()
  num_cin?: string;
  @IsDate()
  @IsOptional()
  date_naiss?: string;
  @IsOptional()
  num_tel1?: string;
  @IsOptional()
  num_tel2?: string;
  @IsOptional()
  adresse?: string;
  @IsOptional()
  ville?: string;
  @IsOptional()
  code_p?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  situation?: string;
  @IsOptional()
  niveau?: string;
  @IsOptional()
  specia?: string;
  @IsOptional()
  experi?: string;
  @IsOptional()
  question1?: string;
  @IsOptional()
  question2?: string;
  @IsOptional()
  question3?: string;
  @IsOptional()
  cover_cv?: string;
  @IsOptional()
  status?: string;
  @IsOptional()
  categorie?: string;
}
