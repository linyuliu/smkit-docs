---
title: API 文档
icon: book
---

# Java API 文档

完整的 Java API 参考文档。

## SM2 类

### `generateKeyPair()`

生成 SM2 密钥对。

```java
SM2 sm2 = new SM2();
SM2KeyPair keyPair = sm2.generateKeyPair();
```

### `encrypt(String message, String publicKey)`

使用公钥加密消息。

**参数**：
- `message`: 待加密的消息
- `publicKey`: 公钥

**返回值**：`String` - Base64编码的密文

## SM3 类

### `hash(String message)`

计算消息的 SM3 哈希值。

**参数**：
- `message`: 待哈希的消息

**返回值**：`String` - 十六进制哈希值

## SM4 类

### `encrypt(String plaintext, String key)`

使用 SM4 加密数据。

**参数**：
- `plaintext`: 明文
- `key`: 128位密钥

**返回值**：`String` - Base64编码的密文
