import Api from '@/services/Api'

export default {
  addImage (params) {
    return Api().post('colors', params);
  },
  fetchColors () {
    return Api().get('colors');
  }
}