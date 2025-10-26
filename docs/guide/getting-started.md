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
# 安装 SMKit
npm install smkit
```

@tab yarn

```bash
# 安装 SMKit
yarn add smkit
```

@tab pnpm

```bash
# 安装 SMKit
pnpm add smkit
```

:::

### Java 安装

::: code-tabs#build

@tab:active Maven

```xml
<!-- 在 pom.xml 中添加依赖 -->
<dependencies>
    <dependency>
        <groupId>io.github.smkit</groupId>
        <artifactId>smkit-java</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

@tab Gradle

```groovy
// 在 build.gradle 中添加依赖
dependencies {
    implementation 'io.github.smkit:smkit-java:1.0.0-SNAPSHOT'
}
```

:::

## 第一个示例

### SM4 对称加密

SM4 是中国的分组密码标准，适用于数据加密场景。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt } from 'smkit';

// 密钥（16字节 / 128位，32个十六进制字符）
const key = '0123456789abcdeffedcba9876543210';

// 待加密的明文
const plaintext = 'Hello, SMKit! 你好，国密！';

// 加密
const ciphertext = sm4Encrypt(key, plaintext);
console.log('密文:', ciphertext);

// 解密
const decrypted = sm4Decrypt(key, ciphertext);
console.log('明文:', decrypted);
// 输出: Hello, SMKit! 你好，国密！

// 使用面向对象 API
import { SM4 } from 'smkit';

const sm4 = SM4.ECB(key);
const encrypted = sm4.encrypt('Hello, SMKit!');
const plain = sm4.decrypt(encrypted);
```

@tab JavaScript

```javascript
const { sm4Encrypt, sm4Decrypt } = require('smkit');

// 密钥（16字节 / 128位）
const key = '0123456789abcdeffedcba9876543210';

// 待加密的明文
const plaintext = 'Hello, SMKit! 你好，国密！';

// 加密
const ciphertext = sm4Encrypt(key, plaintext);
console.log('密文:', ciphertext);

// 解密
const decrypted = sm4Decrypt(key, ciphertext);
console.log('明文:', decrypted);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;

public class SM4Demo {
    public static void main(String[] args) {
        // 密钥（16字节 / 128位）
        String key = "0123456789abcdeffedcba9876543210";
        
        // 待加密的明文
        String plaintext = "Hello, SMKit! 你好，国密！";
        
        // 加密
        String ciphertext = SM4Util.encrypt(key, plaintext);
        System.out.println("密文: " + ciphertext);
        
        // 解密
        String decrypted = SM4Util.decrypt(key, ciphertext);
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
- **CFB** (Cipher Feedback)：密文反馈模式
- **OFB** (Output Feedback)：输出反馈模式
:::

### SM3 哈希算法

SM3 是中国的密码杂凑算法标准，输出256位哈希值。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest, hmac } from 'smkit';

// 计算哈希
const message = 'Hello, World!';
const hash = digest(message);
console.log('SM3 哈希:', hash);
console.log('长度:', hash.length); // 64 (256位)

// HMAC（带密钥的哈希）
const key = 'secret-key';
const mac = hmac(key, message);
console.log('SM3 HMAC:', mac);

// 使用面向对象 API
import { SM3 } from 'smkit';

const hasher = new SM3();
hasher.update('Hello, ').update('World!');
const result = hasher.digest();
console.log('哈希:', result);
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;

public class SM3Demo {
    public static void main(String[] args) {
        // 计算哈希
        String message = "Hello, World!";
        String hash = SM3Util.digest(message);
        System.out.println("SM3 哈希: " + hash);
        System.out.println("长度: " + hash.length()); // 64 (256位)
        
        // HMAC（带密钥的哈希）
        String key = "secret-key";
        String mac = SM3Util.hmac(key, message);
        System.out.println("SM3 HMAC: " + mac);
        
        // 使用面向对象 API
        import io.github.smkit.sm3.SM3;
        
        SM3 hasher = new SM3();
        hasher.update("Hello, ").update("World!");
        String result = hasher.digest();
        System.out.println("哈希: " + result);
    }
}
```

:::

::: note 应用场景
SM3 常用于：
- 数据完整性校验
- 密码存储（加盐哈希）
- 数字签名
- 消息认证码 (HMAC)
:::

### SM2 非对称加密

SM2 是基于椭圆曲线的公钥密码算法，支持加密、签名和密钥交换。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { generateKeyPair, sm2Encrypt, sm2Decrypt, sign, verify } from 'smkit';

// 生成密钥对
const keyPair = generateKeyPair();
console.log('公钥:', keyPair.publicKey);
console.log('私钥:', keyPair.privateKey);

// 加密
const message = 'Secret Message';
const encrypted = sm2Encrypt(keyPair.publicKey, message);
console.log('密文:', encrypted);

// 解密
const decrypted = sm2Decrypt(keyPair.privateKey, encrypted);
console.log('明文:', decrypted); // Secret Message

// 签名
const signature = sign(keyPair.privateKey, message);
console.log('签名:', signature);

// 验签
const isValid = verify(keyPair.publicKey, message, signature);
console.log('验签结果:', isValid); // true

// 使用面向对象 API
import { SM2 } from 'smkit';

const sm2 = SM2.generateKeyPair();
const ct = sm2.encrypt('Hello');
const pt = sm2.decrypt(ct);
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;
import io.github.smkit.sm2.KeyPair;

public class SM2Demo {
    public static void main(String[] args) {
        // 生成密钥对
        KeyPair keyPair = SM2Util.generateKeyPair();
        System.out.println("公钥: " + keyPair.getPublicKey());
        System.out.println("私钥: " + keyPair.getPrivateKey());
        
        // 加密
        String message = "Secret Message";
        String encrypted = SM2Util.encrypt(keyPair.getPublicKey(), message);
        System.out.println("密文: " + encrypted);
        
        // 解密
        String decrypted = SM2Util.decrypt(keyPair.getPrivateKey(), encrypted);
        System.out.println("明文: " + decrypted); // Secret Message
        
        // 签名
        String signature = SM2Util.sign(keyPair.getPrivateKey(), message);
        System.out.println("签名: " + signature);
        
        // 验签
        boolean isValid = SM2Util.verify(keyPair.getPublicKey(), message, signature);
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

## 常见问题

### 如何选择合适的算法？

- **对称加密**（SM4）：适用于大量数据加密，如文件、数据库字段
- **非对称加密**（SM2）：适用于密钥交换、数字签名、少量数据加密
- **哈希算法**（SM3）：适用于数据完整性校验、密码存储、数字签名

### 密钥长度要求

- **SM2**：私钥 256 位（64 个十六进制字符），公钥 512 位（130 个十六进制字符，04 开头）
- **SM3**：无密钥（哈希算法）或任意长度（HMAC）
- **SM4**：128 位（32 个十六进制字符）

### 如何生成安全的密钥？

::: code-tabs#lang

@tab:active TypeScript

```typescript
import * as crypto from 'crypto';

// 生成 SM4 密钥（128位）
const sm4Key = crypto.randomBytes(16).toString('hex');
console.log('SM4 密钥:', sm4Key);

// 生成 SM2 密钥对（使用库函数）
import { generateKeyPair } from 'smkit';
const sm2KeyPair = generateKeyPair();
```

@tab Java

```java
import java.security.SecureRandom;
import io.github.smkit.SmKitUtil;
import io.github.smkit.sm2.SM2Util;

// 生成 SM4 密钥（128位）
SecureRandom random = new SecureRandom();
byte[] keyBytes = new byte[16];
random.nextBytes(keyBytes);
String sm4Key = SmKitUtil.bytesToHex(keyBytes);
System.out.println("SM4 密钥: " + sm4Key);

// 生成 SM2 密钥对（使用库函数）
KeyPair sm2KeyPair = SM2Util.generateKeyPair();
```

:::

::: danger 常见错误
注意避免以下常见错误：
- ❌ 使用不安全的密钥（如固定密钥、简单密钥）
- ❌ 在 ECB 模式下加密大量数据
- ❌ 不验证输入数据的有效性
- ❌ 硬编码密钥在代码中
- ❌ 重复使用相同的 IV（初始向量）
:::

## 性能建议

### 1. 实例复用

对于频繁的加密操作，复用实例可以提高性能：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4 } from 'smkit';

// ✅ 好的做法 - 复用实例
const sm4 = SM4.ECB('0123456789abcdeffedcba9876543210');

function encryptData(data: string) {
  return sm4.encrypt(data);
}

// 多次加密
const ct1 = encryptData('data1');
const ct2 = encryptData('data2');
const ct3 = encryptData('data3');
```

@tab Java

```java
import io.github.smkit.sm4.SM4;

// ✅ 好的做法 - 复用实例
SM4 sm4 = new SM4()
    .setKey("0123456789abcdeffedcba9876543210")
    .setMode("ECB");

String ct1 = sm4.encrypt("data1");
String ct2 = sm4.encrypt("data2");
String ct3 = sm4.encrypt("data3");
```

:::

### 2. 批量操作

对于大量数据，使用并行处理：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const data = ['msg1', 'msg2', 'msg3'];

// 并行加密
const encrypted = await Promise.all(
  data.map(msg => Promise.resolve(sm4Encrypt(key, msg)))
);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.stream.Collectors;

String key = "0123456789abcdeffedcba9876543210";
List<String> data = Arrays.asList("msg1", "msg2", "msg3");

// 并行加密
List<String> encrypted = data.parallelStream()
    .map(msg -> SM4Util.encrypt(key, msg))
    .collect(Collectors.toList());
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
