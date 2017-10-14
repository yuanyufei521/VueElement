<template>
	<div id="yin">
		<div class="bgc_img">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<img src="https://modao.cc/uploads3/images/1286/12860310/raw_1505888732.png">
					</div>
				</el-col>
			</el-row>
			
			<el-form ref="form" :model="form" label-width="80px" >
				<h5 v-html="form.text" class="danger"></h5>
				<!-- 用户名 -->
				<el-form-item label="用户名">
					<el-input v-model="form.username" type="text" @change="txt"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item label="密码">
					<el-input v-model="form.pasword" type="password" @change="txt"> </el-input>
				</el-form-item>
				<!-- 登录按钮 -->
				<el-form-item>
					<!--创建按钮-->
					<el-button type="primary" @click="zhuce" @keydown.enter="zhuce">立即登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	export default {
		data() {
			return {
				form: {
					username: "admin004",
					pasword: "123456",
					text: ""
				},
				myData: [],
			}
		},

		methods: {
			//axios在发送数据时需要字符串的方式进行发送，也就是说是放在form-data当中的。在实际项目中，为了方便，我引入了 qs 来帮助处理这块数据：
			txt(){
				this.form.text=""
			},
		
			zhuce() {
				if(this.form.username==""){
					this.form.text="请输如用户名"
				}else if(this.form.pasword==""){
					this.form.text="请输密码"
				}else{
					
				this.$axios.post("http://pay.usian.cn/Admin/User/login.html", qs.stringify({
					username: this.form.username,
					password: this.form.pasword
				})).then((res) => {
					// success
					console.log(res)
					var myData = res.data;
					console.log(myData)
					if(myData.error == 0) {
						this.form.text="正在登录...";
						this.$router.push('/two');
						localStorage.token=myData.info.token;
					} else if(myData.error == 101) {
						this.form.text="用户名不能为空";
					} else if(myData.error == 102) {
						this.form.text="密码不能为空";
					} else if(myData.error == 103) {
							this.form.text="用户名不存在";
					} else if(myData.error == 104) {
						this.form.text="用户名与密码不匹配";
					}
				}, (error) => {
					// error
					console.log(error)
				});
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#yin {
		width: 100%;
		height: 100%;
		background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3502940132,3623543997&fm=27&gp=0.jpg') no-repeat;
		background-size: 100% 105%;
		overflow: overlay;
		position: relative;
	}
	
	#yin .bgc_img {
		width: 400px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.4);
		margin: 0 auto;
		position: absolute;
		right: 5%;
		top: 10%;
		padding: 3% 3.5% 4% 3.5%;
	}
	
	#yin .bgc_img .el-row {
		width: 100%;
	}
	
	#yin .bgc_img .el-row .el-col {
		width: 100%;
		text-align: center;
	}
	
	#yin .bgc_img .el-row .el-col img {
		width: 100%;
		height: 100%;
	}
	
	#yin .bgc_img .el-form {
		margin-top: 10%;
	}
	
	#yin .bgc_img .el-form .el-form-item:nth-of-type(3) {
		margin-top: 13%;
	}
	
	#yin .bgc_img .el-form .el-form-item:nth-of-type(3) button {
		margin: 0;
	}
	
	#yin .bgc_img .el-form .danger {
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		color: red;
		font-weight: 400;
		margin-left: 80px;
	}
</style>