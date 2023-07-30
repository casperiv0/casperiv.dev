"use client";

import { ArrowUpRight, Github, Linkedin, Twitter } from "react-bootstrap-icons";
import { TextField } from "../form/text-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_SCHEMA } from "~/lib/schemas";
import { Button } from "../button";
import { useMutation } from "@tanstack/react-query";

export const socialLinks = [
  { icon: Github, name: "GitHub", url: "https://caspertheghost.me/github" },
  { icon: Twitter, name: "Twitter", url: "https://caspertheghost.me/twitter" },
  { icon: Linkedin, name: "LinkedIn", url: "https://caspertheghost.me/linkedin" },
];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export function ContactSection() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(CONTACT_SCHEMA),
    reValidateMode: "onChange",
  });

  const { mutate, data, isLoading, error } = useMutation<
    { message: string },
    Error,
    typeof initialValues
  >({
    onSuccess: () => reset(),
    mutationKey: ["contact-me"],
    mutationFn: async (data) => {
      const res = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      const json = (await res.json()) as { message: string };
      const isValidMessage = typeof json.message === "string" && json.message;
      const isFailedRequest = res.status !== 200;

      if (isFailedRequest || !isValidMessage) {
        const errorMessage = isValidMessage
          ? json.message
          : "Could not sent the email. Please try again later.";
        throw new Error(errorMessage);
      }

      return json;
    },
  });

  const buttonIntent = error ? "error" : data ? "success" : "secondary-light";
  const buttonMessage = error ? "Let's try again?!" : data ? "Sent!" : "Just send it!";

  return (
    <section id="contact" className="bg-secondary text-primary">
      <div className="mx-auto max-w-6xl w-full py-32 px-5 md:px-0">
        <h2 className="font-poppins font-medium text-4xl md:text-5xl relative max-w-fit leading-snug">
          Want to ask me <span className="italic">sum</span>?
          <br />
          Go for it!
        </h2>

        <div className="flex flex-col md:flex-row mt-14 gap-12 justify-between">
          <div className="w-full md:max-w-md">
            <p className="text-gray-extralight font-medium text-inter">
              {"I'm"} like a friendly neighborhood spider, always looking for new connections.
              Except I {"don't"} have eight legs, and I promise not to scare you.
            </p>

            <div className="flex mt-14 gap-12 w-full">
              <ul className="flex flex-col gap-y-2">
                {socialLinks.map((link) => (
                  <li className="group" key={link.name}>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center gap-1 text-gray-extralight hover:text-primary"
                      href={link.url}
                    >
                      {link.name}

                      <ArrowUpRight
                        className="group-hover:scale-110 origin-bottom-left transition"
                        width={12}
                        height={12}
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="w-1/2">
                <p className="uppercase text-sm font-semibold mb-1 text-gray-extralight font-poppins">
                  email me directly
                </p>
                <a href="mailto:hello@caspertheghost.me" className="text-primary">
                  hello@caspertheghost.me
                </a>
              </div>
            </div>
          </div>

          <form className="w-full" onSubmit={handleSubmit((data) => mutate(data))}>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <TextField
                {...register("firstName")}
                autoComplete="given-name"
                onChange={(value) =>
                  setValue("firstName", value, {
                    shouldValidate: true,
                  })
                }
                errorMessage={errors.firstName?.message}
                label="First Name"
              />
              <TextField
                {...register("lastName")}
                autoComplete="family-name"
                onChange={(value) =>
                  setValue("lastName", value, {
                    shouldValidate: true,
                  })
                }
                errorMessage={errors.lastName?.message}
                label="Last Name"
              />
            </div>

            <TextField
              {...register("email")}
              type="email"
              autoComplete="email"
              onChange={(value) =>
                setValue("email", value, {
                  shouldValidate: true,
                })
              }
              errorMessage={errors.email?.message}
              label="Email"
            />

            <TextField
              {...register("message")}
              inputElementType="textarea"
              onChange={(value) =>
                setValue("message", value, {
                  shouldValidate: true,
                })
              }
              errorMessage={errors.message?.message}
              label="Message"
            />

            <div className="flex items-center gap-6 mt-5">
              <Button
                disabled={isLoading}
                extras={isLoading ? "loading" : undefined}
                className="min-w-fit"
                intent={buttonIntent}
                type="submit"
              >
                {buttonMessage}
              </Button>

              {error ? <p className="capitalize text-red-400">{error.message}</p> : null}
              {data ? <p className="capitalize text-green-400">{data.message}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
