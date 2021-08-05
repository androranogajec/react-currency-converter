import * as yup from "yup";
const isInput = (arg) => {
  let schema = yup.object().shape({
    input: yup.number().positive().required(),
  });
  return schema
    .isValid({
      input: arg,
    })
    .then((res) => {
      return res;
    });
};
export default isInput;
