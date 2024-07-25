/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
    // The subject cannot end with certain symbols 主题不能以某些符号结尾
    'subject-full-stop': [2, 'never', '/[.!?,;。！？，；]$/'],
    'header-max-length': [2, 'always', 80],
  },
  prompt: {
    aiQuestionCB: ({ maxSubjectLength, diff }) => `Write an insightful and concise Git commit message in the present tense for the following Git diff code, without any prefixes, and no longer than ${maxSubjectLength} characters : \`\`\`diff\n${diff}\n\`\`\`\nYour reply must be less than or equal to ${maxSubjectLength} characters in length.`,
    // aiQuestionCB: ({ maxSubjectLength, diff }) => `用完整句子为以下 Git diff 代码写一个有见解并简洁的 Git 中文提交消息，不加任何前缀，并且内容不能超过 ${maxSubjectLength} 个字符 : \`\`\`diff\n${diff}\n\`\`\`\n你的回复结果必须小于等于 ${maxSubjectLength} 个字符。`,
    aiNumber: 5,
    aiType: 'gpt-4o',
    useEmoji: true,
    emptyScopesAlias: 'empty  | 不填写',
    customScopesAlias: 'custom | 自定义',
    messages: {
      type: 'Select the type of change that you\'re committing (选择你要提交的类型) :',
      scope: 'Denote the SCOPE of this change [optional] (选择一个提交范围 [可选的]) :',
      customScope: 'Denote the SCOPE of this change (请输入自定义的提交范围) :',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change (填写简短精炼的变更描述) :\n',
      body: 'Provide a LONGER description of the change [optional]. Use "|" to break new line (填写更加详细的变更描述 [可选的]。使用 "|" 换行) :\n',
      breaking:
        'List any BREAKING CHANGES [optional]. Use "|" to break new line (列举非兼容性重大的变更 [可选的]。使用 "|" 换行) :\n',
      footerPrefixesSelect: 'Select the ISSUES type of changeList by this change [optional] (选择关联issue前缀 [可选的]) :',
      customFooterPrefix: 'Input ISSUES prefix (输入自定义issue前缀) :',
      footer: 'Input ISSUES prefix [optional] (列举关联issue [可选] 例如: #31, #I3244) :\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above (是否提交或修改commit) ?',
      generatingByAI: 'Generating your AI commit subject... (使用 AI 生成提交主题...)',
      generatedSelectByAI: 'Select suitable subject by AI generated (从 AI 生成的主题中选择一个合适的) :',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix ', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝  文档更新 | Documentation only changes', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:',
      },
      { value: 'perf', name: 'perf:     ⚡️  代码重构 | A code change that improves performance', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:',
      },
      {
        value: 'chore',
        name: 'chore:    🔨   其他修改 | Other changes that don\'t modify src or test files',
        emoji: ':hammer:',
      },
      { value: 'revert', name: 'revert:   ⏪️  回退代码 | Reverts a previous commit', emoji: ':rewind:' },
    ],
  },
}
