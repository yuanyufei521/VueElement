<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
	*{
		margin: 0;
		padding: 0;
	}
	body,
	html {
		width: 100%;
		height: 100%;
	}
	#app{
		width: 100%;
		height: 100%;
	}
</style>
