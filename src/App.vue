<template>
  <div id="app">
    <trade-view ref="trade"></trade-view>
  </div>
</template>

<script>
import TradeView from './components/TradeView'
export default {
    name: 'App',
    components: {
        TradeView,
    },
    mounted() {
        this.$refs.trade.init('BTCUSDT',5);
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
