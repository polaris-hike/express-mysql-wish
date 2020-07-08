const Common = require('./common');
const async = require('async');
const WishModel = require('../model/wish');
const Constant = require('../constant/constant')

let exportObj = {
  getList,
  add
}

module.exports = exportObj

// 获取许愿列表方法
function getList(req, res) {
  // 定义一个async任务
  let tasks = {
    // 执行查询方法
    query: cb => {
      // 使用Sequelize的model的findAll方法查询
      WishModel
        .findAll({
          limit: 10,
          order: [['created_at', 'DESC']],
        })
        .then(function (result) {
          // 查询结果处理
          let list = [];                // 定义一个空数组list，用来存放最终结果
          // 遍历SQL查询出来的结果，处理后装入list
          result.forEach((v, i) => {
            let obj = {
              id: v.id,
              name: v.name,
              content: v.content
            };
            list.push(obj);
          });
          cb(null, list);     // 通过async提供的回调，返回数据到下一个async方法
        })
        .catch(function (err) {
          // 错误处理
          console.log(err);  // 打印错误日志
          // 通过async提供的回调，返回数据到下一个async方法
          cb(Constant.DEFAULT_ERROR);
        });
    }
  };
  // 让async自动控制流程
  async.auto(tasks, function (err, result) {
    if (err) {
      console.log(err)      // 如果错误存在，则打印错误
    } else {
      // 如果没有错误，则渲染index页面模板，同时将之前query方法获取的结果数组list

      res.render('index', {
        list: result['query']
      });
    }
  })
}

function add() {

}