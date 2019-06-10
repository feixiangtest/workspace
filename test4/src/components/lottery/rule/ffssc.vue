<template>
    <div v-if="parentToChild.type==='ssc'">
        <div id="yfssc" v-if="parentToChild.lotteryCode===parentToChild.oldCode" ng-controller="Ruleog1" class="">
            <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
                <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
                &nbsp; {{parentToChild.lotteryName}}时时彩
            </div>
            <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
                <div class="rule-text">

                    <p class="ng-binding">「{{parentToChild.lotteryName}}时时彩」是东方集团自主研发的彩票游戏，以东方集团彩票游戏开奖中心派彩为依据。
                    </p>
                    <strong>开奖结果为五码 (万、仟、佰、拾、个)。假设结果为1 、2 、3 、4、5。</strong> <br>
                    <strong data-v-04ab35ae="">{{parentToChild.lotteryName}}时时彩开奖时间：</strong>
                  <table class="tabrule">
                    <tbody>
                    <tr>
                      <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖时间</th>
                      <th width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">每日期数</th>
                      <th width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖频率</th></tr>
                    <tr>
                      <td bgcolor="#FFF7F0" class="point" align="center">00:00-23:59(北京时间)</td>
                      <td bgcolor="#FFF7F0" class="point" align="center">0001-{{parentToChild.period}}</td>
                      <td bgcolor="#FFF7F0" class="point" align="center">每{{parentToChild.lotteryName}}钟</td></tr>
                    </tbody>
                  </table>
                  <br><strong>本公司「{{parentToChild.lotteryName}}时时彩」具体游戏规则如下：</strong>
                  <div class="orange">
                    <strong>选号玩法</strong>
                  </div>
                    <dl>
                        <dt>◎一字定位</dt>
                        <dd>
                            <ul>
                                <li>于万仟佰拾个任选一位，自0~9任选1个号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎二字定位</dt>
                        <dd>
                            <ul>
                                <li>于万仟佰拾个任选二位，自0~9任选2个号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎三字定位</dt>
                        <dd>
                            <ul>
                                <li>于前三、中三、后三任选三位，自0~9任选3个号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎一字组合</dt>
                        <dd>
                            <ul>
                                <li>
                                    全五：0~9任选1个号进行投注，当开奖结果[万位、仟位、佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。
                                    <br> 注：当选号码 无论出现几次，派彩只派一次。※例如：买一号，开奖结果为1,1,1,1,1.派彩只派一次。
                                </li>
                                <li>前三：0~9任选1个号进行投注，当开奖结果[万位、仟位、佰位]任一数与所选的号码相同时，即为中奖。</li>
                                <li>中三：0~9任选1个号进行投注，当开奖结果[仟位、佰位、拾位]任一数与所选的号码相同时，即为中奖。</li>
                                <li>后三：0~9任选1个号进行投注，当开奖结果[佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎二字组合</dt>
                        <dd>
                            <ul>
                                <li>于前三、中三、后三0~9任选2个号进行投注，当开奖结果任二数与所选的号码相同时，即为中奖。
                                    <br> ※举例：投注者购买后三二字组合，选择2个相同号码如为11，当期开奖结果如为xx11x、xx1x1、xxx11、皆视为中奖。（x=0~9任一数）
                                    <br> ※举例：投注者购买后三二字组合，选择2个不同号码如为12，当期开奖结果如为xx12x、xx1x2、xx21x、xx2x1、xxx12、xxx21皆视为中奖。（x=0~9任一数）
                                </li>
                                <li>【附注】：以上二例赔率不同</li>
                            </ul>
                        </dd>

                        <dt>◎三字组合</dt>
                        <dd>
                            <ul>
                                <li>
                                    从0-9十个数字中任选三个不同的数字对指定位置进行投注，若所选择的号码与当期开奖号码所指定之位置相同（顺序不限），即为中奖，若是开出豹子如000、111、222、333、444、555、666、777、888、999算不中奖。
                                </li>
                            </ul>
                        </dd>

                        <dt>◎组选三</dt>
                        <dd>
                            <ul>
                                <li>
                                    前三：会员可以挑选5~10个号码，当开奖结果[万位、仟位、佰位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[万位、仟位、佰位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。
                                    <br> ※例如：112、344，若是开出豹子则不算中奖。
                                    <br> ※备注："豹子"为三字同号，例如：111、222
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>
                                    中三：会员可以挑选5~10个号码，当开奖结果[仟位、佰位、拾位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[仟位、佰位、拾位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。
                                    <br> ※例如：112、344，若是开出豹子则不算中奖。
                                    <br> ※备注："豹子"为三字同号，例如：111、222
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>
                                    后三：会员可以挑选5~10个号码，当开奖结果[佰位、拾位、个位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[佰位、拾位、个位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>※例如：112、344，若是开出豹子则不算中奖。</li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>※备注："豹子"为三字同号，例如：111、222</li>
                            </ul>
                        </dd>

                        <dt>◎组选六</dt>
                        <dd>
                            <ul>
                                <li>
                                    前三：会员可以挑选4~8个号码，当开奖结果[万位、仟位、佰位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。
                                    <br> ※例如：如果是选择(1、2、3、4)，则开奖结果[万位、仟位、佰位]为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>
                                    中三：会员可以挑选4~8个号码，当开奖结果[仟位、佰位、拾位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。
                                    <br> ※例如：如果是选择(1、2、3、4)，则开奖结果[仟位、佰位、拾位]为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>
                                    后三：会员可以挑选4~8个号码，当开奖结果[佰位、拾位、个位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。
                                </li>
                            </ul>
                        </dd>

                        <dt>◎跨度</dt>
                        <dd>
                            <ul>
                                <li>前三：以开奖结果[万位、仟位、佰位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。
                                    <br> ※举例：开奖结果为3、4、8、7、6。中奖的跨度为5。（最大号码8减最小号码3=5）。
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>中三：以开奖结果[仟位、佰位、拾位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。
                                    <br> ※举例：开奖结果为3、4、8、7、6。中奖的跨度为4。（最大号码8减最小号码4=4）。
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <ul>
                                <li>后三：以开奖结果[佰位、拾位、个位]的最大差距（跨度），作为中奖依据。会员可以选择0~9的任一跨度。
                                    <br> ※举例：开奖结果为3、4、8、7、6。中奖的跨度为2。（最大号码8减最小号码6=2）。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                  <div class="orange">
                    <strong>和数玩法</strong>
                  </div>
                    <dl>
                        <dt>◎前三和数</dt>
                        <dd>
                            <ul>
                                <li>开奖结果前三三位数的总和值与若投注前三数字的总和值与相同时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎中三和数</dt>
                        <dd>
                            <ul>
                                <li>开奖结果中三三位数的总和值与若投注中三数字的总和值与相同时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎后三和数</dt>
                        <dd>
                            <ul>
                                <li>开奖结果后三三位数的总和值与若投注后三数字的总和值与相同时，即为中奖。</li>
                            </ul>
                        </dd>

                        <dt>◎前三和数尾数</dt>
                        <dd>
                            <ul>
                                <li>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。
                                    <br> ※举例：开奖结果为3、4、5、0、0。前三总和为12，尾数为2。
                                </li>
                            </ul>
                        </dd>

                        <dt>◎中三和数尾数</dt>
                        <dd>
                            <ul>
                                <li>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。
                                    <br> ※举例：开奖结果为0、3、4、5、0。中三总和为12，尾数为2。
                                </li>
                            </ul>
                        </dd>

                        <dt>◎后三和数尾数</dt>
                        <dd>
                            <ul>
                                <li>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。
                                    <br> ※举例：开奖结果为0、0、3、4、5。后三总和为12，尾数为2。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                  <div class="orange">
                    <strong>两面玩法</strong>
                  </div>
                    <dl>
                        <dt>◎单双玩法说明</dt>
                        <dd>
                            <ul>
                                <li>
                                    <p>
                                        开奖结果万位、仟位、佰位、拾位或个位数字为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注位数单双与开奖结果的位数单双相符时，即为中奖。 ※举例：投注者购买佰位单，当期开奖结果如为20130（1为单），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    单
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    双
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="padding:0 7px;border-right:1px solid #ccc">
                                                    1、 3、 5、 7、 9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、 2、 4、 6、 8
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>
                                    <p>
                                        开奖结果万仟位、万佰位、万拾位、万个位、仟佰位、仟拾位、仟个位、佰拾位、拾个位或佰个位数字总和的个位数为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注和数单双与开奖结果的和数单双相符时，即为中奖。
                                        <br> ※举例：投注者购买佰拾和数单，当期开奖结果如为20290（佰2+拾9=11为单），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    单
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    双
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="border-right:1px solid #ccc">
                                                    1、3、5、7、9、11、13、15、17
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、2、4、6、8、10、12、14、16、18
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>
                                    <p>
                                        开奖结果前三、中三或后三数字总和的为1、3、5、7、9、11、13、15、17、19、21、21、23、25、27时为“单”，若为0、2、4、6、8、10、12、14、16、18、20、22、24、26时为“双”，当投注和数单双与开奖结果的和数单双相符时，即为中奖。
                                        <br> ※举例：投注者购买"(后三)和数单"，当期开奖结果如为20290（佰2+拾9+个0=11为单），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    单
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    双
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="border-right:1px solid #ccc">
                                                    1、3、5、7、9、11、13、15、
                                                    <br> 17、19、21、23、25、27
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、2、4、6、8、10、12、14、
                                                    <br> 16、18、20、22、24、26
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </dd>

                        <dt>◎大小玩法说明</dt>
                        <dd>
                            <ul>
                                <li>
                                    开奖结果万位、仟位、佰位、拾位或个位数字为5、6、7、8、9时为“大”，若为0、1、2、3、4时为“小”，当投注位数大小与开奖结果的位数大小相符时，即为中奖。
                                    <br> ※举例：投注者购买佰位小，当期开奖结果如为20352（3为小），则视为中奖。
                                </li>
                                <li>
                                    <p>
                                        开奖结果万仟位、万佰位、万拾位、万个位、仟佰位、仟拾位、仟个位、佰拾位、拾个位或佰个位数字总和的尾数为5、6、7、8、9时为“大”，若为0、1、2、3、4时为“小”，当投注和数大小与开奖结果的和数大小相符时，即为中奖。 ※举例：投注者购买和数佰拾位小，当期开奖结果如为20491（佰4+拾9=13，尾数3为小），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    大
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    小
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="border-right:1px solid #ccc">
                                                    5、6、7、8、9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、4
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>
                                    <p>
                                        开奖结果前三、中三或后三数字总和的为14、15、16、17、18、19、20、21、22、23、24、25、26、27时为“大”， 若为0、1、2、3、4、5、6、7、8、9、10、11、12、13时为“小”，当投注和数单双与开奖结果的和数大小相符时，即为中奖。
                                        <br> ※举例：投注者购买"(后三)和数大"，当期开奖结果如为20976（佰9+拾7+个6=22为大），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    大
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    小
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="border-right:1px solid #ccc">
                                                    14、15、16、17、18、19、20、21、
                                                    <br> 22、23、24、25、26、27
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、4、5、6、
                                                    <br> 7、8、9、10、11、12、13
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </dd>

                        <dt>◎质合玩法说明</dt>
                        <dd>
                            <ul>
                                <li>
                                    开奖结果万位、仟位、佰位、拾位或个位数字为1、2、3、5、7时为“质数”，若为0、4、6、8、9时为“合数”，当投注位数质合与开奖结果的位数质合相符时，即为中奖。
                                    <br> ※举例：投注者购买个位质，当期开奖结果如为20957（7为质），则视为中奖。
                                </li>
                                <li>
                                    开奖结果万仟位、万佰位、万拾位、万个位、仟佰位、仟拾位、仟个位、佰拾位、拾个位或佰个位数字总和的尾数为1、2、3、5、7时为“质数”，若为0、4、6、8、9时为“合数”，当投注号码与开奖结果的质合相符时，即为中奖。 ※举例：投注者购买佰拾位合，当期开奖结果如为20957（佰9+拾5=14，尾数4为合数），则视为中奖。
                                </li>
                                <li>
                                    <p>
                                        开奖结果前三、中三或后三数字总和的尾数为1、2、3、5、7时为“质数”，若为0、4、6、8、9时为“合数”，当投注号码与开奖结果的质合相符时，即为中奖。 ※举例：投注者购买后三质，当期开奖结果如为20957（佰9+拾5+个7=21，尾数1为质数），则视为中奖。
                                    </p>

                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="50%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    质
                                                </th>
                                                <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    合
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center" style="border-right:1px solid #ccc">
                                                    1、 2、 3、 5、 7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、 4、 6、 8、 9
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </dd>

                        <dt>◎总和玩法说明</dt>
                        <dd>
                            <ul>
                                <li>是指取五个开奖的五个数字相加为开奖基准！</li>
                                <li>总和大小：数字总和值23-45为总大，数字总和值0-22为总小。</li>
                                <li>
                                    <p>总合单双：数字总和值是双数为总双，数字总和值是单数为总单。</p>
                                </li>
                            </ul>
                        </dd>

                    </dl>
                  <div class="orange">
                    <strong>棋牌玩法</strong>
                  </div>
                    <dl>
                        <dt>◎百家乐玩法说明</dt>
                        <dd>
                            <ul>
                                <li>
                                    <p>百家乐游戏规则：百家乐是以开奖号码为基础，进行庄、闲对比的一种玩法！</p>
                                </li>
                                <li>
                                    <p>庄是指以开奖五个号码为基础，选择前两个数（万、千视为庄的前两张牌）。</p>
                                </li>
                                <li>
                                    <p>闲是指以开奖五个号码为基础，选择后两个数（十、个视为闲的前两张牌）。</p>
                                </li>
                                <li>
                                    <p>
                                        如第一轮未分出胜负需要再按牌例发第二轮牌，第三张牌闲先发，最多每方3张牌，谁最接近9点即为胜方，而相同点数即和局。 </p>
                                </li>
                                <li>
                                    <p>如若投注庄/闲， 开奖结果为和局，那么不计输赢，并且退还本金，且不计水费,例如：00100。</p>
                                </li>
                                <li>有一个天生赢家或者两个都大等于6(庄闲都不补)</li>
                                <li>个位与百位和数的个位数，此张牌为第5张牌。万位与百位和数的个位数，此张牌为第6张牌</li>
                                <li>如果闲家补牌，那么第5张牌给闲家，如果闲家不补牌，庄家补牌，那么第5张牌给庄家</li>
                                <li>闲家头两张牌点数总和
                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    0-1-2-3-4-5
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    补一张牌 （即获得第五张牌）
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    6或7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    不需补牌
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    8或9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    不需补牌
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>庄家
                                    <table class="tabrule">
                                        <tbody>
                                            <tr>
                                                <th width="20%" valign="top" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    头两张牌点数总和
                                                </th>
                                                <th width="40%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    庄家补牌如果闲家第三张牌是......
                                                </th>
                                                <th width="40%" bgcolor="#AFAFE4" align="center" class="subtitle2">
                                                    庄家不补牌，如果闲家第三张牌是......
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    0-1-2
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、4、5、6、7、8、9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    3
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、4、5、6、7、9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    8
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    4
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    2、3、4、5、6、7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、8、9
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    5
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    4、5、6、7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、8、9
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    6
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    6或7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    0、1、2、3、4、5、8、9
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    7
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    不须补牌
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    不须补牌
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" bgcolor="#FFF7F0" class="point" align="center">
                                                    8或9
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                    天生赢家，不须补牌
                                                </td>
                                                <td bgcolor="#FFF7F0" class="point" align="center">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li>大小/单双/质合，以庄闲的点数来进行判断结果。 0~4为小，5~9为大; 1、3、5、7、9为单，0、2、4、6、8为双; 1、2、3、5、7为质数，0、4、6、8、9为合数。
                                </li>
                                <li>庄对/闲对 是指两家首发(第一轮)的两张牌为对子,不含第三张。如：开奖55842，投庄对则中奖，投闲对不中奖</li>
                            </ul>
                        </dd>

                        <dt>◎德州扑克玩法说明</dt>
                        <dd>
                            <ul>
                                <li>德州扑克是以开奖五个号码为基准，按德州扑克牌面组合进行投注的一种玩法！组合大小的押注点举例如下：</li>
                                <li>豹子：开出的五个号码都相同，如22222、33333。</li>
                                <li>四张：即五个开奖号码中有四个为一样，如00001、77797。</li>
                                <li>葫芦：即五个开奖号码中三个相同（三条）及两个号码相同（一对），如77997、45544。</li>
                                <li>顺子：是指开出的五个号码是一串顺序的数字。09213、65743。</li>
                                <li>三张：开出的五个号码中三个相同，且余下的两个号码完全不同，如：87477、65455，</li>
                                <li>两对：是指开奖五个号码，能组成两个对子，如：97789、01022。</li>
                                <li>一对：是指开出的五个号码，能够组成一个对子，如：65877、01322。</li>
                                <li>杂牌：是指开出的五个号码全部都不一样，不能够组成任意对子或顺子，(不包含五离) 如：06587、98763。</li>
                                <li>五离：是指开出的五个号码不能够组成对子，并且没有任何相邻的两个数。如：28064，19573</li>
                                <li>以上投注某个点后，如果开奖的号码结果组合正好与其吻合，按赔率赢得金额，如果开奖号码组合结果不能与投注点吻合，则输！</li>
                            </ul>
                        </dd>

                        <dt>◎牛牛玩法说明</dt>
                        <dd>
                            <ul>
                                <li>
                                    牛牛游戏规则：牛牛是开奖结果的五个号码为基准，在开奖的五个数字中若有任意三个数字相加之和为0或10的倍数，其余下另两个数字之和的个位数作为对奖基准。
                                </li>
                                <li>如开奖结果为00017即8点（牛8）,02818即9点（牛9），99219、88400则是10点（即牛牛）；</li>
                                <li>如开奖结果的五个号码为01234、12859将视为无点（任三个数组合都无法组成0或10的倍数）；</li>
                                <li>再如开奖结果的五个号码相同时如：11111、22222、33333（豹子）皆视为无点，但00000则视为牛牛</li>
                                <li>当前投注牛3，开奖结果为01912（牛3）时视为中奖，投注其他游戏项皆视为不中奖！</li>
                                <li>承以上规则</li>
                                <li>当投注于A项“小”，开奖结果为牛1、牛2、牛3、牛4、牛5时，皆视为中奖，如开出无点 那么不计输赢，并且退还本金，且不计水费， 其他情况均视为不中奖！
                                </li>
                                <li>当投注于A项“大”，开奖结果为牛6、牛7、牛8、牛9、牛10时，皆视为中奖，如开出无点 那么不计输赢，并且退还本金，且不计水费， 其他情况均视为不中奖！
                                </li>
                                <li>当投注于B项“单”，开奖结果为牛1、牛3、牛5、牛7、牛9时，皆视为中奖，如开出无点 那么不计输赢，并且退还本金，且不计水费， 其他情况均视为不中奖！
                                </li>
                                <li>当投注于B项“双”，开奖结果为牛2、牛4、牛6、牛8、牛10时，皆视为中奖，如开出无点 那么不计输赢，并且退还本金，且不计水费， 其他情况均视为不中奖！
                                </li>
                            </ul>
                        </dd>

                        <dt>◎三公玩法说明</dt>
                        <dd>
                            <ul>
                                <li>三公游戏规则：三公以开奖结果五个数字为基准，将左闲点数与右闲点数进行比对的一种玩法！</li>
                                <li>左闲点数：取开奖五个数字的前三位（万、千、百）之和的个位数。</li>
                                <li>右闲点数：取开奖五个数字的后三位（百、十、个）之和的个位数。</li>
                                <li>如左闲点数为1，右闲点数为7，则投注右闲视为中奖！</li>
                                <li>比对的点数中0点为10点视为最大，9点为次大，1点为最小！</li>
                                <li>若开奖结果左闲点数与右闲点数相同时，则押左闲或右闲均不计输赢，并且退还本金，且不计水费；</li>
                                <li>若投注和局，开奖结果为左闲大或右闲大时，视为不中奖！</li>
                                <li>左闲点数/右闲点数的尾数：大小 0~4为小，5~9为大；单双 1、3、5、7、9为单，0、2、4、6、8为双；质合 1、2、3、5、7为质数，0、4、6、8、9为合数。
                                </li>
                            </ul>
                        </dd>

                        <dt>◎龙虎斗玩法说明</dt>
                        <dd>
                            <ul>
                                <li>龙虎游戏规则：龙虎斗是以开奖结果的五个数字作为基准，取任意位置（万、千、百、拾、个）的数字进行组合大小比对的一种玩法；</li>
                                <li>当投注龙/虎时，开奖结果为和局，那么押注龙/虎视为不中奖，且计算有效投注金额；</li>
                                <li>当投注"和"时，开奖结果为龙/虎，投注“和”视为不中奖；</li>
                                <li>举例：开奖结果为：2,1,3,5,2 万为龙、千为龙虎时：结果 龙(2）大于虎（1），即为开龙；如万为龙，个为虎时，结果一样大，即为开和局！
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      now: this.sigle === 0 ? this.parentToChild.lotteryCode : ''
    }
  },
  props: ['parentToChild', 'sigle'],
  methods: {
    toggleGroup (t) {
      if (this.now === t) {
        this.now = ''
      } else {
        this.now = t
      }
    }
  }
}
</script>

