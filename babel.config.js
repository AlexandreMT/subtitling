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
        '@config': './src/config',
        '@models': './src/models',
        '@routes': './src/routes',
        '@services': './src/services',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@subtitling': './src/subtitling'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
