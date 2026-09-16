# 🤖 Antigravity & AI Agent Pair Programming

Best practices for working effectively with Antigravity AI agents, subagents, and automated workflows.

---

## 💡 Key Workflow Guidelines

1. **Non-Blocking Background Commands:** When long-running tasks or builds are launched (`run_command`, `compileDebugKotlin`), allow background notifications to wake up the conversation instead of polling.
2. **Targeted File Inspection:** Use `grep_search` and `view_file` with precise line slices rather than viewing entire 2000-line files.
3. **Empirical Log Evidence:** Diagnose runtime issues and build errors strictly using raw log output, never guessing root causes without reading tracebacks.
4. **Iterative Verification:** Always verify code changes with `./gradlew compileDebugKotlin -I local-env.gradle.kts` and `./gradlew installDebug -I local-env.gradle.kts`.
