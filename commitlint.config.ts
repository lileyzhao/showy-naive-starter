import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'perf', 'style', 'test', 'docs', 'build', 'ci', 'revert', 'chore']],
    // The subject cannot end with certain symbols 主题不能以某些符号结尾
    'subject-full-stop': [2, 'never', '/[.!?,;。！？，；]$/'],
  },
}

export default config
