import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Property } from "@prisma/client";

export class ReqPropertyDto {
    @IsNumber()
    areaSq: number;
    @IsString()
    city: string;
    @IsString()
    coverImageUrl: string;
    @IsBoolean()
    furnished: boolean;
    @IsNumber()
    latitude: number;
    @IsNumber()
    longitude: number;
    @IsString()
    postalCode: string;
    @IsString()
    type: string;
    @IsNumber()
    rent: number;
    @IsString()
    title: string;
    @IsNumber()
    deposit: number;
    @IsString()
    gender: string;
    @IsBoolean()
    active: boolean;
    @IsString()
    description: string;
    @IsBoolean()
    pets: boolean;
    
    createdAt: Date;
    updatedAt: Date;

    constructor(property : Property | undefined) {
        if (!property) return;
        this.areaSq = property.areaSq;
        this.city = property.city;
        this.coverImageUrl = property.coverImageUrl;
        this.furnished = property.furnished;
        this.latitude = property.latitude;
        this.longitude = property.longitude;
        this.postalCode = property.postalCode;
        this.type = property.type;
        this.rent = property.rent;
        this.title = property.title;
        this.deposit = property.deposit;
        this.gender = property.gender;
        this.active = property.active;
        this.description = property.description;
        this.createdAt = property.createdAt;
        this.updatedAt = property.updatedAt;
        this.pets = property.pets;
    }
}