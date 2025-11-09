import {IsEmail,IsNotEmpty} from 'class-validator'

export class CreateClientDto {
    @IsEmail({},{message:"Provide correct email"})
    email:string

    @IsNotEmpty({message:"Provide correct name"})
    Full_name:string
}
