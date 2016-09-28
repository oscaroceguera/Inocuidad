export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      plantId: props.uuid,
      plantName: props.plantName || '',
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
      productionCapacity: props.productionCapacity || '',
      packingType: props.packingType || '',
      storageTemperature: props.storageTemperature || '',
      marketNational: props.marketNational || '',
      marketInternational: props.marketInternational || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      plantName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      products_valid: valid
    },
    showSubmit: valid
  }
}
