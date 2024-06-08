import * as pg from "pg";
import {
  generateToken,
  isValidToken,
  getInfoFromToken,
} from "~~/backend/utils/adminToken";

const { Pool } = pg.default;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (id === undefined) {
    throw createError({
      statusCode: 400,
    });
  }

  const token = getCookie(event, "token");
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
    });
  }
  setCookie(event, "token", generateToken(getInfoFromToken(token!)!.id));

  const pool = new Pool({
    ssl: {
      mode: "require",
    },
  });
  const goodSQL = await pool.query('SELECT * FROM "Items" WHERE id = $1', [
    +id,
  ]);

  if (goodSQL.rows.length === 0) {
    throw createError({
      statusCode: 404,
    });
  }

  return goodSQL.rows[0];
});
