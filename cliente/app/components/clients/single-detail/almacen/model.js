export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      storehouseId: props.uuid,
      storehouseName: props.storehouseName || '',
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
      storageCapacity: props.storageCapacity || '',
      employeeBase: props.employeeBase || '',
      storageTemperature: props.storageTemperature || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      storehouseName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      products_valid: valid,
      storageCapacity_valid: valid
    },
    showSubmit: valid
  }
}
