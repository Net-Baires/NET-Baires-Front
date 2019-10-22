import React, { useState, useEffect } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import { getUserProfile, updateUser } from "../../services/userServices";
import { ShareProfile } from "./ShareProfile";
import { User } from "../../services/models/User";
import { loading, ready } from "../../store/loading/actions";
import { connect } from "react-redux";
import { getCurrentUser } from "../../services/authService";
interface FormValues extends User {}

const UserProfileForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <>
      <ShareProfile urlToShare={"www.google.com.ar"}></ShareProfile>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-md-offset-3">
          <Form className="lgx-contactform">
            <div className="form-group">
              <label>Nombre</label>
              <Field
                type="text"
                name="firstName"
                className="form-control lgxname"
              />
              {touched.firstName && errors.firstName && (
                <div className="form-error alert alert-danger">
                  {errors.firstName}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <Field type="lastName" name="lastName" className="form-control" />
              {touched.lastName && errors.lastName && (
                <div className="form-error alert alert-danger">
                  {errors.lastName}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <Field
                disabled
                type="email"
                name="email"
                className="form-control"
              />
              {touched.email && errors.email && (
                <div className="form-error alert alert-danger">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Linkedin</label>
              <Field type="linkedin" name="linkedin" className="form-control" />
              {touched.linkedin && errors.linkedin && (
                <div className="form-error alert alert-danger">
                  {errors.linkedin}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Twitter</label>
              <Field type="twitter" name="twitter" className="form-control" />
              {touched.twitter && errors.twitter && (
                <div className="form-error alert alert-danger">
                  {errors.twitter}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Github</label>
              <Field type="github" name="github" className="form-control" />
              {touched.github && errors.github && (
                <div className="form-error alert alert-danger">
                  {errors.github}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Biografía</label>
              <Field
                component="textarea"
                rows="4"
                type="biography"
                name="biography"
                className="form-control"
              />
              {touched.biography && errors.biography && (
                <div className="form-error alert alert-danger">
                  {errors.biography}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

interface MyFormProps extends User {
  saveUser: (user: User) => void;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    firstName: yup.string().required("Nombre Requerido"),
    lastName: yup.string().required("Nombre Requerido"),
    linkedin: yup.string(),
    twitter: yup.string(),
    github: yup.string(),
    instagram: yup.string()
  }),
  handleSubmit: (values: any, { props }) => {
    props.saveUser(values);
  }
})(UserProfileForm);

type EditAllSponsorProps = {
  loading: () => void;
  ready: () => void;
};
const UserProfileComponent: React.SFC<EditAllSponsorProps> = props => {
  const [userDetail, setUserDetail] = useState({} as User);

  useEffect(() => {
    getUserProfile(getCurrentUser().id).then(u => {
      if (u.firstName == null) u.firstName = "";
      if (u.lastName == null) u.lastName = "";
      if (u.biography == null) u.biography = "";
      if (u.github == null) u.github = "";
      if (u.instagram == null) u.instagram = "";
      if (u.linkedin == null) u.linkedin = "";
      if (u.picture == null) u.picture = "";
      if (u.twitter == null) u.twitter = "";
      setUserDetail(u);
    });
  }, []);
  const saveUser = (user: User) => {
    loading();
    updateUser(user.id, user).then(x => {
      ready();
    });
  };
  return (
    <>
      <EditAllUserFormik
        {...userDetail}
        saveUser={saveUser}
      ></EditAllUserFormik>
    </>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent);
