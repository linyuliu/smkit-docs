---
title: API 文档
icon: book
---

# TypeScript API 文档

完整的 API 参考文档。

## SM2 API

### `generateKeyPair()`

生成 SM2 密钥对。

**返回值**：`SM2KeyPair`

### `encrypt(message, publicKey)`

使用公钥加密消息。

**参数**：
- `message`: 待加密的消息
- `publicKey`: 公钥

**返回值**：`string` - Base64编码的密文

## SM3 API

### `hash(message)`

计算消息的 SM3 哈希值。

**参数**：
- `message`: 待哈希的消息

**返回值**：`string` - 十六进制哈希值

## SM4 API

### `encrypt(plaintext, key)`

使用 SM4 加密数据。

**参数**：
- `plaintext`: 明文
- `key`: 128位密钥

**返回值**：`string` - Base64编码的密文
