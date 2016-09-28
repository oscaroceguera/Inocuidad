export function model (props) {
  let valid = false

  if (props.uuid) { valid = true }

  return {
    fields: {
      distId: props.uuid,
      storageName: props.storageName || '',
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
      labels: props.labels || '',
      storageCapacity: props.storageCapacity || '',
      distributionVolume: props.distributionVolume || '',
      providersAmount: props.providersAmount || '',
      certificateProviders: props.certificateProviders || '',
      notCertificateProviders: props.notCertificateProviders || '',
      national: props.national || '',
      international: props.international || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || ''
    },
    validates: {
      storageName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      products_valid: valid,
      labels_valid: valid,
      storageCapacity_valid: valid
    },
    showSubmit: valid
  }
}
