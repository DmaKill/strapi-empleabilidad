/**
 * Todas las rutas para consumir la api de todo lo relacionado con las estaciones de cada egresado
 */

export default {
    routes: [
      {
        method: 'POST',
        path: '/egresagos/mis-estaciones/create',
        handler: 'mis-estaciones.create',
      }
    ]
  }
  