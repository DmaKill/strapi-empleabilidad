/**
Esta tabla se crea para controlar que pasos o elementos dentro de una estacion ha sido visitada por un egresado === up_user
la columna "steps" contendrá un json de este tipo: {idStep: integer, tableName: string, createAt: date()}
*/
CREATE TABLE IF NOT EXISTS public.egresado_estaciones
(
    id SERIAL PRIMARY KEY,
    id_estacion integer NOT NULL,
    id_up_user integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    steps json,
    CONSTRAINT id_estacion_fk FOREIGN KEY (id_estacion)
        REFERENCES public.estaciones (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT id_up_user_fk FOREIGN KEY (id_up_user)
        REFERENCES public.up_users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_estado') THEN
        CREATE TYPE tipo_estado AS ENUM ('HOJA_DE_VIDA', 'PORTAFOLIO', 'OTRO');
    END IF;
END $$;

CREATE TABLE public.documento_asesorado
(
    id_documento_asesorado serial NOT NULL,
    descripcion text,
    tipo tipo_estado NOT NULL DEFAULT 'HOJA_DE_VIDA',
    es_publica boolean NOT NULL DEFAULT FALSE,
    id_usuario_egresado integer NOT NULL,
    id_archivo integer NOT NULL,
    id_archivo_comentado integer,
    id_usuario_administrador integer,
    nota_general text,
    es_aceptada boolean NOT NULL DEFAULT FALSE,
    id_estacion integer,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp,
    CONSTRAINT id_documento_asesorado_pk PRIMARY KEY (id_documento_asesorado),
    CONSTRAINT id_usuario_egresado_fk FOREIGN KEY (id_usuario_egresado)
        REFERENCES public.up_users (id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT id_archivo_fk FOREIGN KEY (id_archivo)
        REFERENCES public.files (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_archivo_comentado_fk FOREIGN KEY (id_archivo_comentado)
        REFERENCES public.files (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_usuario_admin_fk FOREIGN KEY (id_usuario_administrador)
        REFERENCES public.admin_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_estacion FOREIGN KEY (id_estacion)
        REFERENCES public.estaciones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
