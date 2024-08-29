import { app, authentication } from "@microsoft/teams-js";

export async function getAuthToken(): Promise<string> {
  try {
    await app.initialize();
    const token = await authentication.getAuthToken()

    return token;
  } catch (e) {
    console.warn(`Error from Teams SDK, may be running outside of Teams`, e);

    return '';
  }
}
