/**
 * Segredo usado para assinar/verificar os JWTs.
 *
 * Para fins didáticos há um fallback fixo. Em produção, defina sempre a variável
 * de ambiente JWT_SECRET com um valor forte e mantido em segredo.
 */
export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'dev-secret',
};
