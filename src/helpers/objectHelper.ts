export const fillAllFieldWithDefaultValue = <TObject, TDefaultValue>(
  obj: TObject,
  defaultValue: TDefaultValue
) => {
  Object.keys(obj).forEach((key: string) => {
    if ((obj as any)[key] == null) (obj as any)[key] = defaultValue;
  });
};
