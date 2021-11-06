import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const method = req.method as keyof typeof handlers;

  const view = await prisma.view.findUnique({ where: { slug } });

  const handlers = {
    GET: async () => {
      if (!view) {
        return handlers.POST();
      }
      return view;
    },
    POST: async () => {
      if (!view) {
        return prisma.view.create({
          data: {
            count: 1,
            slug,
          },
        });
      }

      return prisma.view.update({
        where: { slug },
        data: { count: { increment: 1 } },
      });
    },
  };

  const handler = handlers[method];

  if (!handler) {
    return res.status(405).send("Method Not Allowed");
  }

  const json = await handler();
  return res.status(200).json(json);
}
