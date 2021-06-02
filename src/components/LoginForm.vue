<template>
    <div class="container" id="container">
	<div class="form-container sign-up-container">
		<form autocomplete="off">
			<h1>Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'facebook-f']" :style="{ color: 'black' }" /></a>
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'google-plus-g']" :style="{ color: 'black' }" /></a>
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'linkedin-in']" :style="{ color: 'black' }" /></a>
			</div>
			<span>or use your email for registration</span>
			<input autocomplete="off" style="display:none;" />
			<input type="text" minlength="5" :class="[isFieldValid(this.inputRegister.name)]" name="name" v-model="inputRegister.name" placeholder="Name" />
			<input type="email" name="email" :class="[isEmailValid(this.inputRegister.email)]" v-model="inputRegister.email" placeholder="Email" />
			<input type="password" name="password" :class="[isPasswordValid(this.inputLogin.password)]" v-model="inputRegister.password" placeholder="Password" />
			<button type="button" v-on:click="register()">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'facebook-f']" :style="{ color: 'black' }" /></a>
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'google-plus-g']" :style="{ color: 'black' }" /></a>
				<a href="#" class="social"><font-awesome-icon :icon="['fab', 'linkedin-in']" :style="{ color: 'black' }" /></a>
			</div>
			<span>or use your account</span>
			<input type="email" name="email" :class="[isEmailValid(this.inputLogin.email)]" v-model="inputLogin.email" placeholder="Email" />
			<input type="password" name="password" :class="[isPasswordValid(this.inputLogin.password)]" v-model="inputLogin.password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button type="button" v-on:click="login()">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
	<Modal v-bind:showModal="showModal" :header="modal.header" :body="modal.body" v-on:close-modal="closeModal" />
</div>
</template>
<script>
import Modal from './Modal.vue'

export default {
    name: 'LoginForm',
	components: {
    Modal
	},
	data() {
		return {
			showModal: false,
			inputLogin: {
				password: "",
				email: "",
			},
			inputRegister: {
				name: "",
				password: "",
				email: "",
			},
			modal: {
				header: "",
				body: "",
			},
			people: "",
			reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
		}
	},
	
	mounted() {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});
	},
	methods: {
		login: function() {
			if(this.inputLogin.email != "" && this.inputLogin.password != "") {
				if(this.reg.test(this.inputLogin.email) && (this.inputLogin.password.length >= 8)){
					fetch("http://localhost:3000/people")
					.then(response=> {
						return response.json();
					}).then(data=> {
						if(this.findValue(data, this.inputLogin.email) && this.findValue(data,this.inputLogin.password)){
						this.$emit("authenticated", true);
						this.$router.replace({ name: "Dashboard" });
					} else {
						this.modal.header = "Error";
						this.modal.body = "No account with this email or the email and / or password is incorrect";
						this.showModal = true;
					}});
				} else {
					this.modal.header = "Error";
					this.modal.body = "Wrong email format and / or password is too short";
					this.showModal = true;
				}
			} else {
				this.modal.header = "Error";
				this.modal.body = "Email and password must be present";
				this.showModal = true;
			}
		},

		register: function(){
			if(this.inputRegister.email != "" && this.inputRegister.password != "" && this.inputRegister.name != "") {
				if(this.reg.test(this.inputRegister.email) && (this.inputRegister.password.length >= 8) && (this.inputRegister.name.length >=5)){

					const registerData = { 
						name: this.inputRegister.name,
						email: this.inputRegister.email,
						password: this.inputRegister.password
					};
					
					fetch("http://localhost:3000/people")
					.then(response=> {
						return response.json();
					}).then(data=> {
						if(!this.findValue(data, this.inputRegister.email)){
						this.postData("http://localhost:3000/people",registerData);
					} else {
						this.modal.header = "Error";
						this.modal.body = "An account with this email already exists";
						this.showModal = true;
					}});
					} else {
						this.modal.header = "Error";
						this.modal.body = "Wrong email format and / or password is too short and / or name is too short";
						this.showModal = true;
					}
				} else {
					this.modal.header = "Error";
					this.modal.body = "Name, email and password must be present";
					this.showModal = true;
			}
		},

		findValue: function(json, value) {
			let contains = false;
			Object.keys(json).some(key => {
				contains = typeof json[key] === 'object' ? this.findValue(json[key], value) : json[key] === value;
			return contains;
			});
			return contains;
		},

		postData: function(url,data){
			fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			})
			.then(response => response.json())
			.then(data => {
			console.log('Success:', data);
			this.modal.header = "Success, " + data.name;
			this.modal.body = "An account has been successfully created";
			this.showModal = true;
			})
			.catch((error) => {
			console.error('Error:', error);
			this.modal.header = "Error";
			this.modal.body = "Something is wrong: " + error;
			this.showModal = true;
			});
		},
		isEmailValid: function(email) {
			return (email == "")? "" : (this.reg.test(email)) ? 'has-success' : 'has-error';
		},
		isFieldValid: function(name) {
			return (name == "")? "" : (name.length >=5) ? 'has-success' : 'has-error';
		},
		isPasswordValid: function(password) {
			return (password == "")? "" : (password.length >=8) ? 'has-success' : 'has-error';
		},
		
		closeModal: function(value) {
			this.showModal = value;
		}
	},
}
</script>
<style scoped>
    @import '../assets/css/form.css';
</style>