var app= new Vue({
	el:'#app',
	data:{ 
		addview:false,
		editview:false,
		deleteview:false,
		errorMessage:"",
		successMessage:"",
		users:[],
		newuser:{
			username:"",
			email:"",
			mobile:""
		},
		clickedUser:{
			username:"",
			email:"",
			mobile:""
		}

	},
	mounted:function(){
		console.log("Hello world");
		this.Display();
	},
	methods:{
		Display: function(){
			axios.get("http://localhost/Vuejsiwithphp/connect.php?action=read").then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				if(response.data.error){
					app.errorMessage=response.data.message;
				}
				else{
					app.users=response.data.users;
				}
			});
		},
		saveUser: function(){
			console.log(app.newuser)
			var formData=app.toFormData(app.newuser)
			axios.post("http://localhost/Vuejsiwithphp/connect.php?action=create",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				app.newuser={username:"",email:"",mobile:""}
				if(response.data.error){
					app.errorMessage=response.data.message;
				}
				else{
					app.Display();
				}
			});

		},
		selectUser: function(user){
			app.clickedUser=user
		},
		updateUser: function(){
			console.log(app.newuser)
			var formData=app.toFormData(app.clickedUser)
			axios.get("http://localhost/Vuejsiwithphp/connect.php?action=update",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				app.clickedUser={}
				if(response.data.error){
					app.errorMessage=response.data.message;
				}
				else{
					app.successMessage=response.data.message;
					app.Display();
				}
			});

		},
		deleteUser: function(){
			var formData=app.toFormData(app.clickedUser)
			axios.get("http://localhost/Vuejsiwithphp/connect.php?action=delete",formData).then(function(response){
				//console.log("dtdtedrtertertetert");
				console.log(response);
				app.clickedUser={};
				if(response.data.error){
					app.errorMessage=response.data.message;
				}
				else{
					app.successMessage=response.data.message;
					app.Display();
				}
			});

		},
		toFormData:function(obj){
			var form_data=new FormData();
				for(var key in obj){
					form_data.append(key,obj[key]);
				}
				return form_data;
		},
		clearMessage:function(){
			app.errorMessage="",
			app.successMessage="";
		}
	}
	});	