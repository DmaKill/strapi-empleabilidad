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
    vista_previa: Attribute.Media;
    facultades: Attribute.Relation<
      'documentos.documento-estacion',
      'oneToMany',
      'api::facultad.facultad'
    >;
    programas: Attribute.Relation<
      'documentos.documento-estacion',
      'oneToMany',
      'api::programa-univalle.programa-univalle'
    >;
    sedes: Attribute.Relation<
      'documentos.documento-estacion',
      'oneToMany',
      'api::sede-univalle.sede-univalle'
    >;
  };
}

export interface EgresadosTituloOtrasUniversidades extends Schema.Component {
  collectionName: 'components_egresados_titulo_otras_universidades';
  info: {
    displayName: 'Titulo otras universidades';
    icon: 'brush';
  };
  attributes: {
    Titulo: Attribute.String & Attribute.Required;
    Fecha_de_grado: Attribute.Date;
    sede: Attribute.Relation<
      'egresados.titulo-otras-universidades',
      'oneToOne',
      'api::sede.sede'
    >;
    Nivel_educativo: Attribute.Enumeration<
      [
        'TECNOLOG\u00CDA',
        'PROFESIONAL',
        'MAESTR\u00CDA',
        'DOCTORADO',
        'ESPECIALIZACI\u00D3N'
      ]
    >;
  };
}

export interface EgresadosTituloUnivalle extends Schema.Component {
  collectionName: 'components_egresados_titulo_univalles';
  info: {
    displayName: 'Titulo Univalle';
    icon: 'feather';
    description: '';
  };
  attributes: {
    fecha_de_inicio: Attribute.Date;
    fecha_fin: Attribute.Date;
    programa_univalle: Attribute.Relation<
      'egresados.titulo-univalle',
      'oneToOne',
      'api::programa-univalle.programa-univalle'
    >;
    sede_univalle: Attribute.Relation<
      'egresados.titulo-univalle',
      'oneToOne',
      'api::sede-univalle.sede-univalle'
    >;
    codigo_estudiantil: Attribute.String &
      Attribute.Required &
      Attribute.Unique;
  };
}

export interface EstacionesAgendamiento extends Schema.Component {
  collectionName: 'components_estaciones_agendamientos';
  info: {
    displayName: 'Agendamiento';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    Nota: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 250;
      }>;
    Citas: Attribute.Component<'estaciones.cuando', true>;
  };
}

export interface EstacionesCuando extends Schema.Component {
  collectionName: 'components_estaciones_cuandos';
  info: {
    displayName: 'cuando';
    icon: 'clock';
  };
  attributes: {
    fecha_y_hora: Attribute.DateTime;
    hasta: Attribute.DateTime;
    confirmada: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'documentos.documento-estacion': DocumentosDocumentoEstacion;
      'egresados.titulo-otras-universidades': EgresadosTituloOtrasUniversidades;
      'egresados.titulo-univalle': EgresadosTituloUnivalle;
      'estaciones.agendamiento': EstacionesAgendamiento;
      'estaciones.cuando': EstacionesCuando;
    }
  }
}
