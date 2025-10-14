---
title: 快速开始
icon: rocket
order: 1
---

# 快速开始

本指南将帮助您在几分钟内开始使用 SMKit。

## 系统要求

### TypeScript/JavaScript

::: info 运行环境
- **Node.js**: >= 14.0.0
- **浏览器**: 支持 ES6+ 的现代浏览器
  - Chrome >= 90
  - Firefox >= 88
  - Safari >= 14
  - Edge >= 90
:::

### Java

::: info 运行环境
- **JDK**: >= 8
- **构建工具**: Maven 3.6+ 或 Gradle 6.0+
:::

## 安装

### TypeScript/JavaScript 安装

选择您喜欢的包管理器：

::: code-tabs#shell

@tab:active npm

```bash
# 安装核心包
npm install @smkit/core

# 可选：安装特定算法包
npm install @smkit/sm2
npm install @smkit/sm3
npm install @smkit/sm4
npm install @smkit/sm9
npm install @smkit/zuc
```

@tab yarn

```bash
# 安装核心包
yarn add @smkit/core

# 可选：安装特定算法包
yarn add @smkit/sm2
yarn add @smkit/sm3
yarn add @smkit/sm4
yarn add @smkit/sm9
yarn add @smkit/zuc
```

@tab pnpm

```bash
# 安装核心包
pnpm add @smkit/core

# 可选：安装特定算法包
pnpm add @smkit/sm2
pnpm add @smkit/sm3
pnpm add @smkit/sm4
pnpm add @smkit/sm9
pnpm add @smkit/zuc
```

:::

### Java 安装

::: code-tabs#build

@tab:active Maven

```xml
<!-- 在 pom.xml 中添加依赖 -->
<dependencies>
    <dependency>
        <groupId>cn.smkit</groupId>
        <artifactId>smkit-core</artifactId>
        <version>1.0.0</version>
    </dependency>
    
    <!-- 可选：安装特定算法包 -->
    <dependency>
        <groupId>cn.smkit</groupId>
        <artifactId>smkit-sm2</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>
```

@tab Gradle

```groovy
// 在 build.gradle 中添加依赖
dependencies {
    implementation 'cn.smkit:smkit-core:1.0.0'
    
    // 可选：安装特定算法包
    implementation 'cn.smkit:smkit-sm2:1.0.0'
    implementation 'cn.smkit:smkit-sm3:1.0.0'
    implementation 'cn.smkit:smkit-sm4:1.0.0'
}
```

:::

## 第一个示例

### SM4 对称加密

SM4 是中国的分组密码标准，适用于数据加密场景。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4, Mode } from '@smkit/core';

// 创建 SM4 实例
const sm4 = new SM4();

// 密钥（16字节 / 128位）
const key = '0123456789abcdeffedcba9876543210';

// 待加密的明文
const plaintext = 'Hello, SMKit! 你好，国密！';

// 加密（默认使用 CBC 模式）
const encrypted = sm4.encrypt(plaintext, key);
console.log('密文 (Base64):', encrypted);

// 解密
const decrypted = sm4.decrypt(encrypted, key);
console.log('明文:', decrypted);
// 输出: Hello, SMKit! 你好，国密！
```

@tab JavaScript

```javascript
const { SM4 } = require('@smkit/core');

// 创建 SM4 实例
const sm4 = new SM4();

// 密钥（16字节 / 128位）
const key = '0123456789abcdeffedcba9876543210';

// 待加密的明文
const plaintext = 'Hello, SMKit! 你好，国密！';

// 加密
const encrypted = sm4.encrypt(plaintext, key);
console.log('密文 (Base64):', encrypted);

// 解密
const decrypted = sm4.decrypt(encrypted, key);
console.log('明文:', decrypted);
```

@tab Java

```java
import cn.smkit.SM4;
import cn.smkit.Mode;

public class SM4Demo {
    public static void main(String[] args) {
        // 创建 SM4 实例
        SM4 sm4 = new SM4();
        
        // 密钥（16字节 / 128位）
        String key = "0123456789abcdeffedcba9876543210";
        
        // 待加密的明文
        String plaintext = "Hello, SMKit! 你好，国密！";
        
        // 加密
        String encrypted = sm4.encrypt(plaintext, key);
        System.out.println("密文 (Base64): " + encrypted);
        
        // 解密
        String decrypted = sm4.decrypt(encrypted, key);
        System.out.println("明文: " + decrypted);
        // 输出: Hello, SMKit! 你好，国密！
    }
}
```

:::

::: tip 工作模式
SM4 支持多种工作模式：
- **ECB** (Electronic Codebook)：电子密码本模式
- **CBC** (Cipher Block Chaining)：密码分组链接模式（推荐）
- **CTR** (Counter)：计数器模式
- **GCM** (Galois/Counter Mode)：认证加密模式（最安全）
:::

### SM3 哈希算法

SM3 是中国的密码杂凑算法标准，输出256位哈希值。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM3 } from '@smkit/core';

// 创建 SM3 实例
const sm3 = new SM3();

// 计算哈希
const message = 'Hello, World!';
const hash = sm3.hash(message);
console.log('SM3 哈希:', hash);

// HMAC（带密钥的哈希）
const key = 'secret-key';
const hmac = sm3.hmac(message, key);
console.log('SM3 HMAC:', hmac);
```

@tab Java

```java
import cn.smkit.SM3;

public class SM3Demo {
    public static void main(String[] args) {
        // 创建 SM3 实例
        SM3 sm3 = new SM3();
        
        // 计算哈希
        String message = "Hello, World!";
        String hash = sm3.hash(message);
        System.out.println("SM3 哈希: " + hash);
        
        // HMAC（带密钥的哈希）
        String key = "secret-key";
        String hmac = sm3.hmac(message, key);
        System.out.println("SM3 HMAC: " + hmac);
    }
}
```

:::

::: note 应用场景
SM3 常用于：
- 数据完整性校验
- 密码存储
- 数字签名
- 消息认证码 (MAC)
:::

### SM2 非对称加密

SM2 是基于椭圆曲线的公钥密码算法，支持加密、签名和密钥交换。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM2 } from '@smkit/core';

// 创建 SM2 实例
const sm2 = new SM2();

// 生成密钥对
const keyPair = sm2.generateKeyPair();
console.log('公钥:', keyPair.publicKey);
console.log('私钥:', keyPair.privateKey);

// 加密
const message = 'Secret Message';
const encrypted = sm2.encrypt(message, keyPair.publicKey);
console.log('密文:', encrypted);

// 解密
const decrypted = sm2.decrypt(encrypted, keyPair.privateKey);
console.log('明文:', decrypted); // Secret Message

// 签名
const signature = sm2.sign(message, keyPair.privateKey);
console.log('签名:', signature);

// 验签
const isValid = sm2.verify(message, signature, keyPair.publicKey);
console.log('验签结果:', isValid); // true
```

@tab Java

```java
import cn.smkit.SM2;
import cn.smkit.KeyPair;

public class SM2Demo {
    public static void main(String[] args) {
        // 创建 SM2 实例
        SM2 sm2 = new SM2();
        
        // 生成密钥对
        KeyPair keyPair = sm2.generateKeyPair();
        System.out.println("公钥: " + keyPair.getPublicKey());
        System.out.println("私钥: " + keyPair.getPrivateKey());
        
        // 加密
        String message = "Secret Message";
        String encrypted = sm2.encrypt(message, keyPair.getPublicKey());
        System.out.println("密文: " + encrypted);
        
        // 解密
        String decrypted = sm2.decrypt(encrypted, keyPair.getPrivateKey());
        System.out.println("明文: " + decrypted); // Secret Message
        
        // 签名
        String signature = sm2.sign(message, keyPair.getPrivateKey());
        System.out.println("签名: " + signature);
        
        // 验签
        boolean isValid = sm2.verify(message, signature, keyPair.getPublicKey());
        System.out.println("验签结果: " + isValid); // true
    }
}
```

:::

::: important 密钥管理
**重要安全提示**：
- 🔒 私钥必须安全保管，不能泄露
- 🔐 建议使用硬件安全模块 (HSM) 存储关键密钥
- 🔄 定期轮换密钥
- 📋 建立完善的密钥管理制度
:::

## 进阶配置

### 自定义配置

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4, Mode, Padding } from '@smkit/core';

// 使用自定义配置创建实例
const sm4 = new SM4({
  mode: Mode.GCM,           // 使用 GCM 模式
  padding: Padding.PKCS7,   // PKCS7 填充
  iv: 'custom-iv-16-bytes', // 自定义初始向量
});

// 使用配置进行加密
const encrypted = sm4.encrypt(plaintext, key);
```

@tab Java

```java
import cn.smkit.SM4;
import cn.smkit.SM4Config;
import cn.smkit.Mode;
import cn.smkit.Padding;

// 创建自定义配置
SM4Config config = SM4Config.builder()
    .mode(Mode.GCM)              // 使用 GCM 模式
    .padding(Padding.PKCS7)      // PKCS7 填充
    .iv("custom-iv-16-bytes")    // 自定义初始向量
    .build();

// 使用配置创建实例
SM4 sm4 = new SM4(config);

// 使用配置进行加密
String encrypted = sm4.encrypt(plaintext, key);
```

:::

### 错误处理

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4, SMKitError, ErrorCode } from '@smkit/core';

try {
  const sm4 = new SM4();
  const encrypted = sm4.encrypt(plaintext, 'invalid-key');
} catch (error) {
  if (error instanceof SMKitError) {
    console.error('错误代码:', error.code);
    console.error('错误信息:', error.message);
    
    if (error.code === ErrorCode.INVALID_KEY_LENGTH) {
      console.error('密钥长度不正确，SM4 需要 16 字节密钥');
    }
  }
}
```

@tab Java

```java
import cn.smkit.SM4;
import cn.smkit.SMKitException;
import cn.smkit.ErrorCode;

try {
    SM4 sm4 = new SM4();
    String encrypted = sm4.encrypt(plaintext, "invalid-key");
} catch (SMKitException e) {
    System.err.println("错误代码: " + e.getCode());
    System.err.println("错误信息: " + e.getMessage());
    
    if (e.getCode() == ErrorCode.INVALID_KEY_LENGTH) {
        System.err.println("密钥长度不正确，SM4 需要 16 字节密钥");
    }
}
```

:::

::: danger 常见错误
注意避免以下常见错误：
- ❌ 使用不安全的密钥（如固定密钥、简单密钥）
- ❌ 在 ECB 模式下加密大量数据
- ❌ 不验证输入数据的有效性
- ❌ 硬编码密钥在代码中
:::

## 性能优化建议

### 1. 实例复用

::: tip 最佳实践
```typescript
// ❌ 不好的做法 - 每次都创建新实例
function encrypt(data: string) {
  const sm4 = new SM4();
  return sm4.encrypt(data, key);
}

// ✅ 好的做法 - 复用实例
const sm4 = new SM4();
function encrypt(data: string) {
  return sm4.encrypt(data, key);
}
```
:::

### 2. 批量操作

对于大量数据的加密，使用流式 API：

```typescript
import { SM4Stream } from '@smkit/core';

const stream = new SM4Stream(key);
stream.on('data', (chunk) => {
  // 处理加密后的数据块
});
stream.write(largeData);
stream.end();
```

### 3. 使用硬件加速

::: info 硬件加速
SMKit 自动检测并使用硬件加速：
- **AES-NI**：Intel/AMD CPU 的 AES 指令集
- **ARMv8 Crypto**：ARM 架构的加密扩展
- **GPU 加速**：支持 CUDA 和 OpenCL

无需额外配置，自动启用！
:::

## 调试和日志

### 启用调试模式

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SMKit } from '@smkit/core';

// 启用调试模式
SMKit.setLogLevel('debug');

// 使用自定义日志函数
SMKit.setLogger({
  debug: (msg) => console.debug('[DEBUG]', msg),
  info: (msg) => console.info('[INFO]', msg),
  warn: (msg) => console.warn('[WARN]', msg),
  error: (msg) => console.error('[ERROR]', msg),
});
```

@tab Java

```java
import cn.smkit.SMKit;
import cn.smkit.LogLevel;

// 启用调试模式
SMKit.setLogLevel(LogLevel.DEBUG);

// 使用 SLF4J 日志
// SMKit 会自动使用项目中配置的 SLF4J 实现
```

:::

## 下一步

恭喜！您已经完成了快速开始。接下来可以：

::: tip 继续学习
- 📖 深入了解 [核心特性](./features.md)
- 🏗️ 学习 [架构设计](./architecture.md)
- 💡 查看各算法的详细文档：
  - [SM2 椭圆曲线公钥密码](/sm2/)
  - [SM3 密码杂凑算法](/sm3/)
  - [SM4 分组密码算法](/sm4/)
  - [SM9 标识密码算法](/sm9/)
  - [ZUC 祖冲之序列密码](/zuc/)
:::

## 获取帮助

遇到问题？我们随时为您提供帮助：

- 📚 查看 [FAQ](./faq.md)
- 💬 加入 [讨论社区](https://github.com/linyuliu/smkit-docs/discussions)
- 🐛 [报告 Bug](https://github.com/linyuliu/smkit-docs/issues)
- 📧 发送邮件至：support@smkit.cn
