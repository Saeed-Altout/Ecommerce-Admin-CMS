/**
 * An array of routes that are accessible to the public
 * Theses routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/auth/new-verification",
  "/",
  "/category",
  "/category",
  "/product",
  "/cart",
  "/checkout",
];

/**
 * An array of routes that are used for authentication
 * These routes are not accessible to the public
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for Api authentication routes
 * Routes that start with this prefix are use for Api
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect url after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/getting-started";

/**
 * The login page
 * @type {string}
 */
export const LOGIN = "/auth/login";
