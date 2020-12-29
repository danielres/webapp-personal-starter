import CookieSession from "cookie-session"
import * as config from "../../../config"
import { Request, Response } from "../graphql"

export const middlewareCookieSession = (req: Request, res: Response) => {
  CookieSession(config.cookieSession)(req, res, () => {})
}
