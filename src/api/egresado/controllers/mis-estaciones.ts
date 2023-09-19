/**
 * Todos lo punto finales que controlaran todo lo realacionado con las estaciones de cada egresado
 */

import AuthUser from "../../../models/AuthUser";
import DB from "../../../models/DB";
import ErrorCustom from "../../../models/ErrorCustom";
import ResponseCustom from "../../../models/ResponseCustom";
import { DocumentoPublicoSchema } from "../schemas";

export default {
    /**
     * Funcion para administrar la estacion que un egresado a visitado o completado, solo se envia
     * el id de la estacion el cual quiere gestionar, el id del usaurio se recupera por medio del token
     * @param ctx Contexto de la aplicacion
     * @returns {void} -
     */
    async management(ctx: any): Promise<any> {
        const user = new AuthUser(ctx);
        try {
            const { id_estacion } = ctx.request.body;
            if (!id_estacion) {
                throw new ErrorCustom("campo (id_estacion) es obligatorio en el request");
            }

            const findEstacion = await DB.select(
                "egresado_estaciones",
                '*',
                (q) => {
                    q.where('id_estacion', '=', id_estacion).andWhere('id_up_user', '=', user.id);
                },
                null,
                [
                    { table: 'up_users', type: 'LEFT', column1: 'up_users.id', column2: 'egresado_estaciones.id_up_user' },
                    { table: 'estaciones', type: 'LEFT', column1: 'estaciones.id', column2: 'egresado_estaciones.id_estacion' },
                ]
            );

            if (!findEstacion?.length) {
                const insertData = {
                    id_estacion,
                    id_up_user: user.id,
                }
                await DB.insert('egresado_estaciones', insertData)
                return new ResponseCustom("Se ha visitado la estación", { state: 'visited' });
            }

            const data = {
                steps: findEstacion?.[0]?.steps,
                state: "visited"
            }

            return new ResponseCustom("Pasos de la estación", data);
        } catch (error) {
            if (error instanceof ErrorCustom) {
                return error.badRequest(ctx);
            }

            return ctx.badRequest(error?.message)
        }

    },

    async get(ctx: any) {
        const user = new AuthUser(ctx);

        try {
            const estaciones = await strapi.entityService.findMany('api::estacion.estacion', {
                populate: {
                    documentos: {
                        populate: {
                            Documento: true,
                        }
                    }
                }
            });

            const misEstaciones = await DB.select('egresado_estaciones', '*', (q) => {
                q.where('id_up_user', '=', user.id)
            });

            const data = estaciones?.map((item) => {
                const getEstacion = misEstaciones?.find((me) => me.id_estacion === item.id);

                let state = getEstacion ? 'visited' : 'no_visited';
                if (getEstacion?.steps?.length === item?.documentos?.length) {
                    state = 'completed';
                }


                return {
                    id_estacion: item?.id,
                    nombre: item?.Nombre,
                    slug: item?.slug,
                    state,
                    currentSteps: getEstacion?.steps,
                    documents: item?.documentos?.map((item: any) => DocumentoPublicoSchema.clean(item?.Documento))
                }
            });

            return new ResponseCustom("Estaciones actuales del egresado", data);
        } catch (error) {
            if (error instanceof ErrorCustom) {
                return error.badRequest(ctx);
            }

            return ctx.badRequest(error?.message)
        }
    }
};
