import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FormikErrors } from "formik";
interface Dictionary {
  [key: string]: string;
}
type HandleChange = (
  eventOrPath: string | React.ChangeEvent<any>
) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
export const inputTextArea = <TData extends Dictionary>(
  errors: FormikErrors<TData>,
  label: string,
  name: keyof TData,
  values: any,
  handleChange: HandleChange,
  rows: number = 10
) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea
      rows={rows}
      name={name as string}
      className={errors[name] ? "form-control is-invalid" : "form-control"}
      value={values[name]}
      onChange={handleChange}
    ></textarea>
    {errors[name] ? (
      <label className="error jquery-validation-error small form-text invalid-feedback">
        {errors[name]}
      </label>
    ) : null}
  </div>
);

export const inputText = <TData extends Dictionary>(
  errors: FormikErrors<TData>,
  label: string,
  name: keyof TData,
  values: any,
  handleChange: HandleChange
) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      name={name as string}
      className={errors[name] ? "form-control is-invalid" : "form-control"}
      value={values[name]}
      onChange={handleChange}
    ></input>
    {errors[name] ? (
      <label className="error jquery-validation-error small form-text invalid-feedback">
        {errors[name]}
      </label>
    ) : null}
  </div>
);

export const inputSelect = <TData extends Dictionary>(
  errors: FormikErrors<TData>,
  label: string,
  name: keyof TData,
  options: Array<{ value: string; text: string }>,
  disabled: boolean = false,
  values: any,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => any
) => (
  <div className="form-group">
    <label>{label}</label>
    <select
      disabled={disabled}
      name={label}
      className={errors[name] ? "form-control is-invalid" : "form-control"}
      value={values[name]}
      onChange={(e) => {
        setFieldValue(name as string, e.target.value);
      }}
    >
      {options &&
        options.map((x) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
    </select>
    {errors[name] ? (
      <label className="error jquery-validation-error small form-text invalid-feedback">
        {errors[name]}
      </label>
    ) : null}
  </div>
);
