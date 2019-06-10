import Vue from 'vue'
/**
 *
 * @param {*筹码的值} money
 */
export function chipClass (money) {
  let i = Number(money)
  switch (i) {
    case 10: return 'cm1'
    case 50: return 'cm2'
    case 100: return 'cm3'
    case 500: return 'cm4'
    case 1000: return 'cm5'
    case 5000: return 'cm6'
    case 10000: return 'cm7'
    case 50000: return 'cm8'
    case 100000: return 'cm9'
  }
}

// 筹码过滤器
Vue.filter('chipFilter', function (number) {
  switch (Number(number)) {
    case 10000: return '1万'
    case 20000: return '2万'
    case 30000: return '3万'
    case 40000: return '4万'
    case 50000: return '5万'
    case 60000: return '6万'
    case 70000: return '7万'
    case 80000: return '8万'
    case 90000: return '9万'
    case 100000: return '10万'
    default: return number
  }
})
