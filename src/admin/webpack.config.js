'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      CONTENT_TYPES: JSON.stringify(
        [
          {
            from: 'api::estacion.estacion', // collection where button will be added
            to: 'api::agendamiento-de-asesoria.agendamiento-de-asesoria', // which collection you want to filter
            filterBy: 'estacion', // field name by which you want to filter
            attributeName: 'agendamiento_de_asesorias', //attribute name added while adding button
            buttonTitle: 'View Agendamientos', // title of button
          },
          /* {
            from: 'api::category.category',
            to: 'api::topic.topic',
            filterBy: 'title',
            attributeName: 'viewTopics',
            buttonTitle: 'View Topics',
          },
          {
            from: 'api::category.category', //adding multiple buttons for same collection
            to: 'api::card.card',
            filterBy: 'title',
            attributeName: 'viewCards',
            buttonTitle: 'View Cards',
          } */
        ]
      ),
    })
  )
  return config;
};
