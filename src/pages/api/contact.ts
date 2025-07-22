import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(
  import.meta.env.RESEND_API_KEY || "dummy-key-for-dev",
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Skip email sending in development if no API key
    if (!import.meta.env.RESEND_API_KEY) {
      console.log("Development mode: Email not sent");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Development mode - email not sent",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Mark's Property Services <noreply@markspropertyservice.co.uk>",
      to: ["info@markspropertyservice.co.uk"],
      subject: `New Contact Form - ${name}`,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
