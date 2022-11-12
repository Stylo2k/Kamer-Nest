import { SafeUserDto } from "src/user/dto"
import { JwtPayload } from "./jwt-payload.dto"

export interface ReqUser extends SafeUserDto {
    payload : JwtPayload
}