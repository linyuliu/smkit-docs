---
title: ZUC 祖冲之序列密码算法
icon: stream
---

# ZUC 祖冲之序列密码算法

ZUC 是中国的流密码算法，主要用于移动通信加密。

## 算法概述

::: info ZUC 标准
ZUC 是一种基于线性反馈移位寄存器的流密码算法。

**标准文档**：
- GM/T 0001-2012：ZUC 序列密码算法
:::

## 主要特性

### 算法版本

| 版本 | 密钥长度 | IV长度 | 应用场景 |
| --- | --- | --- | --- |
| ZUC-128 | 128 bits | 128 bits | 4G LTE |
| ZUC-256 | 256 bits | 184 bits | 5G |

## 快速开始

```typescript
import { ZUC } from '@smkit/core';

const zuc = new ZUC();

// 生成密钥流
const key = '00000000000000000000000000000000';
const iv = '00000000000000000000000000000000';
const keystream = zuc.generateKeystream(key, iv, 1000);

// 加密
const plaintext = 'Hello, ZUC!';
const ciphertext = zuc.encrypt(plaintext, key, iv);
```

## 应用场景

- 4G/5G 移动通信
- 物联网数据传输
- 实时视频加密
- 流媒体保护
