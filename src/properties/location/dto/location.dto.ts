import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class LocationDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    lng: number;
}