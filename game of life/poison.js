let LivingCreature = require('./LivingCreature')

module.exports  = class Poison extends LivingCreature{
    constructor(x, y) {
    super(x,y)
    }
}