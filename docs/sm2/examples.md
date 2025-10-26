---
title: 示例代码
icon: code
order: 7
---

# SM2 示例代码

本文提供 SM2 算法的实用示例代码，涵盖常见使用场景。

## 密钥生成

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { generateKeyPair, getPublicKeyFromPrivateKey } from 'smkit';

// 1. 生成新密钥对
const keyPair = generateKeyPair();
console.log('公钥:', keyPair.publicKey);
console.log('私钥:', keyPair.privateKey);

// 2. 从私钥派生公钥
const privateKey = '00B9AB0B828FF68872F21A837FC303668428DEA11DCD1B24429D0C99E24EED83D5';
const publicKey = getPublicKeyFromPrivateKey(privateKey);
console.log('派生的公钥:', publicKey);

// 3. 使用面向对象 API
import { SM2 } from 'smkit';
const sm2 = SM2.generateKeyPair();
console.log('公钥:', sm2.getPublicKey());
console.log('私钥:', sm2.getPrivateKey());
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;
import io.github.smkit.sm2.KeyPair;

// 1. 生成新密钥对
KeyPair keyPair = SM2Util.generateKeyPair();
System.out.println("公钥: " + keyPair.getPublicKey());
System.out.println("私钥: " + keyPair.getPrivateKey());

// 2. 从私钥派生公钥
String privateKey = "00B9AB0B828FF68872F21A837FC303668428DEA11DCD1B24429D0C99E24EED83D5";
String publicKey = SM2Util.getPublicKeyFromPrivateKey(privateKey);
System.out.println("派生的公钥: " + publicKey);

// 3. 使用面向对象 API
import io.github.smkit.sm2.SM2;
KeyPair kp = SM2Util.generateKeyPair();
SM2 sm2 = new SM2()
    .setPublicKey(kp.getPublicKey())
    .setPrivateKey(kp.getPrivateKey());
```

:::

## 加密与解密

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm2Encrypt, sm2Decrypt, generateKeyPair, SM2CipherMode } from 'smkit';

// 生成密钥对
const keyPair = generateKeyPair();

// 加密消息
const message = 'Hello, SM2! 你好，国密！';
const ciphertext = sm2Encrypt(keyPair.publicKey, message);
console.log('密文:', ciphertext);

// 解密消息
const plaintext = sm2Decrypt(keyPair.privateKey, ciphertext);
console.log('明文:', plaintext); // Hello, SM2! 你好，国密！

// 使用不同的密文模式
const ct1 = sm2Encrypt(keyPair.publicKey, message, SM2CipherMode.C1C3C2); // 默认模式
const ct2 = sm2Encrypt(keyPair.publicKey, message, SM2CipherMode.C1C2C3); // 兼容模式

// 解密时指定对应模式
const pt1 = sm2Decrypt(keyPair.privateKey, ct1, SM2CipherMode.C1C3C2);
const pt2 = sm2Decrypt(keyPair.privateKey, ct2, SM2CipherMode.C1C2C3);
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;
import io.github.smkit.sm2.KeyPair;

// 生成密钥对
KeyPair keyPair = SM2Util.generateKeyPair();

// 加密消息（默认 C1C3C2 模式）
String message = "Hello, SM2! 你好，国密！";
String ciphertext = SM2Util.encrypt(keyPair.getPublicKey(), message);
System.out.println("密文: " + ciphertext);

// 解密消息
String plaintext = SM2Util.decrypt(keyPair.getPrivateKey(), ciphertext);
System.out.println("明文: " + plaintext); // Hello, SM2! 你好，国密！

// 使用不同的密文模式
String ct1 = SM2Util.encrypt(keyPair.getPublicKey(), message, "C1C3C2"); // 默认模式
String ct2 = SM2Util.encrypt(keyPair.getPublicKey(), message, "C1C2C3"); // 兼容模式

// 解密时指定对应模式
String pt1 = SM2Util.decrypt(keyPair.getPrivateKey(), ct1, "C1C3C2");
String pt2 = SM2Util.decrypt(keyPair.getPrivateKey(), ct2, "C1C2C3");
```

:::

## 数字签名

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sign, verify, generateKeyPair } from 'smkit';

// 生成密钥对
const keyPair = generateKeyPair();

// 签名数据
const data = '重要文件内容';
const signature = sign(keyPair.privateKey, data);
console.log('签名:', signature);

// 验证签名
const isValid = verify(keyPair.publicKey, data, signature);
console.log('签名验证:', isValid); // true

// 使用自定义用户 ID
const userId = 'user@example.com';
const sig2 = sign(keyPair.privateKey, data, { userId });
const valid2 = verify(keyPair.publicKey, data, sig2, { userId });

// 使用 DER 格式签名
const derSig = sign(keyPair.privateKey, data, { der: true });
const validDer = verify(keyPair.publicKey, data, derSig, { der: true });
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;
import io.github.smkit.sm2.KeyPair;
import java.util.Map;

// 生成密钥对
KeyPair keyPair = SM2Util.generateKeyPair();

// 签名数据
String data = "重要文件内容";
String signature = SM2Util.sign(keyPair.getPrivateKey(), data);
System.out.println("签名: " + signature);

// 验证签名
boolean isValid = SM2Util.verify(keyPair.getPublicKey(), data, signature);
System.out.println("签名验证: " + isValid); // true

// 使用自定义用户 ID
Map<String, Object> signOptions = Map.of("userId", "user@example.com");
String sig2 = SM2Util.sign(keyPair.getPrivateKey(), data, signOptions);
boolean valid2 = SM2Util.verify(keyPair.getPublicKey(), data, sig2, signOptions);

// 使用 DER 格式签名
Map<String, Object> derOptions = Map.of("der", true);
String derSig = SM2Util.sign(keyPair.getPrivateKey(), data, derOptions);
boolean validDer = SM2Util.verify(keyPair.getPublicKey(), data, derSig, derOptions);
```

:::

## 公钥格式转换

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { compressPublicKey, decompressPublicKey } from 'smkit';

// 非压缩公钥（130个十六进制字符，04开头）
const uncompressedKey = '04' +
  '32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7' +
  'BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0';

// 压缩公钥（66个十六进制字符，02或03开头）
const compressedKey = compressPublicKey(uncompressedKey);
console.log('压缩公钥:', compressedKey);
console.log('长度:', compressedKey.length); // 66

// 解压缩
const decompressed = decompressPublicKey(compressedKey);
console.log('解压后:', decompressed);
console.log('是否相同:', decompressed === uncompressedKey); // true
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;

// 非压缩公钥（130个十六进制字符，04开头）
String uncompressedKey = "04" +
    "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7" +
    "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0";

// 压缩公钥（66个十六进制字符，02或03开头）
String compressedKey = SM2Util.compressPublicKey(uncompressedKey);
System.out.println("压缩公钥: " + compressedKey);
System.out.println("长度: " + compressedKey.length()); // 66

// 解压缩
String decompressed = SM2Util.decompressPublicKey(compressedKey);
System.out.println("解压后: " + decompressed);
System.out.println("是否相同: " + decompressed.equals(uncompressedKey)); // true
```

:::

## 混合加密（SM2 + SM4）

使用 SM2 保护 SM4 密钥，SM4 加密数据：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm2Encrypt, sm2Decrypt, sm4Encrypt, sm4Decrypt, generateKeyPair } from 'smkit';
import * as crypto from 'crypto';

// === 发送方（加密） ===

// 1. 生成随机 SM4 密钥（128位）
const sm4Key = crypto.randomBytes(16).toString('hex');

// 2. 使用 SM4 加密大量数据
const largeData = '这是一个很长的文件内容...'.repeat(1000);
const encryptedData = sm4Encrypt(sm4Key, largeData);

// 3. 使用接收方的 SM2 公钥加密 SM4 密钥
const receiverKeyPair = generateKeyPair();
const encryptedKey = sm2Encrypt(receiverKeyPair.publicKey, sm4Key);

// === 接收方（解密） ===

// 1. 使用 SM2 私钥解密 SM4 密钥
const decryptedSm4Key = sm2Decrypt(receiverKeyPair.privateKey, encryptedKey);

// 2. 使用 SM4 密钥解密数据
const decryptedData = sm4Decrypt(decryptedSm4Key, encryptedData);
console.log('解密成功:', decryptedData === largeData);
```

@tab Java

```java
import io.github.smkit.sm2.SM2Util;
import io.github.smkit.sm4.SM4Util;
import io.github.smkit.sm2.KeyPair;
import io.github.smkit.SmKitUtil;
import java.security.SecureRandom;

// === 发送方（加密） ===

// 1. 生成随机 SM4 密钥（128位）
SecureRandom random = new SecureRandom();
byte[] sm4KeyBytes = new byte[16];
random.nextBytes(sm4KeyBytes);
String sm4Key = SmKitUtil.bytesToHex(sm4KeyBytes);

// 2. 使用 SM4 加密大量数据
String largeData = "这是一个很长的文件内容...".repeat(1000);
String encryptedData = SM4Util.encrypt(sm4Key, largeData);

// 3. 使用接收方的 SM2 公钥加密 SM4 密钥
KeyPair receiverKeyPair = SM2Util.generateKeyPair();
String encryptedKey = SM2Util.encrypt(receiverKeyPair.getPublicKey(), sm4Key);

// === 接收方（解密） ===

// 1. 使用 SM2 私钥解密 SM4 密钥
String decryptedSm4Key = SM2Util.decrypt(receiverKeyPair.getPrivateKey(), encryptedKey);

// 2. 使用 SM4 密钥解密数据
String decryptedData = SM4Util.decrypt(decryptedSm4Key, encryptedData);
System.out.println("解密成功: " + decryptedData.equals(largeData));
```

:::

## 相关链接

- [加密算法详解](./encrypt.md)
- [解密算法详解](./decrypt.md)
- [签名算法详解](./sign.md)
- [验签算法详解](./verify.md)
