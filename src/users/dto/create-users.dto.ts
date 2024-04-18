export default class CreateUsersDto {
  nom: string;
  prenom: string;
  num_cin: string;
  date_naiss: string;
  num_tel1: string;
  num_tel2?: string;
  adresse: string;
  ville: string;
  code_p: string;
  email: string;
  situation: string;
  niveau: string;
  specia?: string;
  experi: string;
  question1: string;
  question2: string;
  question3: string;
  cover_cv: string;
  status?: string;
}
