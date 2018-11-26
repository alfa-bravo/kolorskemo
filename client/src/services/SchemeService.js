import Api from '@/services/Api'

export default {
  fetchScheme () {
    return Api().get('scheme');
  }
}