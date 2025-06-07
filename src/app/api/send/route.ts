import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/ContactFormEmail";
import React from "react";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "E-posta ve mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "berkankaygusuz@aof.anadolu.edu.tr",
      subject: "Portfolyo Sitenizden Yeni Mesaj",
      replyTo: email,
      react: React.createElement(ContactFormEmail, {
        senderEmail: email,
        message: message,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
