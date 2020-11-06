'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: '武汉最好吃的小吃是什么？',
        sort: 1,
        body: "肯定是三鲜豆皮，热干面一点都不好吃！",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '今天天气可真好啊',
        sort: 1,
        body: "狂风暴雨特别凉快哦，欢迎每年来武汉看海！",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
