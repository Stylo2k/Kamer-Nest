import { Property, User } from "@prisma/client";



export class SafeUserDto {
    id: number;
    firstName : string;
    lastName : string;
    lastLogin : Date;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(user : User) {
        if (!user) return;
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.lastLogin = user.lastLogin;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}