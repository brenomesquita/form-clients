const ColorModel = require('../schemas/Colors.ts').default;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up () {
    try {
      const count = await ColorModel.count();

      if (count === 0) {
        await ColorModel.bulkCreate([
          { name: 'Vermelho', value: '#FF0000' },
          { name: 'Laranja', value: '#FF7F00' },
          { name: 'Amarelo', value: '#FFFF00' },
          { name: 'Verde', value: '#00FF00' },
          { name: 'Azul', value: '#0000FF' },
          { name: 'Anil', value: '#4B0082' },
          { name: 'Violeta', value: '#8A2BE2' },
        ]);
        console.log('Seed realizado: Cores inseridas.');
      } else {
        console.log('Seed não realizado: A tabela já contém dados.');
      }
    } catch (error) {
      console.error('Erro ao rodar o seed de cores: ', error);
    }
  },

  async down () {
    await ColorModel.destroy({ where: {} });
  }
};
