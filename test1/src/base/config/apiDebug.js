import * as _ from 'lodash'
let baseInfo = {
  1: {
    'status': '1',
    'msg': '交互成功',
    'version': null
  },
  2: {
    'status': '0',
    'msg': '交互失败',
    'version': null
  }
}
let register = {
  'data': {
    'validCode': false,
    'validInfo': false,
    'listMoney': [
      {
        'currencyId': 1,
        'currencyName': '人民币',
        'currencyCode': 'RMB'
      }
    ],
    'memberSetList': {
      'birthday': {
        'addMemberSetId': 7996,
        'fieldName': '生日',
        'ifShow': 0,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 6
      },
      'qq': {
        'addMemberSetId': 8001,
        'fieldName': 'QQ号',
        'ifShow': 0,
        'ifRequired': 0,
        'fieldType': 11
      },
      'country': {
        'addMemberSetId': 7997,
        'fieldName': '国家',
        'ifShow': 0,
        'ifRequired': 0,
        'fieldType': 7
      },
      'idPassportNoType': {
        'addMemberSetId': 7998,
        'fieldName': '身份证护照号',
        'ifShow': 0,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 8
      },
      'confirmEmail': {
        'addMemberSetId': 8003,
        'fieldName': '是否需验证信确认开通',
        'ifShow': 0,
        'ifRequired': 0,
        'ifValidate': 1,
        'fieldType': 13
      },
      'realName': {
        'addMemberSetId': 7993,
        'fieldName': '真实姓名',
        'ifShow': 0,
        'ifRequired': 0,
        'ifValidate': 1,
        'fieldType': 3
      },
      'parentName': {
        'addMemberSetId': 7991,
        'fieldName': '介绍人',
        'ifShow': 0,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 1
      },
      'zhuceYm': {
        'addMemberSetId': 7992,
        'fieldName': '验证码',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 2
      },
      'englishname': {
        'addMemberSetId': 7995,
        'fieldName': '英文姓名',
        'ifShow': 0,
        'ifRequired': 1,
        'fieldType': 5
      },
      'drawMoneyPwd1': {
        'addMemberSetId': 8000,
        'fieldName': '取款密码',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 10
      },
      'phone': {
        'addMemberSetId': 7999,
        'fieldName': '手机号',
        'ifShow': 0,
        'ifRequired': 0,
        'ifValidate': 1,
        'fieldType': 9
      },
      'nickname': {
        'addMemberSetId': 7994,
        'fieldName': '昵称',
        'ifShow': 0,
        'ifRequired': 1,
        'fieldType': 4
      },
      'email': {
        'addMemberSetId': 8002,
        'fieldName': '邮箱',
        'ifShow': 0,
        'ifRequired': 0,
        'ifValidate': 1,
        'fieldType': 12
      }
    }
  }
}
register = _.assignIn(register, baseInfo[1])
let confirmEmail = _.assignIn({
}, baseInfo[2])

let Checkaccount = {
  'data': {
    'validCode': false,
    'validInfo': false,
    'listMoney': [
      {
        'currencyId': 1,
        'currencyName': '人民币1',
        'currencyCode': 'RMB'
      }
    ],
    'memberSetList': {
      'birthday': {
        'addMemberSetId': 7996,
        'fieldName': '生日',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 6
      },
      'qq': {
        'addMemberSetId': 8001,
        'fieldName': 'QQ号',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 11
      },
      'country': {
        'addMemberSetId': 7997,
        'fieldName': '国家',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 7
      },
      'idPassportNoType': {
        'addMemberSetId': 7998,
        'fieldName': '身份证护照号',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 8
      },
      'confirmEmail': {
        'addMemberSetId': 8003,
        'fieldName': '是否需验证信确认开通',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 13
      },
      'realName': {
        'addMemberSetId': 7993,
        'fieldName': '真实姓名',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 3
      },
      'parentName': {
        'addMemberSetId': 7991,
        'fieldName': '介绍人',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 1
      },
      'zhuceYm': {
        'addMemberSetId': 7992,
        'fieldName': '验证码',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 2
      },
      'englishName': {
        'addMemberSetId': 7995,
        'fieldName': '英文姓名',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 5
      },
      'drawMoneyPwd': {
        'addMemberSetId': 8000,
        'fieldName': '取款密码',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 10
      },
      'phone': {
        'addMemberSetId': 7999,
        'fieldName': '手机号',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 9
      },
      'nickname': {
        'addMemberSetId': 7994,
        'fieldName': '昵称',
        'ifShow': 1,
        'ifRequired': 1,
        'fieldType': 4
      },
      'email': {
        'addMemberSetId': 8002,
        'fieldName': '邮箱',
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1,
        'fieldType': 12
      }
    }
  }
}
Checkaccount = _.assignIn(Checkaccount, baseInfo[1])
export default {
  'api/wapLogin/register': register,
  'api/wapLogin/confirmEmail': confirmEmail,
  'api/wapsPerfect/Checkaccount': Checkaccount
}
