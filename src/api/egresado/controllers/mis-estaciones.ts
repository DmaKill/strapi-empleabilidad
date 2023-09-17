/**
 * Todos lo punto finales que controlaran todo lo realacionado con las estaciones de cada egresado
 */

import DB from "../../../models/DB";
import ErrorCustom from "../../../models/ErrorCustom";
import ResponseCustom from "../../../models/ResponseCustom";

export default {
    async create(ctx, next) {
        const stepsDefault = ["not_visited", "visited", "completed"]
        try {
            const { id_estacion, id_up_user, type } = ctx.request.body;
            if (!id_estacion) {
                throw new ErrorCustom("campo (id_estacion) es obligatorio en el request");
            }
            if (!id_up_user) {
                throw new ErrorCustom("campo (id_up_user) es obligatorio en el request");
            }
            if (!type) {
                throw new ErrorCustom("campo (type) es obligatorio en el request");
            }
            if (!stepsDefault.includes(type)) {
                throw new ErrorCustom("valor no permitido en campo (type) del request");
            }

            const findEstacion = await DB.select(
                "egresado_estaciones",
                '*',
                (q) => {
                    q.where('id_estacion', '=', id_estacion).andWhere('id_up_user', '=', id_up_user);
                },
                null,
                [
                    { table: 'up_users', type: 'LEFT', column1: 'up_users.id', column2: 'egresado_estaciones.id_up_user' },
                    { table: 'estaciones', type: 'LEFT', column1: 'estaciones.id', column2: 'egresado_estaciones.id_estacion' },
                ]
            );

            if (!findEstacion?.length) {
                return new ResponseCustom("Aqui crear la relacion")
            }

            return new ResponseCustom("Relación registradas", findEstacion);
        } catch (error) {
            if (error instanceof ErrorCustom) {
                return error.badRequest(ctx);
            }

            return ctx.badRequest(error?.message)
        }

    },
};
