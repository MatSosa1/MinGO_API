import { IsNotEmpty, IsString, IsInt, IsOptional, IsEnum, IsUrl, MinLength, IsArray } from "class-validator";

export enum SignSection {
  PRINCIPIANTE = "Principiante",
  INTERMEDIO = "Intermedio",
  AVANZADO = "Avanzado",
  FRASES_COMUNES = "Frases Comunes",
}

export class CreateSignDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  sign_title!: string;

  // NUEVO: Para "Frase exacta" u "Oración de ejemplo"
  @IsNotEmpty() 
  @IsString()
  sign_description!: string; 

  @IsNotEmpty()
  @IsUrl()
  sign_video_url!: string;

  @IsOptional()
  @IsUrl()
  sign_image_url?: string;

  @IsEnum(SignSection)
  sign_section!: SignSection;

  @IsInt()
  tag_id!: number;

  // NUEVO: Sinónimos opcionales en el mismo envío
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  synonyms?: string[]; 
}