import * as types from './type'

export const state = {
  cpAnnouncementList: [],  // 彩票公告列表
  videoAnnouncementList: [], // 视讯公告
  sportAnnouncementList: [], // 体育公告
  electronAnnouncementList: [], // 电子公告
  hotHistory: [], // 历史消息
  hotNews: [], // 最新消息
  msg: [] // 个人消息
}

export const mutations = {
  /** 游戏公告信息 */
  [types.GAMEMESSAGE_DETAIL] (state, res) {
    let _announcementMap = {
      cpAnnouncementList: ['cpAnnouncementVersionData', 'cpAnnouncementVersionKey'],
      videoAnnouncementList: ['videoAnnouncementVersionData', 'videoAnnouncementVersionKey'],
      sportAnnouncementList: ['sportAnnouncementVersionData', 'sportAnnouncementVersionKey'],
      electronAnnouncementList: ['electronAnnouncementVersionData', 'electronAnnouncementVersionKey']
    }
    // 遍历版本号信息，如果存在版本号控制，则通过版本号逻辑获取数据
    window._each(res.list, function (value, key) {
      if (!_announcementMap[key]) return false

      localStorage.setItem(_announcementMap[key][0], JSON.stringify(res.list))
      state = window.indexMain.commonVersion(state, res, _announcementMap[key][1])
      res.data.gameMessageList = state[key]
    })
  }
}
