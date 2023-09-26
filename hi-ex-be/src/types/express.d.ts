declare module 'express' {
  interface Request {
    user?: any; // Modify 'any' to match the type of your user object
  }
}
