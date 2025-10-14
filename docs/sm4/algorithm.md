---
title: SM4 算法原理
icon: book
---

# SM4 算法原理

SM4 分组密码算法的详细原理。

## 算法参数

- 分组长度：128 bits
- 密钥长度：128 bits
- 轮数：32 轮

## 轮函数

$$
F(X_0, X_1, X_2, X_3, rk) = X_0 \oplus T(X_1 \oplus X_2 \oplus X_3 \oplus rk)
$$
