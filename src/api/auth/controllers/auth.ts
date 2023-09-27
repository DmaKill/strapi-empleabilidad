import ErrorCustom from "../../../models/ErrorCustom";
import ResponseCustom from "../../../models/ResponseCustom";

interface ResponseDataApiUV {
  id: any
}

const findEgresado = async (indentifier: any): Promise<ResponseDataApiUV> => {
  const respose: ResponseDataApiUV = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: null });
    }, 2000);
  });
  return respose;
}

export default {

  async login(ctx: any) {
    try {
      const { indentifier } = ctx.request.body;

      const findUser = await strapi.plugin('users-permissions');
      const { controllers, controller } = findUser;
      const call = controller('auth.callback');

      return controllers.auth;

      // Buscar en la API de UV el usuario por medio de la cedula
      const response = await findEgresado(indentifier);

      // Si el usuario
      if (response?.id) {

      }

      const knex = strapi.db.connection;
      const { rows } = await knex.raw("SELECT * FROM estaciones");
      console.log(rows);
      ctx.body = rows;

      return new ResponseCustom('Login custom');
    } catch (error) {
      if (error instanceof ErrorCustom) {
        return error.badRequest(ctx);
      }

      return ctx.badRequest(error?.message)
    }
  },
};
