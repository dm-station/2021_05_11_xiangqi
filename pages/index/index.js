// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello',
    maps: [],
    nowWho: 0,//0红 1黑
    onMove:false,//是否可以移动
    moveList:[],
    eatList:[],
    mapping: {
      1: ['兵', 'br'],
      2: ['炮', 'pr'],
      3: ['车', 'jr'],
      4: ['马', 'mr'],
      5: ['相', 'xr'],
      6: ['士', 'sr'],
      7: ['将', 'j'],
      '-1': ['卒', 'bb'],
      '-2': ['炮', 'pb'],
      '-3': ['车', 'jb'],
      '-4': ['马', 'mb'],
      '-5': ['象', 'xb'],
      '-6': ['士', 'sb'],
      '-7': ['帅', 's'],
    }
  },

  onLoad() {
    this.init()
  },

  init() {
    this.createMaps()
    this.putDef()
  },

  /**
   * @method: 创建二维数组
   */
  createMaps(){
    let map = []
    for (var j = 0; j < 10; j++) {
      map[j] = [];
      for (var i = 0; i < 9; i++) {
        map[j][i] = 0;
      }
    }
    this.setData({
      maps: map
    })

    console.log('初始化数据完毕',this.data.maps)
  },

  /**
   * @method: 放置棋子
   * @description: 0空
   * @description: 兵1 炮2 车3 马4 相5 士6 将7 红
   * @description: 卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
   */
  putDef() {
    let map = this.data.maps
    map[0][0] = -3; map[9][0] = 3;
    map[0][1] = -4; map[9][1] = 4;
    map[0][2] = -5; map[9][2] = 5;
    map[0][3] = -6; map[9][3] = 6;
    map[0][4] = -7; map[9][4] = 7;
    map[0][5] = -6; map[9][5] = 6;
    map[0][6] = -5; map[9][6] = 5;
    map[0][7] = -4; map[9][7] = 4;
    map[0][8] = -3; map[9][8] = 3;

    map[2][1] = -2; map[7][1] = 2;
    map[2][7] = -2; map[7][7] = 2;
    map[3][0] = -1; map[6][0] = 1;
    map[3][2] = -1; map[6][2] = 1;
    map[3][4] = -1; map[6][4] = 1;
    map[3][6] = -1; map[6][6] = 1;
    map[3][8] = -1; map[6][8] = 1;

    this.setData({
      maps: map
    })
    console.log("完成放置默认棋子", this.data.maps);
  },

  /**
   * @method: 点击事件
   */
  tapQiZi(e) {
    let j = e.target.dataset.j
    let i = e.target.dataset.i
    let CC = this.WhatSpace(j, i);
    console.log(("选择了" + j + "-" + i + "  " + CC))
    this.onChoseC(j, i, CC)
  },

  /**
   * @description: 获取type类型
   * @param {*} y y轴索引
   * @param {*} x x轴索引
   * @return {*}
   */
   WhatSpace(y, x) {
    return this.data.maps[y][x]
  },

  /**
   * @method: 函数名
   * @param {*} j y
   * @param {*} i x
   * @param {*} t type
   */
  onChoseC(j, i, t) {
    let nowWho = this.data.nowWho
    if (nowWho == 0) {
      if (t < 0) {
        // console.log('请选择红方')
        return
      };
    }
    if (nowWho == 1) {
      if (t > 0) {
        // console.log('请选择黑方')
        return
      };
    }

    this.cleanSt()
  },

  cleanSt(){
    
  }


})
