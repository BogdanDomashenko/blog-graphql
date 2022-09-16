const { rule } = require("graphql-shield");
const { JwtService } = require("../../services/Jwt.service");

exports.isAuthorized = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();

  const { id } = JwtService.verifyAccessToken(token);

  return !!id;
});
