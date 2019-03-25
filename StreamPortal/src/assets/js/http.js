import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);

export default {
    install(Vue, options) {
        console.log('Installing the CommentsOverlay plugin!');
        Vue.prototype.$callhttp = (method, uri, data) => callAxios(method, uri, data);
    }

};

const hostname = 'http://52.220.58.241:21001';

const callAxios = function(method, uri, data){  
    let url = hostname + uri;
    axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MgVG9rZW4iLCJhdWQiOiJkMzk0MGZlMjIxMjRlNjRjODAxMTg2Yjg2MTI3YzdjYiIsInByaXZpbGVnZXMiOiIxLDUsNiIsImlzcyI6IlByb3ZlbiBFcXVpdHkgU2RuLiBCaGQuIiwiZXhwIjoxNTUyOTAzNTgzLCJ1c2VyaWQiOiIxNTIwIiwiaWF0IjoxNTUyODk5OTgzLCJ1c2VybmFtZSI6ImNodW55b25nQGdvZ29nby5teSJ9.StYpNGzOIY9wVwiF2I0rFywrugM47nFbhdlpxGsSVNSCdi8_2xDcq8I36xk7aum-j93kTKpqjwsndic4jU2zMpIT_hKSAingUS2Bix_5Y5n0nptKRZlw7Il0CtF6knyhT6hX9wGr_XDBjiQv5-ivpadrjXF-ZIfz5Xf15Kr2YKQd_Ejba91xIPffpGDUvl4exLcrGuAFPow3rf69v0nSj-e3EQ6Fx-s9XaX1Hxn9OT7av-bd5EH3ck1e99OChYViaGmjACH7U-6S7HIllYfuRLSZxiH_npVc7xls9us9iY5gdr9Twh7S79PupMu-nVkrthAseGjkhmaJb2g083E7Ig';
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
                axios.get(url)
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
