import React, { useState, MouseEvent } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import { BadgeDetail } from "../../../../services/models/BadgeDetail";
interface FormValues extends BadgeDetail {}

var formDataGlobal: FormData;
export const keepFile = (formData: FormData) => {
  formDataGlobal = formData;
};
export const getFile = (): FormData => {
  return formDataGlobal;
};
const EditBadgeComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const changeFile = (event: MouseEvent<HTMLInputElement>, file: any) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("ImageFile", file);
    keepFile(formData);
  };
  return (
    <Form
      className="lgx-contactform"
      onSubmitCapture={(a: any) => {
        console.log(a);
      }}
    >
      <div className="form-group">
        <label>Nombre</label>
        <Field type="name" name="name" className="form-control" />
        {touched.name && errors.name && (
          <div className="form-error alert alert-danger">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <Field type="name" name="description" className="form-control" />
        {touched.description && errors.description && (
          <div className="form-error alert alert-danger">
            {errors.description}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event: any) => {
            changeFile(event, event.currentTarget.files[0]);
          }}
        />
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

interface MyFormProps extends BadgeDetail {
  saveBadge: (badge: BadgeDetail, image: FormData) => void;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Campo Requerido"),
    description: yup.string().required("Campo Requerido")
  }),
  handleSubmit: (values: any, { props }) => {
    props.saveBadge(values, {} as FormData);
  }
})(EditBadgeComponentForm);

type EditBadgeComponentProps = {
  badge: BadgeDetail;
  saveBadge: (badge: BadgeDetail, image: FormData) => void;
};
export const EditBadgeComponent: React.SFC<EditBadgeComponentProps> = ({
  badge,
  saveBadge
}) => {
  const [userBadgeToEdit] = useState(badge);
  const saveBadgeLocal = (badge: BadgeDetail, image: FormData) => {
    saveBadge(badge, getFile());
  };
  return (
    <>
      <EditAllUserFormik
        {...userBadgeToEdit}
        saveBadge={saveBadgeLocal}
      ></EditAllUserFormik>
    </>
  );
};
