import { isValidToken } from "~~/backend/utils/adminToken";

export default defineEventHandler((event) => {
  if (!isValidToken(getCookie(event, "token"))) {
    throw createError({
      statusCode: 403,
    });
  }

  deleteCookie(event, "token");

  return true;
});
