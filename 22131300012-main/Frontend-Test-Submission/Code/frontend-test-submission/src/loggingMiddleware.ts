// Logging Middleware for AffordMed React App (TypeScript)
// Sends logs to http://20.244.56.144/evaluation-service/logs

const ALLOWED_STACKS = ["backend", "frontend"] as const;
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"] as const;
const ALLOWED_PACKAGES = [
  // Backend only
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  // Frontend only
  "api", "component", "hook", "page", "state", "style",
  // Both
  "auth", "config", "middleware", "utils"
] as const;

type Stack = typeof ALLOWED_STACKS[number];
type Level = typeof ALLOWED_LEVELS[number];
type Package = typeof ALLOWED_PACKAGES[number];

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hkLjIyc2NzZTEzMDAwMTJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJleHAiOjE3NTEwMTQzODEsImlhdCI6MTc1MTAxMzQ4MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU1ODc1OTFiLTY1YTYtNDlmMy1hNmJhLTkyOGQzODM4YzhlNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im1vaGQgc3VoZWIgc2lkZGlxdWUiLCJzdWIiOiJiOTUzN2RiZS0zMmExLTRiZTgtOWU0ZS0xOWI3Y2Y5Yzk4NGYifSwiZW1haWwiOiJtb2hkLjIyc2NzZTEzMDAwMTJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibW9oZCBzdWhlYiBzaWRkaXF1ZSIsInJvbGxObyI6IjIyMTMxMzAwMDEyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjk1MzdkYmUtMzJhMS00YmU4LTllNGUtMTliN2NmOWM5ODRmIiwiY2xpZW50U2VjcmV0IjoidXlkamtaQWtjRkRQcEJUdiJ9.hVZSVpRg626bh8WeMVJsV5MAXd8ItSBkuud4oPuFmuI";

export async function log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<any> {
  if (!ALLOWED_STACKS.includes(stack)) throw new Error("Invalid stack");
  if (!ALLOWED_LEVELS.includes(level)) throw new Error("Invalid level");
  if (!ALLOWED_PACKAGES.includes(pkg)) throw new Error("Invalid package");
  if (typeof message !== "string" || !message.trim()) throw new Error("Message must be a non-empty string");

  const body = { stack, level, package: pkg, message };

  const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Logging failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
} 