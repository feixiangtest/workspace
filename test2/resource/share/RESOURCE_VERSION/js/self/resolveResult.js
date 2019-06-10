/**
 * 用于解析第三发平台的结果
 * 不要用es6 语法
 */
;(window.resolveResult = (function () {
  return {
    CardColor: {
      '1': 'heitao',
      '2': 'hongtao',
      '3': 'meihua',
      '4': 'fangkuai'
    },
    DCCardColor: {
      '1': 'green',
      '2': 'yellow',
      '3': 'purple',
      '4': 'blue',
      '5': 'white'
    },
    Card: {
      '01': 'A',
      '02': '2',
      '03': '3',
      '04': '4',
      '05': '5',
      '06': '6',
      '07': '7',
      '08': '8',
      '09': '9',
      '10': '10',
      '11': 'J',
      '12': 'Q',
      '13': 'K'
    },
    Points: {
      '01': 1,
      '02': 2,
      '03': 3,
      '04': 4,
      '05': 5,
      '06': 6,
      '07': 7,
      '08': 8,
      '09': 9,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0
    },
    /**
     *交易记录，解析查看结果数据
     */
    resolveResult: function (gameId, gameResult) {
      if (!gameResult) {
        return ''
      }
      gameResult = JSON.parse(gameResult.replace(/\\/g, ''))
      var res
      switch (gameId) {
        case '101':// 百家乐
          return this.resolveBaccarat(gameResult)
        case '102':// 龙虎
          res = this.resolveDragonTiger(gameResult)
          return this.assembleDragonTiger(res)
        case '103':// 骰宝
          res = this.resolveCussec(gameResult)
          return this.assembleCussec(res)
        case '104':// 轮盘
          res = {'roulette': gameResult.content, 'name': 'Roulette', 'result': gameResult.result}
          return this.assembleRoulette(res)
        case '105':// 番摊
          res = {'fantan': gameResult.content, 'name': 'FanTan', 'result': gameResult.result}
          return this.assembleFantan(res)
        case '106':// 牛牛
          res = this.resolveNiuNiu(gameResult)
          return this.assembleNiuNiu(res)
        case '107':// BJ（21点）
          res = this.resolveBJ(gameResult)
          return this.assembleBJ(res)
        case '108':// 炸金花
          res = this.resolveGoldenFlower(gameResult)
          return this.assembleGoldenFlower(res)
        case '109':// 斗牛
          res = this.resolveBull(gameResult)
          return this.assembleBull(res)
        case '201':// 多彩百家乐
          res = this.resolveDCBaccarat(gameResult)
          return this.assembleDCBaccarat(res)
        case '202':// 经典龙虎
          res = this.resolveDragonTiger(gameResult)
          return this.assembleDragonTiger(res)
        default:
          return {'name': 'MSG', 'msg': '游戏结果同步中，请稍后重试!'}
      }
    },
    /**
     *交易记录，解析查看结果数据
     */
    resolveH5Result: function (gameId, gameResult) {
      if (!gameResult) {
        return ''
      }
      gameResult = JSON.parse(gameResult.replace(/\\/g, ''))
      switch (gameId) {
        case '101':// 百家乐
          return this.resolveBaccarat(gameResult)
        case '102':// 龙虎
          return this.resolveDragonTiger(gameResult)
        case '103':// 骰宝
          return this.resolveCussec(gameResult)
        case '104':// 轮盘
          return {'roulette': gameResult.content, 'name': 'Roulette', 'result': gameResult.result}
        case '105':// 番摊
          return {'fantan': gameResult.content, 'name': 'FanTan', 'result': gameResult.result}
        case '106':// 牛牛
          return this.resolveNiuNiu(gameResult)
        case '107':// BJ（21点）
          return this.resolveBJ(gameResult)
        case '108':// 炸金花
          return this.resolveGoldenFlower(gameResult)
        case '109':// 斗牛
          return this.resolveBull(gameResult)
        case '201':// 多彩百家乐
          return this.resolveDCBaccarat(gameResult)
        case '202':// 经典龙虎
          return this.resolveDragonTiger(gameResult)
        default:
          return {'name': 'MSG', 'msg': '游戏结果同步中，请稍后重试!'}
      }
    },
    /**
     * 百家乐
     * 数据格式 [{'result':'庄9','content':'111,409,0', 'win':1},{'result':'闲9','content':'111,409,0','win':0}]
     * @param {*} gameResult
     * 返回结果格式{xian:{point:'',card:[]},zhuang:{point:'',card:[]}}
     */
    resolveBaccarat: function (gameResult) {
      // 闲的牌
      var xianCard = []
      // 庄的牌
      var zhuangCard = []
      // 闲的点数
      var xianPoint = 0
      // 庄的点数
      var zhuangPoint = 0
      var xianBornToWin = 0
      var zhuangBornToWin = 0
      for (var i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          for (let j = 0; j < playerCard.length; j++) {
            if (Number(playerCard[j]) !== 0) {
              // 获取 花色
              let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
              // 获取 牌数
              let result2 = playerCard[j].slice(playerCard[j].length - 2)
              let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
              // 闲的牌
              if (i === 0) {
                // 闲的点数相加
                xianPoint += this.Points[result2]
                xianCard.push(card)
              } else {
                // 庄的点数相加
                zhuangPoint += this.Points[result2]
                // 庄的牌数
                zhuangCard.push(card)
              }
            }
          }
        }
      }
      xianPoint = xianPoint % 10
      zhuangPoint = zhuangPoint % 10
      if (Number(gameResult[0].content.split(',')[2]) === 0 && xianPoint > 7 && xianPoint > zhuangPoint) {
        xianBornToWin = 1
      }
      if (Number(gameResult[1].content.split(',')[2]) === 0 && zhuangPoint > 7 && zhuangPoint > xianPoint) {
        zhuangBornToWin = 1
      }
      return {'xian': {'point': xianPoint, 'card': xianCard, 'bornToWin': xianBornToWin, 'result': gameResult[0].result, 'win': gameResult[0].win},
        'zhuang': {'point': zhuangPoint, 'card': zhuangCard, 'bornToWin': zhuangBornToWin, 'result': gameResult[1].result, 'win': gameResult[1].win},
        'name': 'Baccarat'}
    },
    /**
     * 龙虎
     * 数据格式 [{“result”:”龙3”,“content”:”303”, 'win':0},{“result”:”虎9”,“content”:”409”, 'win':1}]
     * @param {*} gameResult
     */
    resolveDragonTiger: function (gameResult) {
      // 龙的牌
      let dragonCard = []
      // 虎的牌
      let tigerCard = []
      // 龙的点数
      let dragonPoint = ''
      // 虎的点数
      let tigerPoint = ''
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          // 获取花色
          let result1 = gameResult[i].content.slice(0, gameResult[i].content.length - 2)
          // 获取牌数
          let result2 = gameResult[i].content.slice(gameResult[i].content.length - 2)
          let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
          // 如果是龙
          if (i < 1) {
            // 龙的点数
            dragonPoint = this.Card[result2]
            // 龙的牌
            dragonCard.push(card)
            // 如果是虎
          } else {
            // 虎的点数
            tigerPoint = this.Card[result2]
            // 虎的牌数
            tigerCard.push(card)
          }
        }
      }
      return {'dragon': {'point': dragonPoint, 'card': dragonCard, 'result': gameResult[0].result, 'win': gameResult[0].win},
        'tiger': {'point': tigerPoint, 'card': tigerCard, 'result': gameResult[1].result, 'win': gameResult[1].win},
        'name': 'DragonTiger'}
    },
    /**
     * 骰宝
     * 数据格式 {"result":"14,双,大","content":"4,4,6"}
     * @param {*} gameResult
     */
    resolveCussec: function (gameResult) {
      if (gameResult) {
        return {'cussec': gameResult.content.split(','), 'name': 'Cussec', 'result': gameResult.result}
      }
      return {'cussec': '', 'name': 'Cussec'}
    },
    /**
     * 牛牛
     * 数据格式 [{“result”:”庄牛9”,“content”:“111,412,310,209,313”},
     *          {“result”:”闲1牛3”,“content”:”311,407,403,306,304”},
     *          {“result”:”闲2牛牛”,“content”:”311,407,403,306,304”},
     *          {“result”:”闲3牛2”,“content”:”311,407,403,301,301”}]
     * @param {*} gameResult
     */
    resolveNiuNiu: function (gameResult) {
      // 牌
      let gameCard = []
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          let content = []
          for (let j = 0; j < playerCard.length; j++) {
            // 获取花色
            let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
            // 获取牌数
            let result2 = playerCard[j].slice(playerCard[j].length - 2)
            let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
            content.push(card)
          }
          let obj = {'result': gameResult[i].result, 'content': content}
          gameCard.push(obj)
        }
      }
      return {'card': gameCard, 'name': 'NiuNiu'}
    },
    /**
     * BJ（21点）
     * 数据格式 [{“result”:”庄家21”,“content”:“111,409,413”,”win”:”1”},{“result”:”闲一18”,“content”:”312,403,305”,”win”:”0”}]
     * @param {*} gameResult
     */
    resolveBJ: function (gameResult) {
      // 牌
      let gameCard = []
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          let content = []
          for (let j = 0; j < playerCard.length; j++) {
            // 获取花色
            let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
            // 获取牌数
            let result2 = playerCard[j].slice(playerCard[j].length - 2)
            let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
            content.push(card)
          }
          let obj = {'result': gameResult[i].result, 'win': gameResult[i].win, 'content': content}
          gameCard.push(obj)
        }
      }
      return {'card': gameCard, 'name': '21Point'}
    },
    /**
     * 炸金花
     * 数据格式 [{“result”:”龙散牌A”,“content”:“308,401,203”,”win”:”1”},{“result”:凤散牌Q”,“content”:”109,412,408”,”win”:”0”}]
     * @param {*} gameResult
     */
    resolveGoldenFlower: function (gameResult) {
      // 牌
      let gameCard = []
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          let content = []
          for (let j = 0; j < playerCard.length; j++) {
            // 获取花色
            let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
            // 获取牌数
            let result2 = playerCard[j].slice(playerCard[j].length - 2)
            let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
            content.push(card)
          }
          let obj = {'result': gameResult[i].result, 'win': gameResult[i].win, 'content': content}
          gameCard.push(obj)
        }
      }
      return {'card': gameCard, 'name': 'GoldenFlower'}
    },
    /**
     * 斗牛
     * 数据格式 [{“result”:”红牛牛9”,“content”:“111,412,310,209,313”,"win": 1},
     *          {“result”:”黑牛牛2”,“content”:”311,407,403,301,301”, "win": 0}]
     * @param {*} gameResult
     */
    resolveBull: function (gameResult) {
      // 牌
      let gameCard = []
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          let content = []
          for (let j = 0; j < playerCard.length; j++) {
            // 获取花色
            let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
            // 获取牌数
            let result2 = playerCard[j].slice(playerCard[j].length - 2)
            let card = {'color': this.CardColor[result1], 'point': this.Card[result2]}
            content.push(card)
          }
          let obj = {'result': gameResult[i].result, 'win': gameResult[i].win, 'content': content}
          gameCard.push(obj)
        }
      }
      return {'card': gameCard, 'name': 'Bull'}
    },
    resolveDCBaccarat: function (gameResult) {
      // 闲的牌
      let xianCard = []
      // 庄的牌
      let zhuangCard = []
      for (let i = 0; i < gameResult.length; i++) {
        // 判断是否有牌
        if (gameResult[i]) {
          let playerCard = gameResult[i].content.split(',')
          for (let j = 0; j < playerCard.length; j++) {
            if (Number(playerCard[j]) !== 0) {
              // 获取花色
              let result1 = playerCard[j].slice(0, playerCard[j].length - 2)
              // 获取牌数
              let result2 = playerCard[j].slice(playerCard[j].length - 2)
              let card = {'color': this.DCCardColor[result1], 'point': Number(result2)}
              // 闲的牌
              if (i === 0) {
                xianCard.push(card)
              } else {
                // 庄的牌数
                zhuangCard.push(card)
              }
            }
          }
        }
      }
      return {'xian': {'card': xianCard, 'result': gameResult[0].result, 'win': gameResult[0].win},
        'zhuang': {'card': zhuangCard, 'result': gameResult[1].result, 'win': gameResult[1].win},
        'name': 'DCBaccarat'}
    },
    /**
     * 组装百家乐HTML代码
     * @param result
     */
    assembleBaccarat: function (result) {
      let winPlayer = '和'
      if (Number(result.xian.win) === 1) {
        winPlayer = '闲赢'
      } else if (Number(result.zhuang.win) === 1) {
        winPlayer = '庄赢'
      }
      let zhuangCard = ''
      let xianCard = ''
      for (let i = 0; i < result.xian.card.length; i++) {
        xianCard += '<div class="card ' + (i > 1 ? 'card-horizontal' : '') + ' card-' + result.xian.card[i].color + ' card-' + result.xian.card[i].point + '">' +
              '           <div class="card-number"></div>' +
              '           <div class="card-shape"></div>' +
              '        </div>'
      }
      for (let i = 0; i < result.zhuang.card.length; i++) {
        zhuangCard += '<div class="card ' + (i > 1 ? 'card-horizontal' : '') + ' card-' + result.zhuang.card[i].color + ' card-' + result.zhuang.card[i].point + '">' +
              '           <div class="card-number"></div>' +
              '           <div class="card-shape"></div>' +
              '        </div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox game-bgl">' +
          '                <div class="gametitle">' + winPlayer + '<span>（' + result.xian.result + ' , ' + result.zhuang.result + '）</span></div>' +
          '                <div class="cardline-bgl">' +
          '                    <div class="cardline ' + (Number(result.xian.win) === 1 ? 'winer' : '') + '">' +
          '                        <div>' +
          '                            <div class="card-title">' +
          '                                <div class="card-pretitle">闲</div>' +
          '                                <div class="card-suftitle">' + result.xian.point + '</div>' +
          '                            </div>' +
          '                            <div class="wintxt"></div>' +
          '                        </div>' +
          '                        <div class="bglcard-part">' + xianCard +
          '                        </div>' +
          '                    </div>' +
          '                    <div class="cardline ' + (Number(result.zhuang.win) === 1 ? 'winer' : '') + '">' +
          '                        <div class="bgltitle-part">' +
          '                            <div class="card-title">' +
          '                                <div class="card-pretitle">庄</div>' +
          '                                <div class="card-suftitle">' + result.zhuang.point + '</div>' +
          '                            </div>' +
          '                            <div class="wintxt"></div>' +
          '                        </div>' +
          '                        <div class="bglcard-part">' + zhuangCard +
          '                        </div>' +
          '                    </div>' +
          '                </div>' +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装龙虎
    * @param result
    */
    assembleDragonTiger: function (result) {
      let winPlayer = '和'
      if (Number(result.dragon.win) === 1) {
        winPlayer = '龙赢'
      } else if (Number(result.tiger.win) === 1) {
        winPlayer = '虎赢'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox game-bgl-dragontiger game-bgl">' +
          '                <div class="gametitle">' + winPlayer + '<span>（' + result.dragon.result + ' , ' + result.tiger.result + '）</span></div>' +
          '                <div class="cardline-bgl">' +
          '                    <div class="cardline ' + (Number(result.dragon.win) === 1 ? 'winer' : '') + '">' +
          '                        <div>' +
          '                            <div class="card-title">' +
          '                                <div class="card-pretitle">龙</div>' +
          '                                <div class="card-suftitle">' + result.dragon.point + '</div>' +
          '                            </div>' +
          '                            <div class="wintxt"></div>' +
          '                        </div>' +
          '                        <div class="bglcard-part">' +
          '                            <div class="card card-' + result.dragon.card[0].color + ' card-' + result.dragon.card[0].point + '">' +
          '                                <div class="card-number"></div>' +
          '                                <div class="card-shape"></div>' +
          '                            </div>' +
          '                        </div>' +
          '                    </div>' +
          '                    <div class="cardline ' + (Number(result.tiger.win) === 1 ? 'winer' : '') + '">' +
          '                        <div class="bgltitle-part">' +
          '                            <div class="card-title">' +
          '                                <div class="card-pretitle">虎</div>' +
          '                                <div class="card-suftitle">' + result.tiger.point + '</div>' +
          '                            </div>' +
          '                            <div class="wintxt"></div>' +
          '                        </div>' +
          '                        <div class="bglcard-part">' +
          '                            <div class="card card-' + result.tiger.card[0].color + ' card-' + result.tiger.card[0].point + '">' +
          '                                <div class="card-number"></div>' +
          '                                <div class="card-shape"></div>' +
          '                            </div>' +
          '                        </div>' +
          '                    </div>' +
          '                </div>' +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装骰宝
    * @param result
    */
    assembleCussec: function (result) {
      if (!result.cussec) {
        return
      }
      let gameResult = ''
      if (Number(result.cussec[0]) !== Number(result.cussec[1]) || Number(result.cussec[1]) !== Number(result.cussec[2]) || Number(result.cussec[0]) !== Number(result.cussec[2])) {
        let res = result.result.split(',')
        gameResult = '<div class="card-title">' +
              '                        <div class="card-pretitle">' + res[0] + '/' + res[1] + '</div>' +
              '                        <div class="card-suftitle">' + res[2] + '</div>' +
              '                    </div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox game-ballgass game-ballgass-suibao">' +
          '                <div class="gametitle"><span>' + result.result + '</span></div>' +
          '                <div class="cardline">' + gameResult +
          '                    <div class="ballgase-ball"><img src="/resource/share/RESOURCE_VERSION/imgs/video/touzi' + result.cussec[0] + '.png"></div>' +
          '                    <div class="ballgase-ball"><img src="/resource/share/RESOURCE_VERSION/imgs/video/touzi' + result.cussec[1] + '.png"></div>' +
          '                    <div class="ballgase-ball"><img src="/resource/share/RESOURCE_VERSION/imgs/video/touzi' + result.cussec[2] + '.png"></div>' +
          '                </div>' +
          '            </div>' +
          '        </div>'
    },

    /**
    * 组装轮盘
    * @param result
    */
    assembleRoulette: function (result) {
      let html = '<div class="gameboxout">' +
          '            <div class="gamebox game-ballgass game-ballgass-turn">' +
          '                <div class="cardline">' +
          '                    <div class="ballgase-ball">' +
          '                        <div class="ball-number">0</div>' +
          '                        <img src="/resource/share/RESOURCE_VERSION/imgs/video/lunpanlv.png">' +
          '                    </div>' +
          '                </div>' +
          '            </div>' +
          '        </div>'
      if (Number(result.roulette) !== 0) {
        let res = result.result.split(',')
        let color = 'lunpanhong'
        // 1）1-10、19-28，奇数为红色，偶数为黑色；
        if (res[0] < 11 || (res[0] < 29 && res[0] > 18)) {
          if (res[0] % 2 === 0) {
            color = 'lunpanhei'
          } else {
            color = 'lunpanhong'
          }
        } else if ((res[0] > 10 && res[0] < 19) || res[0] > 28) {
          // 11-18、29-36，奇数为黑色，偶数为红色
          if (res[0] % 2 === 0) {
            color = 'lunpanhong'
          } else {
            color = 'lunpanhei'
          }
        }
        html = '<div class="gameboxout">' +
              '            <div class="gamebox game-ballgass game-ballgass-turn">' +
              '                <div class="gametitle"><span>' + result.result + '</span></div>' +
              '                <div class="cardline">' +
              '                    <div class="card-title">' +
              '                        <div class="card-pretitle">' + res[1] + '/' + res[2] + '</div>' +
              '                        <div class="card-suftitle">' + res[0] + '</div>' +
              '                    </div>' +
              '                    <div class="ballgase-ball">' +
              '                        <div class="ball-number">' + result.roulette + '</div>' +
              '                        <img src="/resource/share/RESOURCE_VERSION/imgs/video/' + color + '.png">' +
              '                    </div>' +
              '                </div>' +
              '            </div>' +
              '        </div>'
      }
      return html
    },

    /**
    * 组装番摊结果
    * @param result
    */
    assembleFantan: function (result) {
      let res = result.result.split(',')
      let gameResult = ''
      for (let i = 0; i < result.fantan; i++) {
        gameResult += '<div class="ballgase-ball"><img src="/resource/share/RESOURCE_VERSION/imgs/video/fantan.png"></div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox game-ballgass">' +
          '                <div class="gametitle"><span>' + result.result + '</span></div>' +
          '                <div class="cardline">' +
          '                    <div class="card-title">' +
          '                        <div class="card-pretitle">' + res[1] + '</div>' +
          '                        <div class="card-suftitle">' + res[0] + '</div>' +
          '                    </div>' + gameResult +
          '                </div>' +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装牛牛结果
    * @param result
    */
    assembleNiuNiu: function (result) {
      let gameCard = []
      let cardHtml = ''
      for (let i = 0; i < result.card.length; i++) {
        let index = result.card[i].result.indexOf(' ')
        let player = result.card[i].result.substring(0, index)
        let point = result.card[i].result.substring(index)
        gameCard.push(result.card[i].result)
        cardHtml += '<div class="cardline">' +
              '                    <div class="card-title card-add-width">' +
              '                        <div class="card-pretitle">' + player + '</div>' +
              '                        <div class="card-suftitle">' + point + '</div>' +
              '                    </div>'
        for (let j = 0; j < result.card[i].content.length; j++) {
          cardHtml += '<div class="card card-' + result.card[i].content[j].color + ' card-' + result.card[i].content[j].point + '">' +
                  '                        <div class="card-number"></div>' +
                  '                        <div class="card-shape"></div>' +
                  '                    </div>'
        }
        cardHtml += '</div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox">' +
          '                <div class="gametitle"><span>' + gameCard.join('，') + '</span></div>' + cardHtml +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装21点结果
    * @param result
    */
    assembleBJ: function (result) {
      let gameCard = []
      let cardHtml = ''
      for (let i = 0; i < result.card.length; i++) {
        let index = result.card[i].result.indexOf(' ')
        let player = result.card[i].result.substring(0, index)
        let point = result.card[i].result.substring(index)
        gameCard.push(result.card[i].result)
        cardHtml += '<div class="cardline cardlineBj' + (result.card[i].win === 1 ? 'winer' : '') + '">' +
              '                    <div class="card-title">' +
              '                        <div class="card-pretitle">' + player + '</div>' +
              '                        <div class="card-suftitle">' + point + '</div>' +
              '                    </div>'
        for (let j = 0; j < result.card[i].content.length; j++) {
          cardHtml += '<div class="card card-' + result.card[i].content[j].color + ' card-' + result.card[i].content[j].point + '">' +
                  '                        <div class="card-number"></div>' +
                  '                        <div class="card-shape"></div>' +
                  '                    </div>'
        }
        cardHtml += '</div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox gamecard-3">' +
          '                <div class="gametitle"><span>' + gameCard.join('，') + '</span></div>' + cardHtml +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装炸金花结果
    * @param result
    */
    assembleGoldenFlower: function (result) {
      let gameCard = []
      let cardHtml = ''
      for (let i = 0; i < result.card.length; i++) {
        let index = result.card[i].result.indexOf(' ')
        let player = result.card[i].result.substring(0, index)
        let point = result.card[i].result.substring(index)
        gameCard.push(result.card[i].result)
        cardHtml += '<div class="cardline">' +
              '                    <div class="card-title card-add-width">' +
              '                        <div class="card-pretitle">' + player + '</div>' +
              '                        <div class="card-suftitle">' + point + '</div>' +
              '                    </div>'
        for (let j = 0; j < result.card[i].content.length; j++) {
          cardHtml += '<div class="card card-' + result.card[i].content[j].color + ' card-' + result.card[i].content[j].point + '">' +
                  '                        <div class="card-number"></div>' +
                  '                        <div class="card-shape"></div>' +
                  '                    </div>'
        }
        cardHtml += '</div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox gamecard-3">' +
          '                <div class="gametitle"><span>' + gameCard.join('，') + '</span></div>' + cardHtml +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装斗牛结果
    * @param result
    */
    assembleBull: function (result) {
      let gameCard = []
      let winner = ''
      let cardHtml = ''
      for (let i = 0; i < result.card.length; i++) {
        let index = result.card[i].result.indexOf(' ')
        let player = result.card[i].result.substring(0, index)
        let point = result.card[i].result.substring(index)
        gameCard.push(result.card[i].result)
        if (Number(result.card[i].win) === 1) {
          winner = player
        }
        cardHtml += '<div class="cardline ' + (Number(result.card[i].win) === 1 ? 'winer' : '') + '">' +
              '                    <div class="card-title card-add-width">' +
              '                        <div class="card-pretitle">' + player + '</div>' +
              '                        <div class="card-suftitle">' + point + '</div>' +
              '                    </div>'
        for (let j = 0; j < result.card[i].content.length; j++) {
          cardHtml += '<div class="card card-' + result.card[i].content[j].color + ' card-' + result.card[i].content[j].point + '">' +
                  '                        <div class="card-number"></div>' +
                  '                        <div class="card-shape"></div>' +
                  '                    </div>'
        }
        cardHtml += '</div>'
      }
      return '<div class="gameboxout">' +
          '            <div class="gamebox gamecard-3">' +
          '                <div class="gametitle"><span>' + gameCard.join('，') + '</span></div>' + cardHtml +
          '            </div>' +
          '        </div>'
    },
    /**
    * 组装天生赢家
    * @param result
    */
    assembleBornToWin: function (result) {
      let gameResult = ''
      if (Number(result.xian.bornToWin) === 1) {
        gameResult = result.xian
      } else if (Number(result.zhuang.bornToWin) === 1) {
        gameResult = result.zhuang
      }
      return '<div class="gameboxout winer-outbox">' +
          '            <div class="winer-img"><img src="/resource/share/RESOURCE_VERSION/imgs/video/caishen.png" alt=""></div>' +
          '            <div class="closebtn" onclick="closeBornToWin()"><img src="/resource/share/RESOURCE_VERSION/imgs/video/guanbi.png" alt=""></div>' +
          '            <div class="gamebox game-bgl">' +
          '                <div class="gametitle"><span>' + gameResult.result + '</span></div>' +
          '                <div class="cardline-bgl">' +
          '                    <div class="cardline">' +
          '                        <div class="bglcard-part">' +
          '                            <div class="card card-' + gameResult.card[0].color + ' card-' + gameResult.card[0].point + '">' +
          '                                <div class="card-number"></div>' +
          '                                <div class="card-shape"></div>' +
          '                            </div>' +
          '                            <div class="card card-' + gameResult.card[1].color + ' card-' + gameResult.card[1].point + '">' +
          '                                <div class="card-number"></div>' +
          '                                <div class="card-shape"></div>' +
          '                            </div>' +
          '                        </div>' +
          '                    </div>' +
          '                </div>' +
          '            </div>' +
          '        </div>'
    },
    /**
     * 组装多彩百家乐
     * @param result
     */
    assembleDCBaccarat: function (result) {
      let winPlayer = '和'
      if (Number(result.xian.win) === 1) {
        winPlayer = '闲赢'
      } else if (Number(result.zhuang.win) === 1) {
        winPlayer = '庄赢'
      }
      let zhuangCard = ''
      let xianCard = ''
      for (let i = 0; i < result.xian.card.length; i++) {
        xianCard += '<div class="card ' + (i > 1 ? 'card-horizontal' : '') + ' card-' + result.xian.card[i].color + ' card-' + result.xian.card[i].point + '">' +
          '           <div class="card-number"></div>' +
          '        </div>'
      }
      for (let i = 0; i < result.zhuang.card.length; i++) {
        zhuangCard += '<div class="card ' + (i > 1 ? 'card-horizontal' : '') + ' card-' + result.zhuang.card[i].color + ' card-' + result.zhuang.card[i].point + '">' +
          '           <div class="card-number"></div>' +
          '        </div>'
      }
      return '<div class="gameboxout">' +
      '            <div class="gamebox game-bgl-fullcolor game-bgl">' +
      '                <div class="gametitle">' + winPlayer + '<span>（' + result.xian.result + ' , ' + result.zhuang.result + '）</span></div>' +
      '                <div class="cardline-bgl">' +
      '                    <div class="cardline ' + (Number(result.xian.win) === 1 ? 'winer' : '') + '">' +
      '                        <div>' +
      '                            <div class="card-title">' +
      '                                <div class="card-pretitle">闲</div>' +
      '                                <div class="card-suftitle">' + result.xian.result.split(' ')[1] + '</div>' +
      '                            </div>' +
      '                            <div class="wintxt"></div>' +
      '                        </div>' +
      '                        <div class="bglcard-part">' + xianCard +
      '                        </div>' +
      '                    </div>' +
      '                    <div class="cardline ' + (Number(result.zhuang.win) === 1 ? 'winer' : '') + '">' +
      '                        <div class="bgltitle-part">' +
      '                            <div class="card-title">' +
      '                                <div class="card-pretitle">庄</div>' +
      '                                <div class="card-suftitle">' + result.zhuang.result.split(' ')[1] + '</div>' +
      '                            </div>' +
      '                            <div class="wintxt"></div>' +
      '                        </div>' +
      '                        <div class="bglcard-part">' + zhuangCard +
      '                        </div>' +
      '                    </div>' +
      '                </div>' +
      '            </div>' +
      '        </div>'
    }
  }
}()))
