---
---

# 普通行

普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示普通行演示

# 无序列表

* 第一项
* 第二项
* 第三项

# 有序列表

1. 第一项
2. 第二项
3. 第三项

# 代码块

```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

# 数学公式

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they areWhen $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they areWhen $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

# 表格

水果名称| 价格 |  数量  
-|-|-
香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |

# 图片

![有问题上知乎 图标](https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png)

# 标记
> 重点或者引用区块标记

# 自定义容器

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

# 警告

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.