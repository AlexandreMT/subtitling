module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@subtitling': './src/subtitling',
        '@utils': './src/utils'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts',
    '**/*.d.ts'
  ]
}
