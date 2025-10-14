---
title: SM3 密码杂凑算法
icon: fingerprint
---

# SM3 密码杂凑算法

SM3 是中国国家密码管理局于 2010 年公布的密码杂凑算法，输出 256 位哈希值。

## 算法概述

::: info SM3 标准
SM3 是一种密码杂凑算法，用于生成消息的数字摘要。

**标准文档**：
- GM/T 0004-2012：SM3 密码杂凑算法
:::

## 主要特性

### 安全强度

SM3 输出 256 位（32 字节）哈希值：

| 特性 | 值 |
| --- | --- |
| 输出长度 | 256 bits |
| 安全强度 | 128 bits |
| 消息长度 | < $2^{64}$ bits |
| 分组长度 | 512 bits |

### 算法结构

SM3 采用 Merkle-Damgård 结构：

$$
H_i = CF(H_{i-1}, M_i)
$$

其中：
- $CF$ 是压缩函数
- $H_i$ 是中间哈希值
- $M_i$ 是第 i 个消息分组

## 快速开始

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

// HMAC
const key = 'secret-key';
const hmac = sm3.hmac(message, key);
console.log('HMAC:', hmac);
```

@tab Java

```java
import cn.smkit.SM3;

SM3 sm3 = new SM3();

// 计算哈希
String message = "Hello, World!";
String hash = sm3.hash(message);
System.out.println("SM3 哈希: " + hash);

// HMAC
String key = "secret-key";
String hmac = sm3.hmac(message, key);
System.out.println("HMAC: " + hmac);
```

:::

## 应用场景

::: tip 常见用途
- ✅ **数据完整性校验**：文件、消息的完整性验证
- ✅ **密码存储**：用户密码的安全存储
- ✅ **数字签名**：配合 SM2 算法使用
- ✅ **消息认证码**：HMAC-SM3
:::

## 性能指标

在主流硬件上的性能表现：

| 平台 | 哈希速度 (MB/s) |
| --- | --- |
| Intel i7-12700K | 320 |
| Apple M1 | 280 |
| ARM Cortex-A72 | 180 |

## 安全建议

::: warning 使用建议
1. **不要用于加密**：哈希算法是单向的，不能用于加密
2. **加盐存储密码**：存储密码时添加随机盐值
3. **使用 HMAC**：需要密钥认证时使用 HMAC-SM3
4. **避免碰撞**：虽然理论上存在碰撞，但实际难以找到
:::

## 深入学习

::: tip 继续了解
- 📖 [算法原理](./algorithm.md) - SM3 算法详细原理
- 🔍 [哈希计算](./hash.md) - 哈希计算详解
- 🔐 [HMAC](./hmac.md) - 消息认证码
- 💡 [示例代码](./examples.md) - 实用示例
:::
