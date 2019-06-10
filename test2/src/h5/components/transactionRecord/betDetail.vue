<template>
    <div style="height: 100%;" v-if='showDetail'>

    <div class="details-main main-box">

    <!--游戏结果-百家乐天生赢家-->
    <div class="alert-gamebox-bg" v-if="showWinner">
        <div class="alert-gamebox">
            <div class="gameboxout winer-outbox">
                <div class="winer-img"><img src="@/assets/img/betDetaildisplay/caishen_h5.png" alt=""></div>
                <div class="closebtn" @click="showWinner = false"><img src="@/assets/img/betDetaildisplay/guanbi.png" alt=""></div>
                <div class="gamebox-border">
                    <div class="gamebox game-bgl">
                        <div class="gametitle"><span>{{ winnerResult.result }}</span></div>
                        <div class="cardline-bgl">
                            <div class="cardline">
                                <div class="bglcard-part">
                                    <div class="card" :class="['card-'+winnerResult.card[0].color, 'card-'+winnerResult.card[0].point]">
                                        <div class="card-number"></div>
                                        <div class="card-shape"></div>
                                    </div>
                                    <div class="card" :class="['card-'+winnerResult.card[1].color, 'card-'+winnerResult.card[1].point]">
                                        <div class="card-number"></div>
                                        <div class="card-shape"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="result-display gameboxout">
        <!--游戏结果-斗牛-->
        <div class="gamebox" v-if="gameid === '109'">
            <div class="cardline" v-for="(item, index) in betResult.card" :key="index">
                <div class="card-title card-add-width">
                    <div class="card-pretitle">{{ item.result.substring(0, item.result.indexOf(" ")) }}</div>
                    <div class="card-suftitle">{{ item.result.substring(item.result.indexOf(" ")) }}</div>
                </div>
                <div class="card" v-for="(card, cardIndex) in item.content" :key="cardIndex" :class="['card-'+card.color, 'card-'+card.point]">
                    <div class="card-number"></div>
                    <div class="card-shape"></div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt">
                        <em v-for="(item, index) in betResult.card" :key="index">{{item.result}}<em v-if="index<betResult.card.length-1">，</em></em>
                    </p>
                </div>
            </div>
        </div>

        <!--游戏结果-炸金花-->
        <div class="gamebox gamecard-3" v-if="gameid === '108'">
            <div class="cardline" v-for="(item, index) in betResult.card" :key="index">
                <div class="card-title card-add-width">
                    <div class="card-pretitle">{{ item.result.substring(0, item.result.indexOf(" ")) }}</div>
                    <div class="card-suftitle">{{ item.result.substring(item.result.indexOf(" ")) }}</div>
                </div>
                <div class="card" v-for="(card, cardIndex) in item.content" :key="cardIndex" :class="['card-'+card.color, 'card-'+card.point]">
                    <div class="card-number"></div>
                    <div class="card-shape"></div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt">
                        <em v-for="(item, index) in betResult.card" :key="index">{{item.result}}<em v-if="index<betResult.card.length-1">，</em></em>
                    </p>
                </div>
            </div>
        </div>

        <!-- 游戏结果-BJ(21点）-->
        <div class="gamebox gamecard-3" v-if="gameid === '107'">
            <div class="cardline cardlineBj" v-for="(item, index) in betResult.card" :key="index">
                <div class="card-title">
                    <div class="card-pretitle">{{ item.result.substring(0, item.result.indexOf(" ")) }}</div>
                    <div class="card-suftitle">{{ item.result.substring(item.result.indexOf(" ")) }}</div>
                </div>
                <div class="card" v-for="(card, cardIndex) in item.content" :key="cardIndex" :class="['card-'+card.color, 'card-'+card.point]">
                    <div class="card-number"></div>
                    <div class="card-shape"></div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt">
                        <em v-for="(item, index) in betResult.card" :key="index">{{item.result}}<em v-if="index<betResult.card.length-1">，</em></em>
                    </p>
                </div>
            </div>
        </div>

        <!--游戏结果-牛牛-->
        <div class="gamebox" v-if="gameid === '106'">
            <div class="cardline" v-for="(item, index) in betResult.card" :key="index">
                <div class="card-title card-add-width"> <!-- 注意card-add-width 此样式名单独写了一个固定的宽度，宽度为80PX -->
                    <div class="card-pretitle">{{ item.result.substring(0, item.result.indexOf(" ")) }}</div>
                    <div class="card-suftitle">{{ item.result.substring(item.result.indexOf(" ")) }}</div>
                </div>
                <div class="card" v-for="(card, cardIndex) in item.content" :key="cardIndex" :class="['card-'+card.color, 'card-'+card.point]">
                    <div class="card-number"></div>
                    <div class="card-shape"></div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt">
                        <em v-for="(item, index) in betResult.card" :key="index">{{item.result}}<em v-if="index<betResult.card.length-1">，</em></em>
                    </p>
                </div>
            </div>
        </div>

        <!--游戏结果-番摊-->
        <div class="gamebox game-ballgass" v-if="gameid === '105' && betResult.result">
            <div class="cardline">
                <div class="card-title">
                    <div class="card-pretitle">{{ betResult.result.split(',')[1] }}</div>
                    <div class="card-suftitle">{{ betResult.result.split(',')[0] }}</div>
                </div>
                <div class="ballgase-ball" v-for="(item, index) in Number(betResult.fantan)" :key="index"><img src="@/assets/img/betDetaildisplay/fantan.png"></div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt"><span>{{ betResult.result }}</span></p>
                </div>
            </div>
        </div>
        
        <!--游戏结果-多彩百家乐-->
        <div class="gamebox game-bgl-fullcolor game-bgl" v-if="gameid === '201' && betResult.xian">
            <div class="cardline-bgl">
                <div class="cardline" :class="Number(betResult.xian.win) === 1 ? 'winer' : ''">
                    <div>
                        <div class="card-title">
                            <div class="card-pretitle">闲</div>
                            <div class="card-suftitle">{{ betResult.xian.result.split(" ")[1] }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" v-for="(card, index) in betResult.xian.card" :key="index" :class="['card-'+card.color, 'card-'+card.point, index>1?'card-horizontal':'']">
                            <div class="card-number"></div>
                        </div>
                    </div>
                </div>
                <div class="cardline" :class="Number(betResult.zhuang.win) === 1 ? 'winer' : ''">
                    <div class="bgltitle-part">
                        <div class="card-title">
                            <div class="card-pretitle">庄</div>
                            <div class="card-suftitle">{{ betResult.zhuang.result.split(" ")[1] }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" v-for="(card, index) in betResult.zhuang.card" :key="index" :class="['card-'+card.color, 'card-'+card.point, index>1?'card-horizontal':'']">
                            <div class="card-number"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt"><span>{{Number(betResult.zhuang.win) === 1 ? '庄赢' : Number(betResult.xian.win) === 1 ? '闲赢' : '和'}}</span>（{{betResult.xian.result}}，{{betResult.zhuang.result}}）</p>
                </div>
            </div>
        </div>

        <!--游戏结果-龙虎-->
        <div class="gamebox game-bgl-dragontiger game-bgl" v-if="gameid === '102' && betResult.dragon">
            <div class="cardline-bgl">
                <div class="cardline" :class="Number(betResult.dragon.win) === 1 ? 'winer' : ''">
                    <div>
                        <div class="card-title">
                            <div class="card-pretitle">龙</div>
                            <div class="card-suftitle">{{ betResult.dragon.point }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" :class="['card-'+betResult.dragon.card[0].color, 'card-'+betResult.dragon.point]">
                            <div class="card-number"></div>
                            <div class="card-shape"></div>
                        </div>
                    </div>
                </div>
                <div class="cardline" :class="Number(betResult.tiger.win) === 1 ? 'winer' : ''">
                    <div class="bgltitle-part">
                        <div class="card-title">
                            <div class="card-pretitle">虎</div>
                            <div class="card-suftitle">{{ betResult.tiger.point }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" :class="['card-'+betResult.tiger.card[0].color, 'card-'+betResult.tiger.point]">
                            <div class="card-number"></div>
                            <div class="card-shape"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt"><span>{{Number(betResult.dragon.win) === 1 ? '龙赢' : Number(betResult.tiger.win) === 1 ? '虎赢' : '和'}}</span>（{{betResult.dragon.result}}，{{betResult.tiger.result}}）</p>
                </div>
            </div>
        </div>

        <!--游戏结果-骰宝-->
        <div class="gamebox game-ballgass game-ballgass-suibao" v-if="gameid === '103' && betResult.cussec">
            <div class="cardline">
                <div class="card-title card-add-width" v-if="betResult.cussec[0] !== betResult.cussec[1] || betResult.cussec[1] !== betResult.cussec[2] || betResult.cussec[0] !== betResult.cussec[2]">
                    <div class="card-pretitle">{{ betResult.result.split(',')[0] }}/{{ betResult.result.split(',')[1] }}</div>
                    <div class="card-suftitle">{{ betResult.result.split(',')[2] }}</div>
                </div>
                <div class="ballgase-ball"><img :src="'/resource/share/RESOURCE_VERSION/imgs/video/touzi'+betResult.cussec[0]+'.png'"></div>
                <div class="ballgase-ball"><img :src="'/resource/share/RESOURCE_VERSION/imgs/video/touzi'+betResult.cussec[1]+'.png'"></div>
                <div class="ballgase-ball"><img :src="'/resource/share/RESOURCE_VERSION/imgs/video/touzi'+betResult.cussec[2]+'.png'"></div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt"><span>{{ betResult.result }}</span></p>
                </div>
            </div>
        </div>

        <!--游戏结果-轮盘-->
        <div class="gamebox game-ballgass game-ballgass-turn" v-if="gameid === '104' && betResult.roulette">
            <div class="cardline">
                <div class="card-title" v-if="Number(betResult.roulette) !== 0">
                    <div class="card-pretitle">{{ betResult.result.split(',')[1] }}/{{ betResult.result.split(',')[2] }}</div>
                    <div class="card-suftitle">{{ betResult.result.split(',')[0] }}</div>
                </div>
                <div class="ballgase-ball">
                    <div class="ball-number">{{ betResult.roulette }}</div>
                    <img :src="'/resource/share/RESOURCE_VERSION/imgs/video/'+ getLunPanColor(betResult.roulette) +'.png'">
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt"><span>{{ betResult.result }}</span></p>
                </div>
            </div>
        </div>

        <!--游戏结果-百家乐-->
        <div class="gamebox game-bgl" v-if="gameid === '101' && betResult.zhuang">
            <div class="cardline-bgl">
                <div class="cardline" :class="Number(betResult.xian.win) === 1 ? 'winer' : ''">
                    <div>
                        <div class="card-title">
                            <div class="card-pretitle">闲</div>
                            <div class="card-suftitle">{{ betResult.xian.point }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" v-for="(card, index) in betResult.xian.card" :key="index" :class="['card-'+card.color, 'card-'+card.point, index>1?'card-horizontal':'']">
                            <div class="card-number"></div>
                            <div class="card-shape"></div>
                        </div>
                    </div>
                </div>
                <div class="cardline" :class="Number(betResult.zhuang.win) === 1 ? 'winer' : ''">
                    <div class="bgltitle-part">
                        <div class="card-title">
                            <div class="card-pretitle">庄</div>
                            <div class="card-suftitle">{{ betResult.zhuang.point }}</div>
                        </div>
                        <div class="wintxt"></div>
                    </div>
                    <div class="bglcard-part">
                        <div class="card" v-for="(card, index) in betResult.zhuang.card" :key="index" :class="['card-'+card.color, 'card-'+card.point, index>1?'card-horizontal':'']">
                            <div class="card-number"></div>
                            <div class="card-shape"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--game-result-->
            <div class="game-result-out">
                <div class="game-result game-result-bj">
                    <h5>游戏结果</h5>
                    <p class="con-txt">
                        <span>{{Number(betResult.zhuang.win) === 1 ? '庄赢' : Number(betResult.xian.win) === 1 ? '闲赢' : '和'}}</span>
                        （{{betResult.xian.result}}，{{betResult.zhuang.result}}）
                    </p>
                </div>
            </div>
        </div>
        <!--erro-->
        <div class="erro" v-if="!gameid">
            游戏结果同步中，请稍后重试！
        </div>
    </div>
            <!-- 投注详情表单 -->
            <div class="betting-detail">
                <div class="none-bj"></div>
                <div class="yo-form-item" style="height:auto; padding-top:10px; padding-bottom:10px;">
                    <h5 class="title">下注内容</h5>
                    <p class="con-txt secure-cen text-right" style="word-break: break-all;">{{betedDetailInfo.betContent}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">下注时间</h5>
                    <p class="con-txt">{{betedDetailInfo.betDateTime}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">局号</h5>
                    <p class="con-txt">{{betedDetailInfo.gameCode}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">单号</h5>
                    <p class="con-txt">{{betedDetailInfo.betCode}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">游戏类型</h5>
                    <p class="con-txt">{{betedDetailInfo.gameType}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">下注金额</h5>
                    <p class="con-txt">{{betedDetailInfo.betAmount}}</p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">盈亏</h5>
                    <p class="con-txt">{{betedDetailInfo.payOut}}</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
let resolveResult = window.resolveResult
let statusCode = window.common.statusConst
console.log(resolveResult, 'resolveResult')
export default {
  props: ['showDetail'],
  data () {
    return {
      betedDetailInfo: {},
      showWinner: false,
      winnerResult: '',
      gameid: '',
      betResult: ''
    }
  },
  methods: {
    initData () {
      this.$store.state.h5Home.headerType = 6
      this.$store.state.h5Home.headTitle = '投注详情'
      this.$store.state.h5Home.headLeft = 'icon-back'
      try {
        this.betedDetailInfo = JSON.parse(localStorage.getItem('betedDetailInfo'))
        this.gameid = this.betedDetailInfo.gameid
      } catch (e) {
        console.log(e, 'e')
      }
      this.getBetResult()
    },
    goBack () {
      this.$router.go(-1)
    },
    handleResult (result) {
      if (!result) {
        this.gameid = ''
      } else {
        this.betResult = result
      }
    },
    getBetResult () {
      let postData = { 'platformCode': this.betedDetailInfo.apiName, 'gameId': this.betedDetailInfo.gameid, 'gameCode': this.betedDetailInfo.gameCode }
      this.$store.dispatch('shareApi.getGameResult.action', postData).then(_res => {
        if (_res.status === statusCode.SUCCESS && _res.data && _res.data.cardInfo) {
          let result = resolveResult.resolveH5Result(_res.data.gameId, _res.data.cardInfo)
          console.log(result, 'result')
          this.handleResult(result)
        } else { // 显示没有游戏结果
          this.gameid = ''
        }
      })
    },
    /**
     * 获取轮盘颜色（0：绿色；1-10、19-28，奇数为红色，偶数为黑色；11-18、29-36，奇数为黑色，偶数为红色）
     */
    getLunPanColor (num) {
      num = Number(num)
      if (num === 0) {
        return 'lunpanlv'
      } else if (num < 11 || (num < 29 && num > 18)) {
        if (num % 2 === 0) {
          return 'lunpanhei'
        } else {
          return 'lunpanhong'
        }
      } else if ((num > 10 && num < 19) || num > 28) {
        if (num % 2 === 0) {
          return 'lunpanhong'
        } else {
          return 'lunpanhei'
        }
      }
    }
  }
}
</script>

