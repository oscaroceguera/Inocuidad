import _ from 'lodash'
import emailValidator from 'email-validator'
import moment from 'moment'
moment.locale('es')

import {ERROR_TEXT, LOCALITY_TYPES} from './const'

export function errorText (requiredType) {
  return ERROR_TEXT[requiredType]
}

export function errorTextSelect (state, requiredType) {
  if (state === true) {
    return
  }
  return errorText(requiredType)
}

export function validLocalities (key, state) {
  if (!LOCALITY_TYPES[key]) {
    return
  }

  let obj = state

  key = `${key}_valid`

  obj[key] = true

  return obj
}

/*
** Basic catalogs
** catalogName = 'catalogName'
** catalogs : this.props.catalogs
** state : this.state[catalogName]
** isParent : true/ alse
*/
export function basicCatalogs (catalogName, catalogs, state, isParent = false) {
  var items = _.filter(catalogs, (item) => {
    if (isParent) {
      return item.parent_id === state
    }
    return item.catalog === catalogName
  })
  return items
}

/*
** Validate Text (TEXT & EMAIL)
** valueLink = this.inputLinkValue('name')
** validField = 'nameValid'
** validTye = 'text'
** state = this.state.validates
*/
export function validateValueLinkText (valueLink, validField, validType, state) {
  let isText = validType === 'text'
  let isEmail = validType === 'email'
  let numberCount = validType === 'number'

  let type = false
  let obj = state

  if (!valueLink.value) {
    type = false
  } else if ((valueLink.value.length > 1) && (isText)) {
    type = true
  } else if ((emailValidator.validate(valueLink.value)) && (isEmail)) {
    type = true
} else if (numberCount && valueLink.value >= 0) {

    type = true
  }

  obj[validField] = type
  return obj
}

/*
** Validates for sections
** section = this.state[section]
** item = fieldName
** itemState = this.state.fields[item]
** type = text | email | rfc | numberCount
*/
export function validateSections (section, item, itemState, type) {
  let fieldValid = `${item}_valid`
  let valid = '^[A-Za-z]{3,4}[0-9]{6}[A-Za-z0-9]{3}?$'
  let validRfc = new RegExp(valid)

  let itemValid = section

  item = itemState

  if (type === 'text' && item.length > 1) {
    (item.length < 100) ? itemValid[fieldValid] = true : itemValid[fieldValid] = false
  } else if (type === 'email' && emailValidator.validate(item)) {
    itemValid[fieldValid] = true
  } else if (type === 'rfc' && item.match(validRfc) !== null) {
    itemValid[fieldValid] = true
  } else if (type === 'numberCount' && item.length > 0) {
    itemValid[fieldValid] = true
  } else {
    itemValid[fieldValid] = false
  }
  return itemValid
}

/*
** ShowSubmit
*/
export function showSubmit (validates, fields) {
  let defaultValid = _.every(_.values(validates))
  if (!defaultValid) {
    return
  }
  return true
}

/*
** onChange
*/
export function onChange (value, key, state) {
  let obj = state
  obj[key] = value
  return obj
}

/*
** ValuesForTextInfo
*/
export function valuesForTextInfo (item, catalogs = null, isCatalog = false, date = false) {
  if (!item) { return }

  if (isCatalog) {
    let catalogValue = _.filter(catalogs, (catalog) => {
      return catalog.id === item
    })
    item = _.map(catalogValue, (x) => x.value)
  }

  if (date) {
    item = moment(item).format('DD MMMM YYYY')
  }

  return item
}
