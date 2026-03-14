import { NextResponse } from "next/server";
import { setAdminSessionCookie, validateAdminCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/blog-validation";
import { rateLimit } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

const LOGIN_WINDOW_MS = 60_000;
const LOGIN_ATTEMPT_LIMIT = 5;

export async function POST(request) {
  const ip = await getClientIp(request);
  const allowed = rateLimit({
    key: `admin-login:${ip}`,
    limit: LOGIN_ATTEMPT_LIMIT,
    windowMs: LOGIN_WINDOW_MS
  });

  if (!allowed) {
    return NextResponse.json({ error: "Too many login attempts. Please try again shortly." }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const parsed = loginSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid credentials" }, { status: 400 });
    }

    const { username, password } = parsed.data;

    if (!validateAdminCredentials(username, password)) {
      await recordAudit("admin.login.failed", { actor: username, ip });
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    setAdminSessionCookie(response);
    await recordAudit("admin.login.success", { actor: username, ip });
    return response;
  } catch (error) {
    console.error("POST /api/admin/login failed", error);
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}
