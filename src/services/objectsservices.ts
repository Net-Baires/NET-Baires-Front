export const isEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const hasAny = (obj: any[]) => {
  if (obj == null) return false;
  if (obj.length > 0) return true;
  else return false;
};
