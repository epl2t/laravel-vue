
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

//window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));
//Vue.component('task-list', require('./components/TaskList.vue'));

//const app = new Vue({
//    el: '#app'
//});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'

window.axios=axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

let access_token = localStorage.getItem('access_token');

if (access_token!=undefined) {
  window.axios.defaults.headers.common['X-ACCESS-TOKEN'] = access_token;
}

Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth);
  if (authRequired && localStorage.getItem('access_token')===null) {
  next('/pages/login')
} else {
  next()
}
});

Vue.prototype.$eventHub = new Vue(); // Global event bus

var vm=new Vue({
  beforeCreate: function () {
/*    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401) {
          localStorage.removeItem('access_token');
          window.axios.defaults.headers.common['X-ACCESS-TOKEN'] = '';
          console.log(34);
          this.$router.push('/');
        }
        throw err.response;
      });
    });*/



  },
  created: function () {
    window.axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (401 === error.response.status) {
        localStorage.removeItem('access_token');
        window.axios.defaults.headers.common['X-ACCESS-TOKEN'] = '';
        router.push('/pages/login');
      }
      throw error;

    });

    axios.get("/api/user",{})
        .then((response)  =>  {
          window.userName=response.data.name;
          this.$eventHub.$emit('userLoaded');
        }, (error)  =>  {
          if (error.response.status==404)
          {
          }
          console.log('Error => ',error.response.status);
        });
  },
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})