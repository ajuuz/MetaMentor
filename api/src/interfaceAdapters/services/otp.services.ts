import { injectable } from "tsyringe";

@injectable()
export class OtpService {

    generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
    }

}