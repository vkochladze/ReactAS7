// import React from 'react';
import classes from "./App.module.css"
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'
import { Button } from 'primereact/button';
import { useFormik } from "formik";
import * as yup from 'yup';
import { classNames } from "primereact/utils";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("This field is required"),
  password: yup.string().min(8, "minimum length: 8").max(16, "maximum length: 16"),
})




const Form = () => {

const formik = useFormik({
  validationSchema: validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
  onSubmit: (values) => {
    console.log(values);
  }
})

const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

function buttonClick() {
  formik.handleSubmit();
}

    return (
      <div className={classes.form}>
      <Card >
        <div className={classes.panel}>
          <h1>Sign In</h1>
          <InputText
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            placeholder="Email"
            className={classNames({
              'p-invalid': isFormFieldInvalid('email')
            })}
          />
          {isFormFieldInvalid('email') && (
            <span>{formik.errors.email}</span>
          )}
          <InputText
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            placeholder="Password"
            className={classNames({
              'p-invalid': isFormFieldInvalid('password')
            })}
          />
          {isFormFieldInvalid('password') && (
              <span>{formik.errors.password}</span>
            )}


          <Button type="submit" label="Sign In" onClick={buttonClick} />
          </div>
        </Card>
</div>
    );
};

export default Form;