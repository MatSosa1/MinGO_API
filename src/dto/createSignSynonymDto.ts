import { IsNotEmpty, IsString, IsInt, MinLength } from "class-validator";

export class CreateSignSynonymDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  synonym_word!: string;

  @IsInt()
  sign_id!: number;
}
