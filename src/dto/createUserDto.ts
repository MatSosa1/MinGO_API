import { IsNotEmpty, IsInt, IsDateString, MinLength, IsEmail, IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  user_name!: string;

  @MinLength(6)
  user_password!: string;

  @IsDateString()
  user_birth_date!: string;

  @IsEmail()
  user_email!: string;

  @IsInt()
  role_id!: number;

  @IsNotEmpty()
  user_knowledge_level!: string;

  @IsBoolean()
  user_first_time_login: Boolean;
}
