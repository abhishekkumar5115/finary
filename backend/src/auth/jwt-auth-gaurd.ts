import { Injectable,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Is_Public_Key } from "./public.decorators";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGaurd extends AuthGuard('jwt'){
    constructor(
        private reflactor:Reflector
    ){
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflactor.getAllAndOverride<boolean>(Is_Public_Key,[
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic){
            return true;
        }

        return super.canActivate(context);
    }
}