# cn-truth: OpenClaw101 单一事实源

> **所有团队知识作为版本控制的制品存放在代码仓库中，不放在 Slack、Wiki 或 Google Docs。**

## 仓库用途

这是 OpenClaw101 项目的 **单一事实源 (Single Source of Truth)**，存储所有 Agent Harness 相关的制品：

| 文件/目录 | 用途 | 优先级 |
|-----------|------|--------|
| `AGENTS.md` | Agent 会话常驻上下文，动态反馈循环 | P0 |
| `feature_list.json` | 结构化功能列表和完成标准 | P1 |
| `progress.json` | 跨会话的持久化进度记忆 | P1 |
| `eslint-rules/` | 自定义 Linter 规则 (含修复指令) | P0 |
| `scripts/lint-structure.js` | 结构化验证脚本 | P0 |
| `.context/` | 分层上下文管理 (Tier 1/2/3) | P1 |

## Harness 等级

当前处于 **Level 2: 反馈回路**

```
Level 0: 无 Harness     → 直接给 Agent prompt
Level 1: 基础约束       → AGENTS.md + 基础 Linter
Level 2: 反馈回路 ←当前 → CI/CD + 自动化测试 + 进度追踪
Level 3: 专业化 Agent   → 多 Agent 角色分工 + 分层上下文
Level 4: 自治循环       → 无人值守 + 自动化熵管理
```

## 关键原则

1. **增量执行**: 每次会话只处理一个功能
2. **上下文 < 40%**: 更多 token ≠ 更好结果
3. **Linter 即教师**: 错误消息嵌入修复指令
4. **活文档**: AGENTS.md 每次犯错都更新
5. **垃圾回收**: 定期清理技术债和过时文档

## 更新流程

```bash
# 1. 在 openclaw101 项目中完成工作
# 2. 复制 harness 制品到 cn-truth
cp AGENTS.md feature_list.json progress.json /path/to/cn-truth/
cp -r eslint-rules/ scripts/ .context/ /path/to/cn-truth/

# 3. 提交并推送
cd /path/to/cn-truth
git add -A
git commit -m "sync: update harness artifacts from openclaw101"
git push origin main
```
