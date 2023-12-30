import { mailer } from "@/lib/nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import ResetEmail from "@/emails/ResetEmail";

export const POST = async (req: Request) => {
  const { otp, email } = await req.json();

  if (!otp || !email) {
    return new NextResponse("OTP and email is required!", { status: 400 });
  }

  const html = render(ResetEmail({ otp }));

  try {
    const mail = await mailer.sendMail({
      to: email, // Change to your recipient
      from: '"BharatChat" <contact@metalgroundai.com>', // Change to your verified sender
      subject: "Reset Password",
      text: "OTP for resetting password",
      html: html,
    });
    return new NextResponse(JSON.stringify(mail), { status: 200 });
  } catch (error) {
    console.log(`[EMAIL ERROR]`, error);
    return new NextResponse("Failed to send email!", { status: 500 });
  }
};
