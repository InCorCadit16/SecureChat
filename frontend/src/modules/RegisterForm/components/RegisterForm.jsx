import React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";

import { Button, Block, FormField } from "components";

const success = false;

const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props;
  return (
    <div>
      <div className="auth__top">
        <h2>Sign up</h2>
        <p>You need to sign up in order to access secure chat</p>
      </div>
      <Block>
        {!success ? (
          <Form onSubmit={handleSubmit} className="login-form">
            <FormField
              name="email"
              icon="mail"
              placeholder="Email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="fullname"
              icon="user"
              placeholder="Full name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password"
              icon="lock"
              placeholder="Password"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password_2"
              icon="lock"
              placeholder="Confirm password"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <Form.Item>
              {isSubmitting && !isValid && <span>Error!</span>}
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                type="primary"
                size="large"
              >
                Sign up
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signin">
              Sign in
            </Link>
          </Form>
        ) : (
          <div className="auth__success-block">
            <div>
              <Icon type="info-circle" theme="twoTone" />
            </div>
            <h2>Confirm your account</h2>
            <p>
              A confirmation link was sent to your email.
            </p>
          </div>
        )}
      </Block>
    </div>
  );
};

export default RegisterForm;
