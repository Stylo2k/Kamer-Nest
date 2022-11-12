import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client"; 
import { AuthService } from "../auth.service";

export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error | null, user: User) => void) {
        done(null, user);
    }
    
    deserializeUser(payload: any, done: (err: Error | null, payload: string) => void) {
        done(null, payload);
    }
}