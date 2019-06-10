// 带版本号的文件夹名字
module.exports = { // 文件夹替换（注意文件夹名称的唯一性，文件内容也会做搜索替换）
  before: 'RESOURCE_VERSION', // 替换前
  after: 'v2', // 替换后
  replace: [/RESOURCE_VERSION/g, 'v2'],
  replaceH5:[/h5resource/g, 'h5\/resource']
}
