import CookieSession from "cookie-session"
import * as config from "../../../config"
import { Request, Response } from "../graphql"

export const middlewareCookieSession = (req: Request, res: Response) => {
  CookieSession(config.cookieSession)(req, res, () => {})

  // "Sliding" session life (stays alive as long as the user is active):
  //   - updates a value in the cookie so that the set-cookie will be sent
  //   - only changes every minute so that it's not sent with every request.
  if (req.session) req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
}
