import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

// todo: rate-limits

mail.setApiKey(process.env.MAIL_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const msg = {
    to: [process.env.MAIL_CC_EMAIL!, { name: body.name, email: body.email }],
    from: process.env.MAIL_VERIFIED_SENDER!,
    subject: "RE: Confirmation email caspertheghost.me",
    text: `
Hello ${body.name},

You received this email because you sent me an email via my contact form on caspertheghost.me.
I will respond back to you as soon as I can :). Below you can find your message:


${body.message}`,
    html: `
Hello ${body.name},<br/>
<br/>
You received this email because you sent me an email via my contact form on caspertheghost.me.<br/>
I will respond back to you as soon as I can :). Below you can find your message:

<br/>
<br/>

<q>${body.message}</q>`,
  };

  const data = await mail.send(msg).catch(() => null);

  if (!data) {
    return res.status(500).send({ error: "could not send email" });
  }

  return res.status(200).send({});
}
