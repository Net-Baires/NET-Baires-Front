import React from "react";
import { Sponsor } from "../../../services/models/sponsor";
import { withFormik, FormikProps, Form, Field } from "formik";
import * as yup from "yup"; // for everything
// Shape of form values
interface FormValues extends Sponsor {}

const EditSponsorForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;

  return (
    <Form className="lgx-contactform">
      <div className="form-group">
        <label>Nombre</label>
        <Field type="name" name="name" className="form-control" />
        {touched.name && errors.name && (
          <div className="form-error alert alert-danger">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <Field
          component="textarea"
          rows="4"
          type="description"
          name="description"
          className="form-control"
        />
        {touched.description && errors.description && (
          <div className="form-error alert alert-danger">
            {errors.description}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Url Sitio Web </label>
        <Field
          component="input"
          type="siteUrl"
          name="siteUrl"
          className="form-control"
        />
        {touched.siteUrl && errors.siteUrl && (
          <div className="form-error alert alert-danger">{errors.siteUrl}</div>
        )}
      </div>
      <div className="form-group">
        <label>Logo</label>
        <Field type="logoUrl" name="logoUrl" className="form-control" />
        {touched.logoUrl && errors.logoUrl && (
          <div className="form-error alert alert-danger">{errors.logoUrl}</div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-full-width"
      >
        Submit
      </button>
    </Form>
  );
};

interface MyFormProps extends Sponsor {
  saveSponsor: (sponsor: Sponsor) => void;
}
const EditAllSponsorFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Nombre Requerido"),
    logoUrl: yup.string().required("Logo Requerido"),
    siteUrl: yup.string().required("Url de Sitio Web Requerido")
  }),

  handleSubmit: (values: any, { props }) => {
    props.saveSponsor(values);
  }
})(EditSponsorForm);

interface EditAllSponsorProps extends Sponsor {
  saveSponsor: (sponsor: Sponsor) => void;
}
const EditAllSponsor: React.SFC<EditAllSponsorProps> = props => {
  return (
    <>
      <h1>{props.name}</h1>
      <EditAllSponsorFormik {...props}></EditAllSponsorFormik>
    </>
  );
};
export default EditAllSponsor;
