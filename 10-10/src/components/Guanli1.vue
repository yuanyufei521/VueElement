<template>
	<div id="add">
		<div class="head">
			<div id="" style="font-size:1.2rem;color: white;line-height: 4rem;margin-left: 1.5rem;">
				<i class="el-icon-arrow-left" @click="tiaozhuan"></i>
			</div>
			<div id="guanli">
				管理页面
			</div>
			<div class="xiala">
				<el-dropdown>
					<span class="el-dropdown-link" style="font-size: 1rem; color: white;">
						鬼大大
						<img src="../assets/i_4_673583510x2253722048_21.jpg" style="width: 2rem; height: 2rem; vertical-align: middle;border-radius:50% ;margin-top: -0.1rem;"/>
					</span>
					<el-dropdown-menu slot="dropdown">
					    <el-dropdown-item>详情</el-dropdown-item>
					    <el-dropdown-item>登录</el-dropdown-item>
					    <el-dropdown-item>设置</el-dropdown-item>
					     <el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<p style="width: 100%;height: 1rem; background: white;"></p>
		<div class="set">
			<!--左边的-->
			<div class="set-cehua">
				<el-row class="tac">
					<el-col :span="8">
						<el-menu default-active="2" @open="handleOpen" @close="handleClose">
							<el-menu-item index="1"><i class="el-icon-date"></i>用户订单</el-menu-item>
							<el-submenu index="2">
								<template slot="title"><i class="el-icon-message"></i>功能未开发</template>
								<el-menu-item-group>
									<template slot="title">分组一</template>
									<el-menu-item index="1-1">选项1</el-menu-item>
									<el-menu-item index="1-2">选项2</el-menu-item>
								</el-menu-item-group>
								<el-menu-item-group title="分组2">
									<el-menu-item index="1-3">选项3</el-menu-item>
								</el-menu-item-group>
								<el-submenu index="1-4">
									<template slot="title">选项4</template>
									<el-menu-item index="1-4-1">选项1</el-menu-item>
								</el-submenu>
							</el-submenu>
							<el-menu-item index="3"><i class="el-icon-setting"></i>功能未开发</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
			</div>

			<!--右边的-->
			<div class="set-shuju">
				<div id="">
					<el-table style="width: 100%" :data="myData">
						<el-table-column type="expand">
							<template scope="props">
								<el-form label-position="left" inline class="demo-table-expand" id="aaaaaaa">
									<div class="set-box">
										<div class="box-a">
											<el-form-item label="入住时间:">
												<span>{{ props.row.create_time}}</span>
											</el-form-item>
											<el-form-item label="退房时间:">
												<span>{{ props.row.finish_time }}</span>
											</el-form-item>

										</div>
										<div class="box-c">
											<el-form-item label="所选床铺:">
												<span>{{ props.row.bed_count }}</span>
											</el-form-item>

											<el-form-item label="需要退款的床位数:">
												<span>{{ props.row.finish_count }}</span>
											</el-form-item>
											<el-form-item label="订单号:">
												<span>{{ props.row.order_sn }}</span>
											</el-form-item>

										</div>
										<div class="box-b">
											<el-form-item label="押金:">
												<span>￥{{ props.row.deposit}}</span>

											</el-form-item>

											<el-form-item label="所退金额:">
												<span>￥{{ props.row.total }}</span>

											</el-form-item>

										</div>
									</div>
								</el-form>
							</template>
						</el-table-column>
						<!--订单号-->
						<el-table-column label="订单号" prop="order_sn"></el-table-column>
						<el-table-column label="金额" prop="total"></el-table-column>
						<el-table-column label="操作">
							<template scope="scope">
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">退&nbsp;房</el-button>
								<el-button size="small" @click="handleDelete(scope.$index, scope.row)">退押金</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	export default {
		data() {
			return {
				token: '',
				myData:[]
			}
		},
		created: function() {
			this.$axios.post("http://pay.usian.cn/Admin/Order/index.html", qs.stringify({
				token: localStorage.token
			})).then((res) => {
				//数据    success
				this.myData = res.data.info
				console.log(this.myData)
			}, (error) => {
				// error
				console.log(error)
			});
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleEdit(key, keyPath) {
//				console.log(keyPath.order_sn)
//				console.log(keyPath.total)
				this.$axios.post("http://pay.usian.cn/Admin/Order/finish.html", qs.stringify({
					token: localStorage.token,
					order_sn: keyPath.order_sn,
					amount: keyPath.total
				})).then((res) => {
				console.log(keyPath)
					var arr = res.data;
					console.log(arr);
					if(arr.error == 108) {
						alert("退款订单异常")
					} else if(arr.error == 500) {
						this.$router.push('/');
					}else if(arr.error ==104){
						alert("无待处理订单");
					}
					else if(arr.error == 0) {
						alert("退款成功");
//					退款成功之后重新渲染页面
						this.$axios.post("http://pay.usian.cn/Admin/Order/index.html", qs.stringify({
							token: localStorage.token
						})).then((res) => {
							this.myData = res.data.info
							console.log(this.myData)
						}, (error) => {
							// error
							console.log(error)
						});
					}
				}, (error) => {
					console.log(error)
				});

			},
			handleDelete(key, keyPath) {
				console.log(key, keyPath);
			},
			tiaozhuan() {
				this.$router.push("/")
			}
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
	body,
	html {
		width: 100%;
		height: 100%;
	}
	
	#add {
		width: 100%;
		height: 100%;
	}
	
	.el-menu {
		border-radius: 2px;
		list-style: none;
		position: relative;
		margin: 0;
		width: 13rem;
		padding-left: 0;
		background-color: #eef1f6;
	}
	
	.el-row {
		box-sizing: border-box;
	}
	
	.temp {
		width: 100%;
	}
	
	.head {
		width: 100%;
		height: 4rem;
		background: #20A0FF;
		display: flex;
		justify-content: space-between;
	}
	
	#guanli {
		font-size: 1.2em;
		margin-left: 2%;
		color: white;
		line-height: 4rem;
		margin-left: 4.5rem;
	}
	
	.xiala {
		width: 8rem;
		line-height: 4rem;
	}
	
	.set {
		display: flex;
	}
	
	.set .set-cehua {
		width: 20%;
	}
	
	.set .set-shuju {
		width: 80%;
	}
	
	.el-table th>.cell {
		word-wrap: normal;
		text-overflow: ellipsis;
		line-height: 30px;
		text-align: center;
		width: 100%;
		box-sizing: border-box;
	}
	
	.el-button--primary {
		margin-left: 75%;
		margin-top: 1rem;
		width: 120px;
	}
	
	.el-icon-arrow-down:before {
		content: "\E600";
		/*display: none;*/
	}
	
	.el-table tr {
		background-color: #fff;
		text-align: center;
	}
	
	.el-icon-arrow-left {
		cursor: pointer;
	}
	
	.set-box {
		text-align: left;
		display: flex;
		justify-content: space-around;
	}
</style>