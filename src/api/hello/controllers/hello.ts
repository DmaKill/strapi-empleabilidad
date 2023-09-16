
export default {
  async index(ctx, next) { // called by GET /hello
    const knex = strapi.db.connection;
    const { rows } = await knex.raw("SELECT * FROM estaciones");
    console.log(rows);
    ctx.body = rows;
  },
};
