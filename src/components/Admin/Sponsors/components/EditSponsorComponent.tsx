import React, { MouseEvent, useEffect } from "react";
import { Sponsor } from "../../../../services/models/sponsor";
import { withFormik, FormikProps, Form, Field } from "formik";
import * as yup from "yup"; // for everything
interface FormValues extends Sponsor {
  imageData?: File;
  imagePreview?: string;
}

const EditSponsorComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setFieldValue } = props;
  useEffect(() => {
    if (props.values.logoUrl != null)
      setFieldValue("imagePreview", props.values.logoUrl);
  }, []);
  const changeFile = (event: MouseEvent<HTMLInputElement>, file: any) => {
    event.preventDefault();
    setFieldValue("imageData", file);
    const url = URL.createObjectURL(file);
    setFieldValue("imagePreview", url);
  };
  return (
    <>

      <Form >
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

        <div className="input-group">
          <div className="custom-file">
            <label>Logo</label>

            <input
              type="file"
              onChange={(event: any) => {
                changeFile(event, event.currentTarget.files[0]);
              }}
              name="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            ></input>
            <label className="custom-file-label">Choose file</label>
            {touched.imageData && errors.imageData && (
              <div className="form-error alert alert-danger">
                {errors.imageData}
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-xs-12 col-md-8 image-badge-prview-container">
              <img
                className="image-badge-prview"
                src={props.values.imagePreview}
              ></img>
            </div>
            <div className="col-md-2"></div>

          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-full-width"
        >
          Guardar
      </button>
      </Form>
    </>
  );
};

interface MyFormProps extends Sponsor {
  saveSponsor: (sponsor: Sponsor, logo: File) => void;
  imageData?: File;
}
const EditAllSponsorFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Campo Requerido"),
    description: yup.string().required("Campo Requerido"),
    siteUrl: yup.string().required("Campo Requerido"),
    imagePreview: yup.string().required("Campo Requerido")
  }),

  handleSubmit: (values: any, { props }) => {
    props.saveSponsor(values, values.imageData!);
  }
})(EditSponsorComponentForm);

interface EditAllSponsorProps extends Sponsor {
  saveSponsor: (sponsor: Sponsor, logo: File) => void;
}
export const EditSponsorComponent: React.SFC<EditAllSponsorProps> = props => {
  return (
    <>
      <h1>{props.name}</h1>
      <EditAllSponsorFormik {...props}></EditAllSponsorFormik>
    </>
  );
};
