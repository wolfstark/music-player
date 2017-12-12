const Koa = require("koa");
const Router = require("koa-router");
const axios = require("axios");

const router = new Router();
const app = new Koa();

router.get("/api/getDiscList", async function(ctx, next) {
  console.log(ctx.query);
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  const response = await axios.get(url, {
    headers: {
      referer: "https://c.y.qq.com/",
      host: "c.y.qq.com"
    },
    params: ctx.query
  });
  ctx.body = response.data;
});

// 开始服务并生成路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3600);

console.log("启动成功");
