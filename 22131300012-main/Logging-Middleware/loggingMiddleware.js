// Logging Middleware for AffordMed React App
// Sends logs to http://20.244.56.144/evaluation-service/logs

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGES = [
  // Backend only
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  // Frontend only
  "api", "component", "hook", "page", "state", "style",
  // Both
  "auth", "config", "middleware", "utils"
];

/**
 * Sends a log to the AffordMed log API.
 * @param {"backend"|"frontend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {string} pkg - package name
 * @param {string} message
 * @returns {Promise<object>} API response
 */
async function log(stack, level, pkg, message) {
  // Validate inputs
  if (!ALLOWED_STACKS.includes(stack)) throw new Error("Invalid stack");
  if (!ALLOWED_LEVELS.includes(level)) throw new Error("Invalid level");
  if (!ALLOWED_PACKAGES.includes(pkg)) throw new Error("Invalid package");
  if (typeof message !== "string" || !message.trim()) throw new Error("Message must be a non-empty string");

  const body = { stack, level, package: pkg, message };

  const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Logging failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

module.exports = log; 