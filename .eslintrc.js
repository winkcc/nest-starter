module.exports = {
  extends: '@antfu',
  rules: {
    'no-void': ['off'], // 允许void类型，间接允许返回void类型时，不写return。由于存在对express next()等库方法的调用，为保证类型兼容，此项须关闭。
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }], // 忽略 rest 属性的兄弟属性，便于解构；忽略函数中下划线开头的参数。
    '@typescript-eslint/consistent-type-imports': ['off'], // Nest.js的依赖注入会被识别为type-imports，自动fix会在import添加type，导致注入失败，此项必须关闭。
    'dot-notation': ['off'], // 依赖库中的值可能使用`[key: string]: any`式的类型定义，我们调用时不可避免的需要使用`obj['key']`来访问某些成员，比如ConfigModule。
  },
}
