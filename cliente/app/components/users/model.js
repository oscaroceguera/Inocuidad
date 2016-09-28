export function model (props) {
  let selection = props.value || []
  let valid = false
  let modulesTrim

  if (props.uuid) {
    valid = true

    // split a string object into array of string by separating with ','
    // map create a new array
    modulesTrim = props.modules.split(',').map((module) => {
      // remove whitespaceing
      return module.trim()
    })
  }

  return {
    open: true,
    modules: modulesTrim || selection,
    fields: {
      userId: props.uuid,
      name: props.name || '',
      firstSurname: props.first_surname || '',
      secondSurname: props.second_surname || '',
      email: props.email || '',
      pass: props.pass || '',
      passConfirm: props.passConfirm || ''
    },
    validates: {
      name_valid: valid,
      firstSurname_valid: valid,
      secondSurname_valid: valid,
      email_valid: valid,
      pass_valid: valid,
      passConfirm_valid: valid
    },
    showSubmit: valid
  }
}
