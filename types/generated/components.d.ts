import type { Schema, Attribute } from '@strapi/strapi';

export interface DocumentosDocumentoEstacion extends Schema.Component {
  collectionName: 'components_documentos_documento_estacions';
  info: {
    displayName: 'Documento estaci\u00F3n';
    icon: 'filePdf';
    description: '';
  };
  attributes: {
    Nombre: Attribute.String & Attribute.Required;
    Descripcion: Attribute.String;
    Documento: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'documentos.documento-estacion': DocumentosDocumentoEstacion;
    }
  }
}
