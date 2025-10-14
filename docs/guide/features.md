---
title: 核心特性
icon: star
order: 2
---

# 核心特性

SMKit 提供了丰富的特性来支持各种加密需求。

## 完整的国密算法支持

::: tip 国密算法家族
SMKit 支持完整的中国商用密码算法体系：
- **SM2**：椭圆曲线公钥密码算法
- **SM3**：密码杂凑算法
- **SM4**：分组密码算法
- **SM9**：标识密码算法
- **ZUC**：祖冲之序列密码算法
:::

## 统一的 API 设计

所有算法提供一致的接口设计：

```typescript
// 通用模式
const algorithm = new AlgorithmName(config);
const result = algorithm.process(input, key, options);
```

## 多语言支持

- TypeScript/JavaScript
- Java
- 更多语言即将支持

## 高性能实现

::: info 性能优化
- 硬件加速支持
- 算法级优化
- 内存高效管理
:::

## 安全保障

::: important 安全特性
- 密码学安全的随机数生成
- 侧信道攻击防护
- 常量时间操作
- 完整的测试覆盖
:::
