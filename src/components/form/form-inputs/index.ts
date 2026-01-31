import { FieldErrors, FieldValues } from "react-hook-form";

export const getDeepFormErrorName = (
  index: number,
  name: string,
  errors: FieldErrors<FieldValues>,
) => {
  const findTheNumberInsideTheName = name.match(/\d+/);
  const findThePathAfterTheNumber = name.match(/\.\w+$/);
  const getFirstPathOfName = name.match(/^[^.]+/);
  return errors[getFirstPathOfName?.[0] ?? 0]?.[
    Number(findTheNumberInsideTheName?.[0])
  ]?.[findThePathAfterTheNumber?.[index]?.replace(".", "")];
};
