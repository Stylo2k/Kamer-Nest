import { PartialType } from "@nestjs/mapped-types";
import { ReqPropertyDto } from "./add-property.dto";

// PartialType will make all the properties optional
export class UpdatePropertyDto extends PartialType (ReqPropertyDto) {};