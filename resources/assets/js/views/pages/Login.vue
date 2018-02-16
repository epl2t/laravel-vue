<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <form>
                <b-input-group class="mb-3">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                  <input v-model="login" type="text" class="form-control" placeholder="Username" v-bind:class="{'is-invalid': login_invalid }" @keyup.enter="authorize()">
                </b-input-group>
                <b-input-group class="mb-4">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                  <input v-model="password" type="password" class="form-control" placeholder="Password" v-bind:class="{'is-invalid': password_invalid }" @keyup.enter="authorize()">
                </b-input-group>
                <b-row class="justify-content-center">
                  <b-col>
                    <b-button variant="primary" class="px-5" @click="authorize">Login</b-button>
                  </b-col>
                </b-row>
                </form>
              </b-card-body>
            </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      login_invalid: false,
      password_invalid: false
    }
  },
  name: 'Login',
  methods: {
    authorize() {
      this.login_invalid=this.login=='';
      this.password_invalid=this.password=='';
      if (this.login_invalid || this.password_invalid)
      {
        return;
      }
      axios.post("/api/authorize",{login:this.login,password:this.password})
          .then((response)  =>  {
            localStorage.setItem('access_token', response.data.token);
            window.axios.defaults.headers.common['X-ACCESS-TOKEN'] = response.data.token;

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

            this.$router.push('/');
          }, (error)  =>  {
            if (error.response.status==404)
            {
              this.password='';
              this.login_invalid=true;
              this.password_invalid=true;
            }
            console.log('Error => ',error.response.status);
          })
    }
  }
}
</script>
