import React, { useState, useEffect } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import { EventDetail } from "../../../../services/models/Events/Event";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Draft from "react-wysiwyg-typescript";
import { EditorState, ContentState } from "draft-js";

interface FormValues extends EventDetail {
  imageData?: File;
  imagePreview?: string;
  descriptionHtml?: EditorState;
}

const EditEventComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setFieldValue } = props;
  useEffect(() => {
    if (props.values.imageUrl != null)
      setFieldValue("imagePreview", props.values.imageUrl);
    if (props.values.description != null)
      setFieldValue(
        "descriptionHtml",
        EditorState.createWithContent(
          ContentState.createFromText(props.values.description)
        )
      );
  }, []);
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
        <Field type="title" name="title" className="form-control" />
        {touched.title && errors.title && (
          <div className="form-error alert alert-danger">{errors.title}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <Draft
          wrapperClassName="badge-description-wrapper"
          editorClassName="badge-description-editor"
          editorState={props.values.descriptionHtml}
          onEditorStateChange={(state: any) => {
            setFieldValue("descriptionHtml", state);
          }}
        />
        {touched.descriptionHtml && errors.descriptionHtml && (
          <div className="form-error alert alert-danger">
            {errors.descriptionHtml}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Plataforma</label>
        <Field
          type="platform"
          name="platform"
          disabled
          className="form-control"
        />
        {touched.platform && errors.platform && (
          <div className="form-error alert alert-danger">{errors.platform}</div>
        )}
      </div>
      <div className="form-group">
        <label>Done</label>
        <Field type="done" name="done" disabled className="form-control" />
        {touched.done && errors.done && (
          <div className="form-error alert alert-danger">{errors.done}</div>
        )}
      </div>
      <div className="form-group">
        <label>Live</label>
        <Field type="live" name="live" disabled className="form-control" />
        {touched.live && errors.live && (
          <div className="form-error alert alert-danger">{errors.live}</div>
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

interface MyFormProps extends EventDetail {
  saveEvent: (event: EventDetail) => void;
}
const EditAlleventFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    title: yup.string().required("Campo Requerido"),
    description: yup.string().required("Campo Requerido")
  }),
  handleSubmit: (values: any, { props }) => {
    props.saveEvent(values);
  }
})(EditEventComponentForm);

type EditEventComponentProps = {
  event: EventDetail;
  saveEvent: (event: EventDetail) => void;
};
export const EditEventComponent: React.SFC<EditEventComponentProps> = ({
  event,
  saveEvent: saveEvent
}) => {
  const [eventToEdit] = useState(event);
  return (
    <>
      <EditAlleventFormik
        {...eventToEdit}
        saveEvent={saveEvent}
      ></EditAlleventFormik>
    </>
  );
};
