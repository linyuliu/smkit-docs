---
title: SM9 标识密码算法
icon: id-card
---

# SM9 标识密码算法

SM9 是基于身份的密码算法，简化了传统 PKI 的证书管理。

## 算法概述

::: info SM9 标准
SM9 是中国的标识密码算法标准，基于双线性对。

**标准文档**：
- GM/T 0044-2016：SM9 标识密码算法
:::

## 主要特性

### 基于身份

使用用户身份（如邮箱、手机号）直接作为公钥：

::: tip 优势
- ✅ **简化密钥管理**：无需证书
- ✅ **易于使用**：身份即公钥
- ✅ **降低成本**：减少 CA 基础设施
:::

## 快速开始

```typescript
import { SM9 } from '@smkit/core';

const sm9 = new SM9();

// 使用身份加密
const identity = 'alice@example.com';
const message = 'Secret message';
const ciphertext = sm9.encrypt(message, identity);
```

## 应用场景

- 企业内部通信
- 物联网设备认证
- 云存储加密
- 电子邮件加密
