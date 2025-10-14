---
title: 常见问题
icon: question
---

# 常见问题 (FAQ)

## 安装和配置

### Q: 如何安装 SMKit？

::: details 答案
使用 npm 或 yarn 安装：

```bash
npm install @smkit/core
# 或
yarn add @smkit/core
```
:::

### Q: SMKit 支持哪些运行环境？

::: details 答案
- **浏览器**：支持所有现代浏览器 (Chrome 90+, Firefox 88+, Safari 14+)
- **Node.js**：Node.js 14.0.0 及以上版本
- **Java**：JDK 8 及以上版本
:::

## 使用问题

### Q: SM4 的密钥长度是多少？

::: details 答案
SM4 使用 128 位（16 字节）密钥。密钥必须是 16 字节的十六进制字符串。

示例：
```typescript
const key = '0123456789abcdeffedcba9876543210'; // 32个十六进制字符 = 16字节
```
:::

### Q: 如何选择合适的工作模式？

::: details 答案
推荐使用顺序：
1. **GCM 模式**：需要认证加密时的最佳选择
2. **CBC 模式**：通用场景的推荐模式
3. **CTR 模式**：需要并行加密时使用
4. **ECB 模式**：仅用于加密单个分组

**不推荐使用 ECB 模式**加密大量数据！
:::

### Q: SM2 和 RSA 有什么区别？

::: details 答案
| 特性 | SM2 | RSA |
| --- | --- | --- |
| 密钥长度 | 256 bits | 2048/4096 bits |
| 安全强度 | ~128 bits | ~112/128 bits |
| 性能 | 更快 | 较慢 |
| 标准 | 中国国密 | 国际标准 |
| 应用 | 国内合规场景 | 国际通用 |

相同安全强度下，SM2 密钥更短、速度更快。
:::

## 安全问题

### Q: 如何安全地存储密钥？

::: danger 重要提示
**绝对不要**硬编码密钥在源代码中！
:::

::: details 推荐做法
1. **使用环境变量**
   ```typescript
   const key = process.env.ENCRYPTION_KEY;
   ```

2. **使用密钥管理服务 (KMS)**
   - AWS KMS
   - Azure Key Vault
   - HashiCorp Vault

3. **使用硬件安全模块 (HSM)**
   - 生产环境的最佳选择
   - 物理隔离密钥存储

4. **加密配置文件**
   - 使用主密钥加密应用密钥
   - 主密钥由 KMS 管理
:::

### Q: 如何生成安全的密钥？

::: details 答案
使用密码学安全的随机数生成器：

```typescript
import { randomBytes } from 'crypto';

// 生成 SM4 密钥 (16字节)
const sm4Key = randomBytes(16).toString('hex');

// 生成 AES-256 密钥 (32字节)
const aesKey = randomBytes(32).toString('hex');
```

**不要使用** `Math.random()`，它不是密码学安全的！
:::

### Q: 如何防止重放攻击？

::: details 答案
在协议设计中添加防重放机制：

1. **使用时间戳**
   ```typescript
   const message = {
     data: 'actual data',
     timestamp: Date.now(),
     nonce: randomBytes(16).toString('hex')
   };
   ```

2. **使用序列号**
   - 服务器维护每个客户端的序列号
   - 拒绝重复或过期的序列号

3. **使用 GCM 模式**
   - GCM 提供认证加密
   - 自动防止篡改和重放
:::

## 性能问题

### Q: 如何提升加密性能？

::: details 答案
1. **复用实例**
   ```typescript
   // ❌ 不好
   function encrypt(data) {
     const sm4 = new SM4();
     return sm4.encrypt(data, key);
   }
   
   // ✅ 好
   const sm4 = new SM4();
   function encrypt(data) {
     return sm4.encrypt(data, key);
   }
   ```

2. **使用批量操作**
   - 批量加密多个消息
   - 减少函数调用开销

3. **启用硬件加速**
   - SMKit 自动使用可用的硬件加速
   - AES-NI、ARMv8 Crypto 等

4. **选择合适的算法**
   - SM4/AES 性能优于 SM2/RSA
   - 对称加密用于大量数据
   - 非对称加密用于密钥交换
:::

### Q: 为什么加密很慢？

::: details 答案
可能的原因：

1. **使用了非对称加密加密大量数据**
   - 解决方案：使用混合加密（对称+非对称）

2. **频繁创建实例**
   - 解决方案：复用算法实例

3. **使用了错误的工作模式**
   - ECB 模式最快但不安全
   - GCM 模式较慢但最安全
   - 根据需求选择

4. **硬件不支持加速**
   - 检查 CPU 是否支持 AES-NI
   - 考虑升级硬件
:::

## 错误处理

### Q: 遇到 "Invalid key length" 错误怎么办？

::: details 答案
检查密钥长度是否正确：

- **SM4**: 16 字节 (32 个十六进制字符)
- **SM2**: 32 字节 (64 个十六进制字符)
- **AES-128**: 16 字节
- **AES-256**: 32 字节

```typescript
// 正确的 SM4 密钥
const key = '0123456789abcdeffedcba9876543210';
console.log(key.length); // 32 (16字节)

// 错误的密钥
const badKey = '0123456789abcdef'; // 太短！
```
:::

### Q: 解密时报 "MAC verification failed" 错误？

::: details 答案
可能的原因：

1. **密钥不正确**
   - 确认使用了正确的解密密钥

2. **密文被篡改**
   - GCM 模式会检测篡改
   - 检查数据传输过程

3. **模式不匹配**
   - 加密和解密必须使用相同的模式和参数

4. **IV 不匹配**
   - 确保解密时使用了正确的 IV
:::

## 合规问题

### Q: 什么场景必须使用国密算法？

::: details 答案
根据《中华人民共和国密码法》和相关政策：

**必须使用场景**：
- 政务系统和数据
- 关键信息基础设施
- 涉及国家秘密的系统
- 特定行业（金融、电信等）

**推荐使用场景**：
- 国内企业应用
- 面向政府的B2G业务
- 需要合规认证的系统

**可选场景**：
- 纯国际业务
- 内部测试系统
:::

### Q: 如何进行密码合规检测？

::: details 答案
1. **算法合规性**
   - 使用国密算法（SM2/SM3/SM4/SM9）
   - 避免已废弃的算法

2. **密钥管理**
   - 建立密钥管理制度
   - 定期轮换密钥
   - 使用 HSM 存储关键密钥

3. **产品检测**
   - 通过商用密码产品认证
   - 联系专业机构进行检测

4. **文档和流程**
   - 建立密码应用方案
   - 编写安全管理制度
   - 进行定期审计
:::

## 其他问题

### Q: SMKit 是否开源？

::: details 答案
是的，SMKit 采用 MIT 许可证开源。

- **源代码**：https://github.com/linyuliu/smkit-docs
- **许可证**：MIT License
- **贡献**：欢迎贡献代码和反馈问题
:::

### Q: 如何报告安全漏洞？

::: details 答案
如果您发现安全漏洞，请通过以下方式联系我们：

- **安全邮箱**：security@smkit.cn
- **加密通信**：使用我们的 PGP 公钥加密邮件
- **私密报告**：不要公开披露漏洞细节

我们承诺：
- 24小时内响应
- 48小时内评估
- 修复后公开致谢
:::

### Q: 如何获取技术支持？

::: details 答案
多种方式获取帮助：

1. **查看文档**
   - [快速开始](/guide/getting-started.html)
   - [API 文档](/typescript/api.html)

2. **社区讨论**
   - [GitHub Discussions](https://github.com/linyuliu/smkit-docs/discussions)
   - 提问和交流经验

3. **提交 Issue**
   - [GitHub Issues](https://github.com/linyuliu/smkit-docs/issues)
   - 报告 Bug 或建议功能

4. **商业支持**
   - 邮箱：support@smkit.cn
   - 提供付费的技术支持服务
:::

## 还有其他问题？

如果您的问题未在此列出，请：

1. 📚 查看[完整文档](/guide/)
2. 🔍 在 [GitHub Issues](https://github.com/linyuliu/smkit-docs/issues) 中搜索
3. 💬 在 [Discussions](https://github.com/linyuliu/smkit-docs/discussions) 中提问
4. 📧 发送邮件至 support@smkit.cn
