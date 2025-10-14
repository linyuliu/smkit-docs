---
title: SHA 哈希算法
icon: fingerprint
---

# SHA 安全哈希算法

SHA 系列哈希算法的介绍。

## 算法版本

- SHA-1 (已不推荐使用)
- SHA-256 (推荐)
- SHA-512 (高安全场景)

## 使用示例

```typescript
import { SHA256, SHA512 } from '@smkit/core';

const sha256 = new SHA256();
const hash256 = sha256.hash('message');

const sha512 = new SHA512();
const hash512 = sha512.hash('message');
```
