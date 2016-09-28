export function model (props) {
  let validation = false
  if (props.uuid) { validation = true }

  return {
    fields: {
      packingId: props.uuid,
      packingName: props.packingName || '',
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
      phone: props.phone || '',
      products: props.products || '',
      volumeProduction: props.volumeProduction || '',
      marketNational: props.marketNational || '',
      marketInternational: props.marketInternational || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      packingName_valid: validation,
      street_valid: validation,
      products_valid: validation,
      country_valid: validation,
      state_valid: validation,
      city_valid: validation
    },
    showSubmit: validation
  }
}
