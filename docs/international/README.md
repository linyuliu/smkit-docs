---
title: 国际算法
icon: globe
---

# 国际标准算法

SMKit 扩展支持常用的国际加密算法。

## 支持的算法

### AES (Advanced Encryption Standard)

::: info AES
高级加密标准，美国 NIST 标准。

**特点**：
- 分组长度：128 bits
- 密钥长度：128/192/256 bits
- 广泛应用于各种场景
:::

```typescript
import { AES } from '@smkit/core';

const aes = new AES();
const encrypted = aes.encrypt(plaintext, key);
```

### RSA

::: info RSA
经典的非对称加密算法。

**特点**：
- 基于大数分解难题
- 密钥长度：1024/2048/4096 bits
- 成熟稳定
:::

```typescript
import { RSA } from '@smkit/core';

const rsa = new RSA();
const keyPair = rsa.generateKeyPair(2048);
```

### SHA (Secure Hash Algorithm)

::: info SHA
安全哈希算法系列。

**支持版本**：
- SHA-1 (已不推荐)
- SHA-256
- SHA-512
:::

```typescript
import { SHA256 } from '@smkit/core';

const sha256 = new SHA256();
const hash = sha256.hash('Hello, World!');
```

### ECDSA

::: info ECDSA
椭圆曲线数字签名算法。

**特点**：
- 基于椭圆曲线
- 密钥长度短
- 性能优秀
:::

```typescript
import { ECDSA } from '@smkit/core';

const ecdsa = new ECDSA();
const signature = ecdsa.sign(message, privateKey);
```

## 算法对比

| 算法 | 类型 | 安全强度 | 性能 | 应用场景 |
| --- | --- | --- | --- | --- |
| SM2 | 非对称 | 高 | 优秀 | 国密合规 |
| RSA | 非对称 | 高 | 一般 | 通用场景 |
| SM4 | 对称 | 高 | 优秀 | 国密合规 |
| AES | 对称 | 高 | 优秀 | 通用场景 |
| SM3 | 哈希 | 高 | 优秀 | 国密合规 |
| SHA-256 | 哈希 | 高 | 优秀 | 通用场景 |

## 选择建议

::: tip 如何选择
- **国内合规场景**：优先使用 SM2/SM3/SM4
- **国际互操作**：使用 RSA/AES/SHA
- **移动端/IoT**：考虑性能，SM4/ZUC 表现优秀
- **高安全要求**：使用 256 位密钥长度的算法
:::
