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
)