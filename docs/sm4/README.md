---
title: SM4 分组密码算法
icon: lock
---

# SM4 分组密码算法

SM4 是中国的分组密码标准，用于对称加密，密钥长度 128 位。

## 算法概述

::: info SM4 标准
SM4 是一种分组密码算法，分组长度和密钥长度均为 128 位。

**标准文档**：
- GM/T 0002-2012：SM4 分组密码算法
:::

## 主要特性

### 算法参数

| 参数 | 值 |
| --- | --- |
| 分组长度 | 128 bits (16 bytes) |
| 密钥长度 | 128 bits (16 bytes) |
| 轮数 | 32 |
| 结构 | Feistel 网络 |

### 工作模式

SM4 支持多种工作模式：

::: tabs

@tab ECB
**电子密码本模式 (ECB)**
- 最简单的模式
- 不推荐用于大量数据
- 相同明文块产生相同密文块

@tab CBC
**密码分组链接模式 (CBC)**
- 推荐的模式
- 使用初始向量 (IV)
- 每个密文块依赖前一个

@tab CTR
**计数器模式 (CTR)**
- 将分组密码转为流密码
- 支持并行加密
- 需要随机数或计数器

@tab GCM
**伽罗瓦计数器模式 (GCM)**
- 认证加密模式
- 同时提供加密和认证
- 最安全的模式

:::

## 快速开始

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4, Mode } from '@smkit/core';

// 创建 SM4 实例
const sm4 = new SM4();

// 密钥 (16 字节)
const key = '0123456789abcdeffedcba9876543210';

// 加密
const plaintext = '这是需要加密的数据';
const ciphertext = sm4.encrypt(plaintext, key);
console.log('密文:', ciphertext);

// 解密
const decrypted = sm4.decrypt(ciphertext, key);
console.log('明文:', decrypted);

// 使用 GCM 模式（更安全）
const sm4gcm = new SM4({ mode: Mode.GCM });
const encrypted = sm4gcm.encrypt(plaintext, key);
```

@tab Java

```java
import cn.smkit.SM4;
import cn.smkit.Mode;

SM4 sm4 = new SM4();

// 密钥 (16 字节)
String key = "0123456789abcdeffedcba9876543210";

// 加密
String plaintext = "这是需要加密的数据";
String ciphertext = sm4.encrypt(plaintext, key);
System.out.println("密文: " + ciphertext);

// 解密
String decrypted = sm4.decrypt(ciphertext, key);
System.out.println("明文: " + decrypted);

// 使用 GCM 模式
SM4 sm4gcm = new SM4(Mode.GCM);
String encrypted = sm4gcm.encrypt(plaintext, key);
```

:::

## 加密轮函数

SM4 的加密变换由 32 轮迭代运算组成：

$$
X_{i+4} = F(X_i, X_{i+1}, X_{i+2}, X_{i+3}, rk_i), \quad i = 0, 1, \ldots, 31
$$

其中轮函数 $F$ 定义为：

$$
F(X_0, X_1, X_2, X_3, rk) = X_0 \oplus T(X_1 \oplus X_2 \oplus X_3 \oplus rk)
$$

::: details 合成置换 T
$T$ 变换由非线性变换 $\tau$ 和线性变换 $L$ 复合而成：

$$
T(\cdot) = L(\tau(\cdot))
$$

**非线性变换** $\tau$ 由 4 个 S 盒并行构成：

$$
\tau(A) = (S_{box}(a_0), S_{box}(a_1), S_{box}(a_2), S_{box}(a_3))
$$

**线性变换** $L$：

$$
L(B) = B \oplus (B \lll 2) \oplus (B \lll 10) \oplus (B \lll 18) \oplus (B \lll 24)
$$

其中 $\lll$ 表示循环左移。
:::

## 应用场景

::: tip 适用场景
- ✅ **数据加密**：文件、数据库字段加密
- ✅ **通信加密**：VPN、SSL/TLS 通信
- ✅ **存储加密**：磁盘加密、云存储加密
- ✅ **身份认证**：挑战-应答认证
:::

## 性能对比

| 平台 | SM4 (MB/s) | AES (MB/s) |
| --- | --- | --- |
| Intel i7-12700K | 285 | 320 |
| Apple M1 | 240 | 280 |
| ARM Cortex-A72 | 150 | 180 |

::: note 性能说明
SM4 性能略低于 AES，但仍能满足大多数应用需求。
:::

## 安全建议

::: danger 重要提示
1. **不要使用 ECB 模式**：除非加密单个分组
2. **使用随机 IV**：CBC/CTR 模式需要随机初始向量
3. **密钥管理**：定期轮换密钥，安全存储密钥
4. **使用 GCM 模式**：需要认证加密时优先选择 GCM
:::

## 深入学习

::: tip 继续了解
- 📖 [算法原理](./algorithm.md) - SM4 算法详细原理
- 🔧 [工作模式](./modes.md) - 各种工作模式详解
- 🔒 [加密过程](./encrypt.md) - 加密实现细节
- 🔓 [解密过程](./decrypt.md) - 解密实现细节
- 💡 [示例代码](./examples.md) - 实用示例
:::
