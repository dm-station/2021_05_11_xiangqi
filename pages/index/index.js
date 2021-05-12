// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello',
    maps: [],
    nowWho: 0,//0红 1黑
    onMove: false,//是否可以移动
    onChoseNow: false,
    moveList: [],
    eatList: [],
    tmap: [],//可移动范围
    nowChose: [],//当前选中对象
    mapDesc: {
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
  createMaps() {
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

    // console.log('初始化数据完毕', this.data.maps)
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
    // console.log(("选择了" + j + "-" + i + "  " + CC))
    if (CC === 0) {//点击空白格子
      this.onChoseS(j, i)
    } else {//存在棋子
      this.onChoseC(j, i, CC)
    }
  },

  onChoseS(j, i) {
    let moveList = this.data.moveList
    let nowChose = this.data.nowChose
    console.log('空白格子:', 'nowChose', nowChose, nowChose, 'moveList:', moveList, 'pos:' + j + '-' + i)
    if (nowChose.length > 0) {
      for (let q = 0; q < moveList.length; q++) {
        if (moveList[q][0] == j && moveList[q][1] == i) {
          this.move(nowChose[0], nowChose[1], j, i);
          break;
        }
      }
    }
  },

  move(y, x, j, i, eat) {
    console.log('move:', y + '-' + x, j + '-' + i, eat)
    // if (map[j][i] != 0) {
    //   LogError("错误的位置");
    //   return;
    // }
    // console.log(this.data.mapDesc,this.WhatSpace(y,x))
    let tex = this.data.mapDesc[this.WhatSpace(y, x)][0]
    if (eat == null) {
      console.log(y + "-" + x + " " + tex + " 移动到" + j + "-" + i)
    } else {
      console.log(y + "-" + x + " " + tex + " 吃" + j + "-" + i + " " + getCText(j, i)[0])
    }

    let map = this.data.maps
    let _nowWho = this.data.nowWho
    map[j][i] = map[y][x];
    map[y][x] = 0;
    this.setData({
      maps: map,
      nowWho: _nowWho == 0 ? 1 : 0,
      onMove: false
    })
    this.clean()
  },

  /**
   * @description: 获取棋子类型
   * @param {*} y y轴索引
   * @param {*} x x轴索引
   */
  WhatSpace(y, x) {
    return this.data.maps[y][x]
  },

  /**
   * @method: 点击棋子
   */
  onChoseC(j, i, t) {
    let nowWho = this.data.nowWho
    let onChoseNow = this.data.onChoseNow

    console.log('存在棋子:', '执旗方：' + (nowWho == 0 ? '红' : '黑'), 'pos:' + j + '-' + i + '-' + t)
    if (!onChoseNow) {
      if (nowWho == 0) {
        if (t < 0) return
      }
      if (nowWho == 1) {
        if (t > 0) return
      }
    }


    let nowChose = this.data.nowChose

    if (nowChose[0] == j && nowChose[1] == i) {
      console.log('点击自身')
      this.clean()
      return;
    }
    console.log(this.data.nowChose, 'nowChose', onChoseNow)
    if (onChoseNow) {
      let eatList = this.data.eatList
      console.log('eat && move', eatList)
      for (var q = 0; q < eatList.length; q++) {
        if (eatList[q][0] == j && eatList[q][1] == i) {
          //eat && move
          console.log('eat--->', j, i)
          this.move(nowChose[0], nowChose[1], j, i);
          break;
        }
      }
    }

    this.showSt(j, i, t)

  },

  /**
   * @method: 获取可以移动的点
   */
  showSt(j, i, t) {
    let tmap = this.WhereCan(j, i, t);
    let map = this.data.maps
    let moveList = this.data.moveList
    let eatList = this.data.eatList
    let nowChose = this.data.nowChose

    for (let q = 0; q < tmap.length; q++) {
      if (map[tmap[q][0]][tmap[q][1]] == 0) {
        moveList.push(tmap[q]);
      } else {
        eatList.push(tmap[q]);
      }
    }
    nowChose[0] = j;
    nowChose[1] = i;
    // nowChose[2] = t;
    this.setData({
      moveList: moveList,
      eatList: eatList,
      nowChose: nowChose,
      onChoseNow: true
    })

    console.log('showSt', 'nowChose', nowChose, 'eatList', eatList, 'moveList', moveList, 'pos:' + j + '-' + i + ' ' + t)
  },

  /**
   * @method: 获取可移动范围
   * @description: 0空
   * @description: 兵1 炮2 车3 马4 相5 士6 将7 红
   * @description: 卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
   */
  WhereCan(y, x, t) {
    let c = 0;
    if (t <= 0) {//负数转为正数
      c = 1;
      t *= -1;
    }

    switch (t) {
      case 1:
        this.binMove(y, x, c)
        break
      case 2:
        this.paoMove(y, x, c)
        break;
      case 3:
        this.juMove(y, x, c)
        break;
      case 4:
        this.maMove(y, x, c)
        break;
      case 5:
        this.xiangMove(y, x, c)
        break;
      case 6:
        this.shiMove(y, x, c)
        break;
      case 7:
        this.JSMove(y, x, c)
        break;
    }

    let tmap = this.data.tmap

    console.log('WhereCan', 'pos:' + y + '-' + x +' '+ t, c,tmap)

    return tmap

  },

  /**
   * @method: 是否有敌方
   */
  CanEat(y, x, c) {
    let map = this.data.maps
    let cc = 0;
    if (c == 0) {
      cc = 1;
    } else {
      cc = -1;
    }
    console.log('CanEat', map, y + '-' + x, map[y][x] * cc)
    return map[y][x] * cc < 0;
  },

  /**
   * @method: 兵移动逻辑
   */
  binMove(y, x, c) {//0红 1黑 6 2 0
    let tmap = []
    console.log('bin', tmap, '执旗方：' + c + (c == 0 ? '红' : '黑'), 'pos:' + y + '-' + x)
    let w;
    let h = 0;
    if (c == 0) {//红方
      w = y < 5;
      h = -1;
    } else {
      w = y > 4;
      h = 1;
    }
    if (w) {//过河
      if (y + h >= 0 && y + h < this.data.maps.length) {//上下边界
        let t1 = [];
        t1[0] = y + h;
        t1[1] = x;
        tmap.push(t1);
      }
      let t2 = []; let t3 = [];
      t2[0] = y; t3[0] = y;
      t2[1] = x - 1; t3[1] = x + 1;
      tmap.push(t2); tmap.push(t3);
    } else {
      let t = [];
      t[0] = y + h;
      t[1] = x;
      tmap.push(t);
    }
    this.setData({
      tmap: tmap
    })
    // console.log('tmap-->bin', tmap, this.data.tmap)
  },

  /**
   * @method: 车逻辑
   */
  juMove(y, x, c) {//0红 1黑 9 0 3 -- 0 0 1
    let tmap = []
    let map = this.data.maps

    var ci = 0;
    if (c == 0) {
      ci = 1;
    } else {
      ci = -1;
    }

    for (let i = y - 1; i >= 0; i--) {//所有前方坐标
      console.log('i:' + i, 'x:' + x, map[i][x], map[i][x] * ci)
      let t = [];
      if (map[i][x] == 0) {
        t[0] = i;
        t[1] = x;
        tmap.push(t)
      } else {
        if (map[i][x] * ci < 0) {
          t[0] = i;
          t[1] = x;
          tmap.push(t)
        }
        break
      }
      // if()
    }

    for (let q = y; q >= 0; q--) {//上
      // console.log('q:',q,'y',y)
      // if (q == y) continue;
      // if (!this.fastMove(tmap, c, q, x)) break;
    }
    // for (var q = x; q >= 0; q--) {//左
    //   if (q == x) continue;
    //   if (!this.fastMove(tmap, c, y, q)) break;
    // }
    // for (var q = y; q < map.length; q++) {//下
    //   if (q == y) continue;
    //   if (!this.fastMove(tmap, c, q, x)) break;
    // }
    // for (var q = x; q < map.length; q++) {//右
    //   if (q == x) continue;
    //   if (!this.fastMove(tmap, c, y, q)) break;
    // }

    this.setData({
      tmap: tmap
    })

    console.log('juMove', tmap, y, x, c)

  },
  fastMove(tmap, c, y, x) {//c:0红 1黑
    let map = this.data.maps
    var ci = 0;
    if (c == 0) {
      ci = 1;
    } else {
      ci = -1;
    }
    if (map[y][x] == 0) {
      var t = [];
      t[0] = y;
      t[1] = x;
      tmap.push(t);
      return true;
    } else {
      if (map[y][x] * ci < 0) {
        var t = [];
        t[0] = y;
        t[1] = x;
        tmap.push(t);
      }
      return false;
    }
  },

  /**
   * @method: 重置数据
   */
  clean() {
    this.setData({
      moveList: [],
      eatList: [],
      nowChose: [],
      onChoseNow: false
    })
  }




})
