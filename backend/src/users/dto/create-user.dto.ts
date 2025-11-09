import {IsEmail,IsNotEmpty,MinLength,Matches} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({message:"FullName should not be empty"})
    full_name:string

    @IsEmail({},{message:"provide correct mail"})
    email:string

    @MinLength(6,{message:"Password should be minimum of 6 character"})
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,{
        message:"Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }
    )
    password:string

}
