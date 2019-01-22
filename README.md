# JsonReact

> 通过json来渲染生成react node 从而来达到json渲染页面的效果

### example

```bash
npm run example
```

### test

```bash
npm run test
```

### 如何定义一个Json自定义组件

```typescript
type JRComponent = {
  name?: string, // 组件名称
  reducer?: Reducer<any, any>, // 组件的reducer 控制组件的数据
  Cls: React.ComponentType<any>, // 组件的实现
  actionKeys?: StringMap<DescribableKey>, // 组件的处罚reducer的key
  eventKeys?: StringMap<DescribableKey> // 组件的可触发事件的描述
}
```
