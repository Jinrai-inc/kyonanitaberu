import { SignJWT, importPKCS8 } from "jose";

export async function generateAppleClientSecret(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const teamId = process.env.AUTH_APPLE_TEAM_ID!;
  const clientId = process.env.AUTH_APPLE_ID!;
  const keyId = process.env.AUTH_APPLE_KEY_ID!;
  const privateKey = process.env.AUTH_APPLE_PRIVATE_KEY!.replace(/\\n/g, "\n");

  const key = await importPKCS8(privateKey, "ES256");
  const expiresAt = now + 86400 * 180; // 6 months

  return await new SignJWT({})
    .setAudience("https://appleid.apple.com")
    .setIssuer(teamId)
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .setSubject(clientId)
    .setProtectedHeader({ alg: "ES256", kid: keyId })
    .sign(key);
}
