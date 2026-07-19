# 贡献指南

感谢您有兴趣贡献！本文档提供了贡献指南和相关信息。

## 行为准则

请阅读并遵守我们的[行为准则](CODE_OF_CONDUCT.md)。

## 如何贡献

### 报告Bug

1. 检查[Bug报告](https://github.com/yourusername/smart-multi-agent-workflow/issues)中是否已有相同问题
2. 如果没有，请创建新Issue，包含：
   - 清晰、描述性的标题
   - 问题描述
   - 复现步骤
   - 期望与实际行为
   - 环境详情（操作系统、Node.js版本等）

### 建议增强功能

1. 检查现有Issue和Pull Request
2. 创建新Issue，包含：
   - 清晰、描述性的标题
   - 详细的增强功能描述
   - 用例和示例
   - 相关的模型或图表

### Pull Request

1. Fork仓库
2. 从`main`创建功能分支
3. 进行更改
4. 添加或更新测试
5. 确保所有测试通过
6. 如有需要更新文档
7. 提交Pull Request

## 开发环境设置

```bash
# 克隆您的fork
git clone https://github.com/yourusername/smart-multi-agent-workflow.git

# 进入目录
cd smart-multi-agent-workflow

# 安装依赖
npm install

# 开始开发
npm run dev
```

## 开发工作流

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 2. 进行更改

- 遵循现有代码风格
- 为新功能添加测试
- 如有需要更新文档

### 3. 运行测试

```bash
# 运行所有测试
npm test

# 以监视模式运行测试
npm run test:watch

# 运行类型检查
npm run typecheck

# 运行代码检查
npm run lint
```

### 4. 提交更改

```bash
git add .
git commit -m "feat: 添加您的功能描述"
```

遵循[Conventional Commits](https://www.conventionalcommits.org/)规范：

- `feat:` 用于新功能
- `fix:` 用于Bug修复
- `docs:` 用于文档更改
- `style:` 用于代码风格更改（格式化等）
- `refactor:` 用于代码重构
- `test:` 用于添加或更新测试
- `chore:` 用于维护任务

### 5. 推送更改

```bash
git push origin feature/your-feature-name
```

### 6. 创建Pull Request

1. 转到原始仓库
2. 点击"New Pull Request"
3. 选择您的分支
4. 填写PR模板
5. 提交Pull Request

## 代码风格

- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Prettier格式化
- 使用有意义的变量和函数名
- 为复杂逻辑添加注释

## 测试

- 为新函数编写单元测试
- 为新功能编写集成测试
- 保持测试覆盖率在90%以上
- 尽可能在所有支持的平台上测试

## 文档

- 为新功能更新README.md
- 为公共API添加JSDoc注释
- 在CHANGELOG.md中记录您的更改
- 为新功能添加示例

## 平台支持

添加平台特定功能时：

1. 在基础适配器中实现功能
2. 如有需要添加平台特定覆盖
3. 在所有支持的平台上测试
4. 更新平台特定文档

## 国际化

添加新的用户可见字符串时：

1. 在`en.json`中添加英文字符串
2. 在`zh-CN.json`中添加中文字符串
3. 对所有用户消息使用i18n系统
4. 使用不同的语言设置测试

## 有问题？

如果您对贡献有疑问，可以通过以下方式：

1. 在[Issues](https://github.com/yourusername/smart-multi-agent-workflow/issues)中打开一个带"question"标签的Issue
2. 在[Discussions](https://github.com/yourusername/smart-multi-agent-workflow/discussions)中加入讨论

感谢您的贡献！