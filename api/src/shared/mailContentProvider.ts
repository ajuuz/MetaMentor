import { config } from "./config";
import { MAIL_CONTENT_PURPOSE } from "./constants";

export function mailContentProvider(purpose:string,data?:any):string{

    const {OTP,MENTOR_ACCEPTANCE,MENTOR_REJECTION,FORGOT_PASSWORD}=MAIL_CONTENT_PURPOSE
    switch(purpose){
        case OTP:
          return `<div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <h2 style="text-align: center; color: #333;">🔐 OTP Verification</h2>
            <p style="font-size: 16px; color: #555;">Hi there,</p>
            <p style="font-size: 16px; color: #555;">Use the following OTP to complete your signup process:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; font-size: 24px; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; letter-spacing: 3px;">${data}</span>
            </div>
            <p style="font-size: 14px; color: #888;">⚠️ This code is valid for 1 minutes. Please do not share it with anyone.</p>
            <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— Meta Mentor Team</p>
          </div>
            `;
        
        case MENTOR_ACCEPTANCE:
            return `<div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                         <h2 style="text-align: center; color: #333;">🎉 Welcome Aboard, Mentor!</h2>
                         <p style="font-size: 16px; color: #555;">Dear Mentor,</p>
                         <p style="font-size: 16px; color: #555;">
                           Congratulations! Your application to become a mentor on <strong>Meta Mentor</strong> has been officially accepted.
                         </p>
                         <p style="font-size: 16px; color: #555;">
                           We are thrilled to have someone of your caliber join our community of educators and changemakers. Your knowledge, experience, and dedication will surely inspire many.
                         </p>
                         <div style="text-align: center; margin: 30px 0;">
                           <span style="display: inline-block; font-size: 18px; background-color: #16a34a; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
                             You're officially a Meta Mentor! 🌟
                           </span>
                         </div>
                         <p style="font-size: 14px; color: #666;">
                           Your profile is now active, and students can soon start connecting with you. Get ready to make a difference!
                         </p>
                         <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— The Meta Mentor Team</p>
                    </div>`;
            
            case MENTOR_REJECTION:
                return `
                     <div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #fff9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                      <h2 style="text-align: center; color: #d32f2f;">❌ Application Update</h2>
                      <p style="font-size: 16px; color: #555;">Dear Applicant,</p>
                      <p style="font-size: 16px; color: #555;">
                        Thank you for your interest in becoming a mentor with <strong>Meta Mentor</strong>. After carefully reviewing your application, we regret to inform you that it has not been approved at this time.
                      </p>
                      <p style="font-size: 16px; color: #555;">
                        Please know that this decision was not easy. While we truly value your effort and enthusiasm, we believe that there may be other ways for you to grow and engage with our community in the future.
                      </p>
                      <div style="text-align: center; margin: 30px 0;">
                        <span style="display: inline-block; font-size: 16px; background-color: #fef3c7; color: #92400e; padding: 10px 20px; border-radius: 6px;">
                          We encourage you to apply again after gaining more experience or refining your profile.<br/>
                          Reason : ${data}
                        </span>
                      </div>
                      <p style="font-size: 14px; color: #666;">
                        We sincerely appreciate your interest and wish you continued success in all your endeavors.
                      </p>
                      <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— The Meta Mentor Team</p>
                     </div>
                    `;

            case FORGOT_PASSWORD:
                return `<div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                          <h2 style="text-align: center; color: #333;">🔐 Password Reset Request</h2>
                          <p style="font-size: 16px; color: #555;">Hi there,</p>
                          <p style="font-size: 16px; color: #555;">We received a request to reset your password. Click the button below to proceed:</p>
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="${config.client.uri}/forgotPassword/reset/${data}" style="background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 16px;">Reset Password</a>
                          </div>
                          <p style="font-size: 14px; color: #888;">⚠️ This link will expire in 15 minutes. If you did not request a password reset, please ignore this email.</p>
                          <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— Meta Mentor Team</p>
                        </div>
                        `;

            default:
                return ""

    }
}
