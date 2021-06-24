const PORT = process.env.PORT || 3000;
const app = require("./app");
const {db} = require("./db/index");
const seed = require('../script/seed')



const init = async () => {
  try {
    // if(process.env.SEED === 'true') {
      await seed()
    // }
    // else {
    //   await db.sync()
    // }
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
