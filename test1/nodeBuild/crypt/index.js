/**
 * Created by google
 * charCode 转码 HTML
 *                 加密方式
 *        cryptKey 没完成 加密key
 *         没有完成
 */
function cryptType (type) {

}

function crypt (str, encrypt) {
  var strAscii = []
  for (var i = 0; i < str.length; i++) {
    strAscii[i] = str.charCodeAt(i)
  }
  var getAscii = ''
  for (var i = 0; i < strAscii.length; i++) {
    if (encrypt) {
      strAscii[i] = strAscii[i] - cryptKey
    }
    getAscii += strAscii[i]
    getAscii += ' '
  }
  return getAscii
}

exports.cryptHtml = function (content) {
  let data  = crypt(content)
  var _html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <script>
          function deC(str){var _Decode=String.fromCharCode;a=str.split(" "),b="";for(var i=0;i<a.length;i++)a[i]&&(b+=_Decode(a[i]));return b}~function(data,DecodeFN){document.write(deC(data))}("${data}");
          </script>
      </head>
      <body>
      </body>
      </html>
  `
  return _html
}
