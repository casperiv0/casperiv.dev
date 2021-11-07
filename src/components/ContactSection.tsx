import * as yup from "yup";
import { Form, Formik, ErrorMessage } from "formik";
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
  async function onSubmit(data: typeof initialValues) {
    console.log({ data });

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  async function handleValidate(values: typeof initialValues) {
    const { errors } = await schema.validate(values, { abortEarly: false }).catch((e) => e);

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
        {({ handleSubmit, handleChange, errors, touched }) => (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <FormField id="name" label="Name">
              <Input
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

            <FormField id="message" label="Message">
              <Textarea
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

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};
