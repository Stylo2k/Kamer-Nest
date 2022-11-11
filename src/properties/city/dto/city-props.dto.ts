import { PartialType } from "@nestjs/mapped-types";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

function transformActive (stuff : TransformFnParams) {
    if (stuff.value === undefined) {
        return undefined;
    }
    if (stuff.value.toLowerCase().trim() === 'true') {
        return true;
    }
    if (stuff.value.toLowerCase().trim() === 'false') {
        return false;
    }
    return undefined;
}

function transformOrder(stuff : TransformFnParams) {
    if (stuff.value === undefined) {
        return undefined;
    }
    if (stuff.value.toLowerCase().trim() === 'asc') {
        return 'asc';
    }
    if (stuff.value.toLowerCase().trim() === 'desc') {
        return 'desc';
    }
    return undefined;
}

class CityPropsDto {
    @IsBoolean()
    @Transform(transformActive)
    active: boolean;

    @Type(() => Number)
    @IsNumber()
    minPrice: number;

    @Type(() => Number)
    @IsNumber()
    maxPrice: number;
    
    @Type(() => Number)
    @IsNumber()
    top: number = 10;

    @IsString()
    @Transform(transformOrder)
    order: 'asc' | 'desc' = 'asc';
}

export class CityQueryDto extends PartialType (CityPropsDto) {
}