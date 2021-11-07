import * as React from "react";
import * as yup from "yup";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "./Button";
import { FormField } from "./form/Field";
import { Input } from "./form/Input";
import { Textarea } from "./form/Textarea";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const schema = yup.object().shape({
  name: yup.string().min(2).max(255),
  email: yup.string().email().min(2).max(255),
  message: yup.string().min(5),
});

export const ContactSection = () => {
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(
    data: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>,
  ) {
    const res = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      setMessage("Successfully sent message! You should get an email with a confirmation.");
      helpers.resetForm();
    } else {
      if (res.status === 429) {
        setMessage("Woah! You're moving to fast. Please try again in several minutes.");
      } else {
        setMessage("Could not sent the email. Please try again later.");
      }
    }
  }

  async function handleValidate(values: typeof initialValues) {
    const { errors } = await schema.validate(values, { abortEarly: false }).catch((e) => e);

    // eslint-disable-next-line @typescript-eslint/ban-types
    return errors?.reduce((ac: {}, v: string) => ({ ...ac, [v.split(" ")[0]!]: v }), {}) ?? {};
  }

  return (
    <section className="pb-5 mt-10" id="contact">
      <h1 className="text-3xl font-bold capitalize md:text-4xl">Contact Me</h1>

      <Formik
        validate={handleValidate}
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, errors, values, touched }) => (
          <Form className="mt-3" onSubmit={handleSubmit}>
            {message ? <p className="p-2 px-3 mb-3 rounded-md bg-blue-2">{message}</p> : null}

            <FormField id="name" label="Name">
              <Input
                value={values.name}
                hasError={errors.name && touched.name}
                name="name"
                onChange={handleChange}
                id="name"
              />
              <ErrorMessage
                render={(msg) => <span className="text-red-500">{msg}</span>}
                component="span"
                name="name"
              />
            </FormField>

            <FormField id="email" label="Email">
              <Input
                value={values.email}
                hasError={errors.email && touched.email}
                name="email"
                onChange={handleChange}
                id="email"
              />
              <ErrorMessage
                render={(msg) => <span className="text-red-500">{msg}</span>}
                component="span"
                name="email"
              />
            </FormField>

            <FormField className="mb-0" id="message" label="Message">
              <Textarea
                value={values.message}
                hasError={errors.message && touched.message}
                name="message"
                onChange={handleChange}
                id="message"
              />
              <ErrorMessage
                render={(msg) => <span className="text-red-500">{msg}</span>}
                component="span"
                name="message"
              />
            </FormField>

            <div className="flex items-start justify-between mt-2">
              <a className="italic underline" href="mailto:casper.iversen2@gmail.com">
                Send me an email directly
              </a>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};
