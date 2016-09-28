export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      pondId: props.uuid,
      pondName: props.pondName || '',
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
      productiontype: props.productiontype || '',
      species: props.species || '',
      numberPonds: props.numberPonds || '',
      waterOrigin: props.waterOrigin || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      pondName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      productiontype_valid: valid,
      species_valid: valid,
      numberPonds_valid: valid,
      waterOrigin_valid: valid
    },
    showSubmit: valid
  }
}
