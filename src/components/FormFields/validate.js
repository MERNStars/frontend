const validate = values => {
  const errors = {};
  if (!values.event_name) {
    errors.event_name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.event_date) {
    errors.event_date = "Required";
  }
  if (!values.event_date) {
    errors.event_date = "Required";
  }
  if (!values.event_start_time) {
    errors.event_start_time = "Required";
  }
  if (!values.event_end_time) {
    errors.event_end_time = "Required";
  }
  if (!values.registration_closed_date) {
    errors.registration_closed_date = "Required";
  }
  if (!values.minimum_age) {
    errors.minimum_age = "Required";
  }
  if (!values.event_capacity) {
    errors.event_capacity = "Required";
  }

  return errors;
};

export default validate;
