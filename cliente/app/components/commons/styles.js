import { Styles } from 'material-ui'

// AuxiLIARS
const MARGIN_WIDTH = {
  margin: '0 .5em'
}

const MARGIN_AUTO = {
  margin: 'auto'
}

const MARGIN_ROW = {
  margin: '.5em 0'
}

export const FLEX = {
  display: 'flex'
}

export const FLEX_WRAP = {
  flexWrap: 'wrap'
}

export const MARGIN_RIGHT = {
  marginRight: '0.5em'
}

// COLORS
export const COLOR_PINK_500 = {
  color: Styles.Colors.pink500
}

export const COLOR_GREY_800 = {
  color: Styles.Colors.grey800
}

export const PURPLE_A700 = Styles.Colors.deepPurpleA700
export const CYAN_500 = Styles.Colors.cyan500
export const RED_500 = Styles.Colors.red500
export const AMBER_500 = Styles.Colors.amber500

// PAPER
export const PAPER_CONTAINER = {
  margin: '1em auto',
  maxWidth: '22em',
  padding: '1em',
  textAlign: 'center'
}

export const PAPER_ROW_FIELD = {
  ...MARGIN_ROW,
  alignItems: 'center',
  display: 'flex'
}

export const PAPER_ITEM = {
  marginRight: '.5em'
}

// FOGOT PASS
export const FORGOT_PASS_LINK_CONTAINER = {
  ...MARGIN_AUTO,
  maxWidth: '22em',
  textAlign: 'center',
  fontSize: '.8em'
}

export const FORGOT_PASS_LINK_COLOR = {
  color: CYAN_500
}

// PDF button
export const CONTAINER_BTN_PDF = {
  margin: '0 auto',
  maxWidth: '800px',
  textAlign: 'right'
}

export const BTN_PDF = {
  color: RED_500,
  fontSize: '32px'
}

export const CARD_CONTAINER = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '2em auto',
  maxWidth: '1200px'
}

export const CARD = {
  margin: '0.5em',
  maxWidth: '350px',
  minWidth: '350px'
}

export const CARD_LIST_ITEM = {
  background: AMBER_500
}

// FORMS
export const FORM = {
  borderRadius: '2px',
  display: 'flex',
  flexWrap: 'wrap',
  margin: '2em auto',
  maxWidth: '800px',
  position: 'relative'
}

export const FORM_FLEX_CONTAINER = {
  ...FLEX,
  ...FLEX_WRAP
}

export const INFO_FLEX_CONTAINER = {
  ...FORM_FLEX_CONTAINER,
  marginLeft: '1em'
}

export const TEXT_SMALL = {
  ...MARGIN_WIDTH,
  width: '180px'
}

export const TEXT_X_SMALL = {
  ...MARGIN_WIDTH,
  width: '100px'
}

export const TEXT_MEDIUM = {
  ...MARGIN_WIDTH,
  width: '250px'
}

export const TEXT_LARGE = {
  ...MARGIN_WIDTH,
  width: '312px'
}

export const TEXT_X_LARGE = {
  ...MARGIN_WIDTH,
  width: '624px'
}

export const TEXT_80 = {
  ...MARGIN_WIDTH,
  width: '80%'
}

export const CHECK_CONTAINER = {
  marginTop: '1em',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '.5em'
}

export const CHECKBOX = {
  margin: '0.2em',
  width: '230px',
  fontSize: '.8em'
}

export const RADIO_BUTTON_GROUP = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '0 0.5em .5em .5em'
}

export const RADIO_BUTTON = {
  width: 150,
  marginTop: '.5em',
  fontSize: '.8em'
}

export const SELECT = {
  ...MARGIN_WIDTH
}
