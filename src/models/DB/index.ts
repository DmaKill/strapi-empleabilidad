
import { Knex } from 'knex';

type TABLES =
    "egresado_estaciones" |
    "egresados" |
    "estaciones_components" |
    "estaciones" |
    "sedes" |
    "titulo_universitarios" |
    "up_users" |
    "universidades";

type Operator = 'AND' | 'OR';

type JOIN = {
    type: 'INNER' | 'LEFT' | 'RIGHT';
    table: TABLES;
    column1: string;
    column2: string;
}

export default class DB {
    /**
     * Método para insertar datos a la base de datos en una determinada tabla
     * @param table Nombre de la tabla
     * @param data Datos para registrar
     */
    static async insert(table: TABLES, data: any) {
        const response: any = await strapi.db.connection.table(table).insert(data);
        return response.rowCount;
    }


    static async select(
        table: TABLES,
        select: string | string[] | "*" = '*',
        where: (query: Knex.QueryBuilder) => void,
        orderBy: string = '',
        join: JOIN[] = [],
        groupBy: string = ''
    ): Promise<any[]> {
        try {
            let query = strapi.db.connection(table);

            if (select !== '*') {
                query = query.select(select);
            }

            if (where) {
                query = query.where(where);
            }

            if (join.length > 0) {
                join.forEach((joinClause) => {
                    const { type, table: joinTable, column1, column2 } = joinClause;
                    if (type == 'INNER') {
                        query = query.innerJoin(joinTable, column1, column2);
                    } else if (type == 'LEFT') {
                        query = query.leftJoin(joinTable, column1, column2);
                    } else {
                        query = query.rightJoin(joinTable, column1, column2);
                    }
                });
            }

            if (groupBy) {
                query = query.groupBy(groupBy);
            }

            if (orderBy) {
                query = query.orderBy(orderBy);
            }

            console.info("CONSULTA EJECUTADA: ", query.toQuery());

            // Ejecuta la consulta y devuelve los resultados
            const results = await query;

            return results;
        } catch (error) {
            throw new Error(`Error en la consulta SELECT: ${error.message}`);
        }
    }
}
