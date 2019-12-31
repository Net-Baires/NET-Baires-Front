import React, { useState } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import { Member } from "../../../../services/models/Member";
interface FormValues extends Member { }

const EditUserComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className="lgx-contactform">
      {touched.id && (
        <div className="form-group">
          <label>Id</label>
          <Field type="name" name="id" disabled className="form-control" />
          {touched.id && errors.id && (
            <div className="form-error alert alert-danger">{errors.id}</div>
          )}
        </div>
      )}
      <div className="form-group">
        <label>Nombre</label>
        <Field type="firstName" name="firstName" className="form-control" />
        {touched.firstName && errors.firstName && (
          <div className="form-error alert alert-danger">
            {errors.firstName}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Apellido</label>
        <Field type="name" name="lastName" className="form-control" />
        {touched.lastName && errors.lastName && (
          <div className="form-error alert alert-danger">{errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <label>Email</label>
        <Field type="name" name="email" className="form-control" />
        {touched.email && errors.email && (
          <div className="form-error alert alert-danger">{errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <label>Bloqueado</label>
        <Field disabled type="blocked" name="blocked" className="form-control" />
        {touched.blocked && errors.blocked && (
          <div className="form-error alert alert-danger">{errors.blocked}</div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-full-width"
        >
          Guardar
        </button>
      </div>
    </Form>
  );
};

interface MyFormProps extends Member {
  saveUser: (user: Member) => void;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    email: yup
      .string()
      .email()
      .required("Email Requerido"),
    firstName: yup.string().required("Nombre Requerido"),
    lastName: yup.string().required("Nombre Requerido")
  }),
  handleSubmit: (values: any, { props }) => {
    props.saveUser(values);
  }
})(EditUserComponentForm);

type EditUserComponentProps = {
  user: Member;
  saveUser: (user: Member) => void;
};
export const EditUserComponent: React.SFC<EditUserComponentProps> = ({
  user,
  saveUser
}) => {
  const [userToEdit] = useState(user);
  return (
    <>
      <EditAllUserFormik
        {...userToEdit}
        saveUser={saveUser}
      ></EditAllUserFormik>
    </>
  );
};
