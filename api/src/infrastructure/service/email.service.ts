import { IEmailService } from "application/interfaces/service/email-service.interface";
import nodemailer from "nodemailer";
import { config } from "shared/config";
import { EVENT_EMITTER_TYPE } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { injectable } from "tsyringe";

@injectable()
export class EmailService implements IEmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.EMAIL,
        pass: config.email.PASSWORD,
      },
    });

    this._registerEventListeners();
  }

  private _registerEventListeners(): void {
    eventBus.on(EVENT_EMITTER_TYPE.SEND_MAIL, this.sendMail.bind(this));
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: "Meta Mentor",
      to,
      subject,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
