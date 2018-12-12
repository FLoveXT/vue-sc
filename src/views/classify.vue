<template>
  <div class="classify-wrap">
    <div
      class="classifyTitle"
      ref="classifyTitle"
    >
      <ul class="classifyList">
        <li
          v-for="(item,index) in classifys"
          :key="index"
          @click="classifyCon(item.classId,index)"
          ref="type"
        >{{item.className}}</li>
      </ul>
    </div>
    <mt-loadmore
        :top-method="loadTop"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
    <div
      class="classifyCon"
      ref="classifyCon"
    >
      
        <router-link
          :to="{name:'prodetail',query:{proId:item.proId}}"
          v-for="item in products"
          :key="item.proId"
        >
          <img v-lazy="item.proImg">
          <div class="info">
            <div class="title">
              <h3>{{item.title}}</h3>
            </div>
            <div class="sellInfo">
              <p class="price">￥{{item.price}}</p>
              <p class="sellNum">{{item.sellNum}}人已经付款</p>
            </div>
          </div>
        </router-link>
    </div>
      </mt-loadmore>
  </div>
</template>

<script>
  // 引入better-scroll
  import BScroll from "better-scroll";
export default {
  name: "classify",
  data() {
    return {
      classifys:["1"],
      proId:"",
      products:[],
      allLoaded: false
    };
  },
  created() {
    this.$axios.get("/classify").then(res=>{
      this.classifys = res.data.classifys
      this.proId = res.data.classifys[0].classId
    })
    this.reqProData(this.proId);
    
  },
  mounted() {
    this.$nextTick(()=>{
      if (!this.classScroll) {
          this.classScroll = new BScroll(this.$refs.classifyTitle, {
            click: true
          });
        }else{
          setTimeout(()=>{
            this.classScroll.refresh();
          },800)
        }
      this.$refs.type[0].classList.add("active")
		})
  },
  methods:{
    classifyCon(id,index){
      for(var i = 0,len = this.$refs.type.length; i<len; i++){
        this.$refs.type[i].classList.remove("active")
      }
      this.$refs.type[index].classList.add("active")
      this.products = []
      this.reqProData(id)
    },
    loadTop(){
      this.reqProData(this.proId);
      this.$refs.loadmore.onTopLoaded();
    },
    reqProData(proId){
        this.$axios.post("/products",{proId}).then(res=>{
        this.products = res.data.products.concat(this.products)
    })
    }
  }
};
</script>
<style lang="less" scoped>
.classify-wrap{
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  .classifyTitle{
    width: 25%;
      position: fixed;
      top: 40px;
      left: 0;
      bottom: 55px;
    .classifyList{
      li{
        height: 40px;
        line-height: 40px;
        background-color: #ccc;
        position: relative;
        &.active{
          background-color: #fff;
          &::before{
            -webkit-transform: translate3d(0,0,0);
			      transform: translate3d(0,0,0);
			      background: #fa2;
          }
        }
        &::before{
          content: "";
			    position: absolute;
			    left: 0;
			    top:0;
			    width: 2px;
			    height: 100%;
			    -webkit-transform: translate3d(0,-100%,0);
			    transform: translate3d(0,-100%,0);
			    -webkit-transition: all .3s;
		    	transition: all .3s;
        }
      }
    }
  }
  .classifyCon{
    margin-left: 26%;
      width: 74%;
      display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
        -webkit-overflow-scrolling:touch;
      a{
        width: 48%;
        height: 200px;
        border: 1px solid #ccc;
        height: 170px;
        margin: 5px 0;
        img{
          width: 100%;
          height: 120px;
        }
        .info{
          h3{
            height: 25px;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            text-align: left;
          }
          .sellInfo{
            display: flex;
            justify-content: space-between;
            height: 25px;
            font-size: 12px;
            line-height: 12px;
            white-space: nowrap;
            color: #999;
          }
        }
      }
    }
}
</style>
