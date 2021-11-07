import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
});

export function middleWare(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

mail.setApiKey(process.env.MAIL_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  await middleWare(req, res, limiter);

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (!["email", "name", "message"].every((k) => body[k])) {
    return res.status(500).send({ error: "email, name and message are required." });
  }

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
