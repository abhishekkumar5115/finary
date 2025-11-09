import {IsEmail,MinLength,IsNotEmpty} from 'class-validator'

export class LoginUserDto{
    @IsEmail({},{message:"provide correct email"})
    email:string

    @IsNotEmpty({message:"Password should not be empty"})
    @MinLength(6,{message:"password should be minimum of 6 character"})
    password: string
}