import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const wsutil = new Vuex.Store({
    state : {
        jwtToken : localStorage.getItem("jwtToken") || null,
        rfhToken : localStorage.getItem("rfhToken") || null,
        apiBaseUrl : "https://dev-api.gogogo.my",
        curAct : "",
        temp: "",
        userProfile : {}
    },
    getters : {
        getJwt : state =>{
            return state.jwtToken;
        }
    },
    mutations : {
        storeToken(state, token){
            //store new jwt and refresh token
            localStorage.setItem("jwtToken", token.jwt);            
            localStorage.setItem("rfhToken", token.rfh);
            state.jwtToken = token.jwt;
            state.rfhToken = token.rfh;
        },
        clearToken(state){
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("rfhToken");
            state.jwtToken = null;
            state.rfhToken = null;
        },
        storeProfile(state){
            
        }
    },
    actions : {
        refreshJWT({ dispatch, commit, state }) {
            //Call refresh token api to get new token
            let rfhRq = {"data" : [{"rfh" : state.rfhToken}]};
            return new Promise((resolve, reject) => {
                axios.post(context.apiBaseUrl + '/api/v2/refreshToken', JSON.stringify(rfhRq))
                .then(response => {
                    if (response.data.respcode == '0'){
                        //Store new token and call again the api
                        commit('storeToken', response.data.result[0]);
                    }
                    else{
                        dispatch("userLogout");
                    }
                    resolve(response.data);
                })
                .catch(function(error){
                    reject(error);
                });
            });
        },
        userLogout(context){
            this.$router.replace({ name: "Login" });
            context.commit('clearToken');
        },
        userLogin(context){
            let rq = {"data": [{"user": "awangtruckcoffee@gmail.com","password": "123456", "fb_token": "", "google_token": ""}]};
            return new Promise((resolve, reject) => {
                axios.post(context.state.apiBaseUrl + '/api/v2/makeUserLogin', JSON.stringify(rq))
                .then(response => {
                    if (response.data.respcode == '0'){
                        //Store new token and call again the api
                        context.commit('storeToken', response.data.result[0]);
                    }
                    else{
                        context.commit('clearToken');
                    }
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
            });
        },
        test(context){
            return new Promise((resolve, reject) => {
                axios.get("http://52.220.58.241:21001/api/v2/getBrandsAll", '{}').then(response => resolve(response.data));
            });
            
        },
        getUser(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.jwtToken
            return new Promise((resolve, reject) => {
                axios.get(context.state.apiBaseUrl + '/api/v2/getUsers?limit=10')
                .then(response => {
                    resolve(response.data);
                })
                .catch(function(error){
                    reject(error);
                });
            });
        }
    }
});

//Store current action
wsutil.subscribeAction((action, state) => {
    if (action.type != 'refreshJWT'){
        state.curAct = action.type;
    }
    state.temp = action.type;
});

// Add jwt token if token in state in available 
axios.interceptors.request.use((setting) => {
    if (wsutil.state.jwtToken != null){
        setting.headers['Authorization'] = 'Bearer ' + wsutil.state.jwtToken;    
    }
    return setting;
});

//Check response and refresh token if needs
axios.interceptors.response.use((response) => {
    if (response.status == '200'){
        if (response.data.respcode == '13'){
            //Refresh JWT Token

            return new Promise((resolve, reject) => {
                wsutil.dispatch('refreshJWT')
                .then (rsp => {
                    if (rsp.respcode == '0'){
                        wsutil.dispatch(wsutil.state.curAct)
                        .then (nRsp =>{
                            resolve(nRsp);
                        });
                    }
                    else{
                        resolve(rsp);
                    }
                });
            });
        }
        else{
            return response;
        }
    }
    else{
        return response;
    }
    
});
