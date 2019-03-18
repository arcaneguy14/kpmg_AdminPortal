const hostname = 'http://dev-api.gogogo.my/';

export const $httpaxios = function(uri, method, data){
    let url = hostname + uri;
    var header = formatHeader();
    return new Promise(function(resolve, reject){
        switch (method.toUpperCase()) {
            case 'POST':
                //using axios post method
                this.axios.post(url, data)
                    .then((response)=>{
                        resolve(response.data);
                })
                    .catch(error => {
                        reject(error);
                        this.errored = true
                });
                break;
            case 'GET':
                //using axios get method
                this.axios.get(url)
                    .then((response)=>{
                        resolve(response.data);
                })
                    .catch(error => {
                        reject(error);
                        this.errored = true
                });
                break;
            case 'DELETE':
                // using delete method
                this.axios.delete(url, data)
                    .then((response)=>{
                        resolve(response.data);
                })
                    .catch(error => {
                        reject(error);
                        this.errored = true
                });
                break;
            case 'PATCH':
                // using patch method
                this.axios.post(url, {data:data, _method : 'PATCH'})
                .then((response)=>{
                    resolve(response.data);
            })
                .catch(error => {
                    reject(error);
                    this.errored = true
            });
                break;
            default:
                break;
        }
    });
  };

  function formatHeader(){
      let header = {
          'User-Agent' : navigator.userAgent,
          'Accept' : 'application/json',
          'Accept-Encoding' : 'gzip',
          'X-Server-TimeStamp' : getDate(),
          'Authorization' : 'Bearer '
      }
      return header;
  }

  function getDate(){
    var curdate = new Date();
    return curdate.getFullYear() + (curdate.getMonth()+1).padStart(2, '0') + (curdate.getDate()).padStart(2, '0') + (curdate.getHours()).padStart(2, '0') + (curdate.getMinutes()).padStart(2, '0') + (curdate.getSeconds()).padStart(2, '0');
  }

  export default {
      name : $httpaxios
  }