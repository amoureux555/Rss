<template>
  <div class="other-item">
    <div class="inner">
      <h2>csdn</h2>
      <hr />
      <ul class="hot-list-article">
        <li v-for="(item, i) in CsdnData.items" :key="i" @click="JumpFn(item)">
          {{ item.title }}
        </li>
      </ul>
      <h2>博客园</h2>
      <hr />
      <ul class="hot-list-article">
        <li
          v-for="(item, i) in CnBlogsData.items"
          :key="i"
          @click="JumpFn(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import RSSParser from "rss-parser";

export default {
  data() {
    return {
      CsdnData: {},
      CnBlogsData: {},
    };
  },
  created() {
    this.searchCSDN();
    this.searchCnBlogs();
  },
  methods: {
    // 点击跳转事件
    JumpFn(item) {
      console.log("🚀 ~ JumpFn ~ item:", item);
      // 打开一个新的页面
      window.open(item.link, "_blank");
    },
    // 获取csdn rss订阅
    searchCSDN() {
      this.searchList = [];
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        // 引入并new一个新的parser
        const parser = new RSSParser();
        // 判断是否返回
        if (xhr.readyState === 4) {
          // 判断返回的状态
          if (xhr.status === 200) {
            const data = xhr.responseText;
            parser.parseString(data).then((res) => {
              this.CsdnData = res;
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "获取最新文章失败",
            });
          }
        }
      };
      xhr.open("get", process.env.VUE_APP_BASE_CDSNAPI);
      xhr.send(null);
    },
    // 获取博客园rss订阅
    searchCnBlogs() {
      this.searchList = [];
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        // 引入并new一个新的parser
        const parser = new RSSParser();
        // 判断是否返回
        if (xhr.readyState === 4) {
          // 判断返回的状态
          if (xhr.status === 200) {
            const data = xhr.responseText;
            parser.parseString(data).then((res) => {
              console.log("🚀 ~ parser.parseString ~ res:", res);
              this.CnBlogsData = res;
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "获取最新文章失败",
            });
          }
        }
      };
      xhr.open("get", process.env.VUE_APP_BASE_CNBLOGSAPI);
      xhr.send(null);
    },
  },
};
</script>
<style lang="scss" scoped>
.other-item {
  height: 100%;
  overflow-y: scroll;
  h2{
    text-align: left;
  }
}
ul {
  li {
    text-align: left;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #2ea7e0;
    }
  }
}

.other-item-title {
  margin: 10px 20px;
  padding: 5px;
  line-height: 30px;
  font-weight: 400;
  border-bottom: 1px solid #e8e9e7;
  color: #383937;
  position: relative;
  font-size: 18px;
}

.other-item .inner {
  margin: 0 20px;
  padding-bottom: 10px;
}

.inner .hot-list-article li {
  display: block;
  line-height: 32px;
  position: relative;
  margin: 3px 0;
  counter-increment: nums;
  padding-left: 30px;
  overflow: hidden;
  word-wrap: normal !important;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-list-article li a {
  color: #787977;
}

.hot-list-article li:before {
  color: #000;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  content: counter(nums, decimal);
  position: absolute;
  left: 0;
  top: 5px;
  border-radius: 100%;
  background-color: #edefee;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  font-family: SourceCodeProRegular, Menlo, Monaco, Consolas, "Courier New",
    monospace, "Helvetica Neue", Arial, sans-serif;
}

/*以上就是一个稍微好看的有编号的li列表 */
/*加上以下之后，排名前三的数据编号就添加了编号颜色，更好看*/
.hot-list-article li:first-child:before,
.hot-list-article li:nth-child(2):before,
.hot-list-article li:nth-child(3):before {
  color: #fff;
  text-shadow: none;
}

.hot-list-article li:first-child:before {
  background-color: #e24d46;
}

/*第1行的行号样式*/
.hot-list-article li:nth-child(2):before {
  background-color: #2ea7e0;
}

/*第2行的行号样式*/
.hot-list-article li:nth-child(3):before {
  background-color: #6bc30d;
}

/*第3行的行号样式*/
.hot-list-article li a:hover {
  text-decoration: underline;
  color: #6bc30d;
}
</style>