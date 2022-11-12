import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor(private authService : AuthService) {
        super();
    }
    handleRequest(err : any, user : any, info : any, context : ExecutionContext, status : any) {
        user =  context.getArgByIndex(0).body;
        const request = context.switchToHttp().getRequest();
        const { email, password } = request.body;
        if (err || !user) {
            if (!email) {
                throw new HttpException({ message: 'email cannot be empty' }, HttpStatus.OK);
            } else if (!password) {
                throw new HttpException({ message: 'password cannot be empty' }, HttpStatus.OK);
            }
            throw err || new UnauthorizedException();
        }
        user = this.authService.login(user);
        return user;
    }

    async canActivate(context: ExecutionContext) {
        try {
            const canActivatePromise = super.canActivate(context);
            const result = (await canActivatePromise) as boolean;
            const request = context.switchToHttp().getRequest();
            await super.logIn(request);
            return result;
        } catch (err) {
            console.log(err);
        }
        return false;
    }
}