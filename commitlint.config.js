module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ],
  // 自定义规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 系统构建
        'chore', // 非src变动
        'ci', // CI/CD 调整
        'docs', // 文档（documentation）
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'perf', // 性能提升
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        'style', // 格式调整（不影响代码运行的变动）
        'test', // 增加测试
        'init', // 初始化第一版
      ]
    ]
  }
};
