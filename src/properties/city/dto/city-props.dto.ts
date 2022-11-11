import { PartialType } from "@nestjs/mapped-types";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";

function transform (stuff : TransformFnParams) {
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

class CityPropsDto {
    @IsBoolean()
    @Transform(transform)
    active: boolean;

    @Type(() => Number)
    @IsNumber()
    minPrice: number;

    @Type(() => Number)
    @IsNumber()
    maxPrice: number;
}

export class CityQueryDto extends PartialType (CityPropsDto) {
}