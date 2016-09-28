export function model (props) {
  let valid = false

  if (props.uuid) { valid = true }

  return {
    fields: {
      productionId: props.uuid,
      productionName: props.productionName || '',
      country: props.country || '',
      state: props.state || '',
      city: props.city || '',
      locality: props.locality || '',
      street: props.street || '',
      number: props.number || '',
      neighborhood: props.neighborhood || '',
      zipCode: props.zipCode || '',
      latitude: props.latitude || '',
      longitude: props.longitude || '',
      pickings: props.pickings || '',
      hectares: props.hectares || '',
      greenhouses: props.greenhouses || '',
      openfields: props.openfields || '',
      waterOrigin: props.waterOrigin || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      productionName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      pickings_valid: valid,
      hectares_valid: valid,
      waterOrigin_valid: valid
    },
    showSubmit: valid
  }
}
