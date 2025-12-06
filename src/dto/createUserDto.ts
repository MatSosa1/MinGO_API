import { IsNotEmpty, IsInt, IsDateString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  user_name!: string;

  @MinLength(6)
  user_password!: string;

  @IsDateString()
  user_birth_date!: string;

  @IsInt()
  role_id!: number;
}
