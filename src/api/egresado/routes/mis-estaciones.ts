/**
 * Todas las rutas para consumir la api de todo lo relacionado con las estaciones de cada egresado
 */

export default {
    routes: [
      {
        method: 'POST',
        path: '/egresagos/mis-estaciones/management',
        handler: 'mis-estaciones.management',
      },
      {
        method: 'POST',
        path: '/egresagos/mis-estaciones/get',
        handler: 'mis-estaciones.get',
      }
    ]
  }
  