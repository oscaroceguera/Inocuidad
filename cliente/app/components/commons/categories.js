export const AGRICOLA = '98e1651e-9715-4095-9cf5-0c03d9b8513e'
export const ACUICOLA = '587a0496-82d0-4f27-a27f-ce22f60e3a3c'
export const DISTRIBUIDORA = 'b90d7685-d3e4-494e-809e-d28fa66e933f'
export const PROCESADORA = 'b0690643-ccd3-496d-8e73-923ead157cb0'
export const LABORATORIO = '8f214196-c85f-4182-ad07-4f31420a51d0'

export const CATEGORIES = {
  '98e1651e-9715-4095-9cf5-0c03d9b8513e': 'Agrícola',
  '587a0496-82d0-4f27-a27f-ce22f60e3a3c': 'Acuícola',
  'b90d7685-d3e4-494e-809e-d28fa66e933f': 'Distribuidora',
  'b0690643-ccd3-496d-8e73-923ead157cb0': 'Procesadora',
  '8f214196-c85f-4182-ad07-4f31420a51d0': 'Laboratorio'
}

export const MENU_CATEGORIES = {
  '98e1651e-9715-4095-9cf5-0c03d9b8513e': {
    empaque: true,
    uProduccion: true,
    albergue: true,
    estanque: false,
    almacen: false,
    planta: false,
    distribucion: false,
    laboratorio: false
  },
  '587a0496-82d0-4f27-a27f-ce22f60e3a3c': {
    empaque: true,
    uProduccion: false,
    albergue: true,
    estanque: true,
    almacen: false,
    planta: false,
    distribucion: false,
    laboratorio: false
  },
  'b90d7685-d3e4-494e-809e-d28fa66e933f': {
    empaque: false,
    uProduccion: false,
    albergue: false,
    estanque: false,
    almacen: false,
    planta: false,
    distribucion: true,
    laboratorio: false
  },
  'b0690643-ccd3-496d-8e73-923ead157cb0': {
    empaque: false,
    uProduccion: false,
    albergue: false,
    estanque: false,
    almacen: true,
    planta: true,
    distribucion: false,
    laboratorio: false
  },
  '8f214196-c85f-4182-ad07-4f31420a51d0': {
    empaque: false,
    uProduccion: false,
    albergue: false,
    estanque: false,
    almacen: false,
    planta: false,
    distribucion: false,
    laboratorio: true
  }
}
