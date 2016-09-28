export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      hostelId: props.uuid,
      hostelName: props.hostelName || '',
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
      responsibleHostel: props.responsibleHostel || '',
      responsiblePhone: props.responsiblePhone || '',
      responsibleEmail: props.responsibleEmail || '',
      numberHouses: props.numberHouses || '',
      numberInhabitants: props.numberInhabitants || ''
    },
    validates: {
      hostelName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      responsibleHostel_valid: valid,
      responsiblePhone_valid: valid,
      responsibleEmail_valid: valid
    }
  }
}
