# Contributing to Taro Code Inspector

感谢您对 Taro Code Inspector 项目的关注！我们欢迎所有形式的贡献。

## 🚀 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/zev-zhao/taro-code-inspector/issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（Node.js 版本、Taro 版本等）

### 提交代码

1. **Fork 项目**

   ```bash
   git clone https://github.com/zev-zhao/taro-code-inspector.git
   cd taro-code-inspector
   ```

2. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**

   ```bash
   npm install
   ```

4. **开发**

   - 编写代码
   - 添加测试（如果适用）
   - 确保代码通过 lint 检查

5. **构建测试**

   ```bash
   npm run build
   ```

6. **提交代码**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 代码规范

### TypeScript 规范

- 使用 TypeScript 严格模式
- 为所有公共 API 添加类型定义
- 使用有意义的变量和函数名
- 添加必要的注释

### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：

```
feat: add support for custom editor configuration
fix: resolve port conflict issue
docs: update installation guide
```

### 代码风格

- 使用 2 个空格缩进
- 使用单引号
- 行尾不加分号（根据项目配置）
- 函数和类之间空一行

## 🧪 测试

### 运行测试

```bash
npm test
```

### 测试覆盖率

确保新功能有适当的测试覆盖：

```bash
npm run test:coverage
```

## 📚 文档

### 更新文档

- 新功能需要更新 README.md
- API 变更需要更新类型定义
- 重大变更需要更新 CHANGELOG.md

### 文档规范

- 使用清晰的 Markdown 格式
- 提供代码示例
- 包含必要的截图或 GIF（如果适用）

## 🔍 代码审查

### 审查清单

- [ ] 代码符合项目规范
- [ ] 功能按预期工作
- [ ] 测试通过
- [ ] 文档已更新
- [ ] 无敏感信息泄露
- [ ] 性能影响最小

### 审查流程

1. 创建 Pull Request
2. 等待维护者审查
3. 根据反馈修改代码
4. 维护者合并代码

## 🏷️ 发布流程

### 版本号规范

我们使用 [语义化版本](https://semver.org/)：

- `MAJOR`: 不兼容的 API 修改
- `MINOR`: 向下兼容的功能性新增
- `PATCH`: 向下兼容的问题修正

### 发布步骤

1. 更新 CHANGELOG.md
2. 更新 package.json 版本号
3. 创建 Git tag
4. 发布到 npm

## 🤝 社区准则

### 行为准则

- 保持友善和尊重
- 欢迎不同观点和经验水平
- 专注于对社区最有利的事情
- 对其他社区成员表示同理心

### 获取帮助

- 查看 [Issues](https://github.com/zev-zhao/taro-code-inspector/issues)
- 加入讨论
- 联系维护者

## 📄 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。

## 🙏 致谢

感谢所有贡献者的努力！您的贡献让这个项目变得更好。

---

如果您有任何问题，请随时创建 Issue 或联系维护者。
