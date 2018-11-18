import Api from '@/services/Api'

export default {
  fetchModel () {
    return Api().get('model')
  }
}