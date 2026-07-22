# Smart Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于SMART原则的AI Agent工作流。将模糊的请求转化为可验证的任务，分发给subagent执行，并验证结果。

## 安装

```bash
# 全局安装（所有项目可用）
npx skills add wzzheng686/smart-agent -g

# 或安装到当前项目
npx skills add wzzheng686/smart-agent
```

### AI Agent辅助安装

将本仓库链接分享给你的 agent：

> "请安装 smart-agent skill，地址是 https://github.com/wzzheng686/smart-agent"

Agent 会自动运行 `npx skills add` 完成安装。

### 验证安装

```bash
npx skills list
# smart-agent 应该出现在列表中
```

## 使用

加载 smart-agent skill 后，按四阶段工作流执行：

1. **定义** — 用 S/M/A/R/T 标准结构化任务
2. **分发** — 将完整上下文交给 subagent
3. **自检** — 对照标准验证输出
4. **验收** — 检查并确认完成

详细工作流说明见 [SKILL.md](./SKILL.md)。

## 许可证

MIT