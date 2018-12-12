import Mock from "mockjs";

const Random = Mock.Random;

Mock.setup({
  timeout: 800, // 设置延迟响应，模拟向后端请求数据
});

// 今日比赛
const match = Mock.mock("http://sports.com/match", 'get', {
  "code": Random.integer(0, 5), //当小与1时模拟数据失败，大于=1则成功
  "data|3": [{
    'time': '@date("yyyy-MM-dd")',
    "matchs|1-5": [{
      'mid': '@id',
      'leftName': '@cword(2)',
      'leftGoal': '@natural(50, 100)',
      'leftLogo': Random.image("40x40", "#88a1f7", "png"),
      'quarter': Random.cword('一二三四', 1),
      'rightName': '@cword(2)',
      'rightGoal': '@natural(50, 100)',
      'rightLogo': Random.image("40x40", "#b7ddf2", "png")
    }]
  }]
});
//比赛详情
const matchInfo = Mock.mock("http://sports.com/match/matchinfo", "post", {
  "situation": {
    "item|5-10": [
      {
        'content': '@cword(10,20)',
        'leftTime': Random.time('mm:ss')
      }
    ]
  },
  "chatRoom": {
    "users|5-10": [{
      'avatar': Random.image("30x30", "#b7ddf2", "png"),
      'username': '@cword(2,4)',
      'time': Random.now(),
      'comment': '@cword(10,20)'
    }]
  },
  "data": {
    "home|10": [{
      'player': '@cword(2,4)',
      'score': '@natural(0, 80)',
      'playTime': '@natural(0, 48)',
      'rebound': '@natural(0, 30)',
      'Assists': '@natural(0, 30)'
    }],
    "guest|10": [{
      'player': '@cword(2,4)',
      'score': '@natural(0, 80)',
      'playTime': '@natural(0, 48)',
      'rebound': '@natural(0, 30)',
      'Assists': '@natural(0, 30)'
    }]
  }
});
//球队排名
const teamRank = Mock.mock("http://sports.com/rank", "get", {
  "rank": {
    "east|15": [{
      'team': '@cword(2)',
      'logo': Random.image("30x30", "#b7ddf2", "png"),
      'win': '@natural(10, 80)',
      'lose': '@natural(0, 20)',
      'diff': Random.increment(),
      'prob': '@natural(0, 100)'
    }],
    "west|15": [{
      'team': '@cword(2)',
      'logo': Random.image("30x30", "#b7ddf2", "png"),
      'win': '@natural(10, 80)',
      'lose': '@natural(0, 20)',
      'diff': Random.increment(),
      'prob': '@natural(0, 100)'
    }]
  }
});
//新闻热点
const news = Mock.mock("http://sports.com/news", "get", {
  "code": Random.integer(1, 5), //模拟是否还有数据，当code=1时没有数据，大于等于1时有数据
  "news|10": [{
    "newId": "@id",
    "title": "@cword(10,20)",
    "time": "@datetime()",
    "comments": "@natural(0, 1000)",
    "image": Random.image("30x30", "#05f2a5", "png")
  }]
});
//用户评论
const userComment = Mock.mock("http://sports.com/usercomment", "post", {
  "comments|10": [{
    "avatar": Random.image("30x30", "#05f2a5", "png"),
    "nick": "@cword(2,5)",
    "time": "@datetime()",
    "commentNum": "@natural(0, 100)",
    "likeNum": "@natural(0, 100)",
    "content": "@cword(20,50)"
  }]
});
//超级球星数据
const playerData = Mock.mock("http://sports.com/playerdata", "get", {
  "playerDataArr|8": [{
    "playerData|30": [{
      "avatar": Random.image("30x30", "#22a1f7", "png"),
      "name": "@cword(2,5)",
      "team": "@cword(2,3)",
      "points": "@natural(20, 30)"
    }]
  }]
});
//精彩集锦视频资料
const videoData = Mock.mock("http://sports.com/videodata", "get", {
  "videodata|10": [{
    "videoId": "@id",
    "title": "@cword(10,20)",
    "duration": "@time('mm:ss')",
    "subTime": "@datetime()",
    "videoImg": Random.image("60x40", "#22a1f7", "png")
  }]
})
//产品分类类别
const classifys = Mock.mock("http://sports.com/classify", "get", {
  "classifys|20": [{
    "classId": "@id",
    "className": "@cword(2)"
  }]
});
//产品展示
const products = Mock.mock("http://sports.com/products", "post", {
  "products|10": [{
    "proId": "@id",
    "proImg": Random.image("120x120", "#22a1f7", "png"),
    "title": "@cword(10,15)",
    "price": "@natural(20, 1000)",
    "sellNum": "@natural(0, 1000)"
  }]
});
//产品详情
const proDetails = Mock.mock("http://sports.com/productdetails", "post", {
  "swiper|3": [Random.image("400x400", "#f5a2a5", "#FFF", "product-detail")],
  "info": {
    "title|1": ["湖人紫金战袍传奇24号球衣", "火箭球迷专属球衣之传奇麦迪", "篮球之神乔丹签名球衣"],
    "price": ["388", "588", "988"],
    "types": ["2000版", "2010版", "2018版"],
    "color": ["红色", "黄色", "紫金"],
    "proId": "@id",
    "detail|3": [{
      "detailImg": Random.image('400x400', '#d5d2f5', '#000', 'detail 牛逼衣服')
    }]
  },
});
//用户登录接口
const login = Mock.mock("http://sports.com/login", "post", {
  "token": "@id"
});

export { match, matchInfo, teamRank, news, userComment, playerData, videoData, classifys, products, proDetails, login };