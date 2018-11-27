import Api from '@/services/Api'

export default {
  fetchScheme (color_arr) {

    var colorString = "";
    for (var i =0; i<color_arr.length; i++){
      if(i!=color_arr.length-1){
        colorString += ('color'+(i+1)+"="+color_arr[i]+"&").replace("#","");
      }else {
        colorString += ('color'+(i+1)+"="+color_arr[i]).replace("#","");

      }

    }

    return Api().get('scheme?'+colorString);
  }
}