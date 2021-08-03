const router = require("express").Router();
const Lobby = require('../models/lobby')
const User = require('../models/user')
const Message = require('../models/message')

router.post("/newLobby", async (req, res, next) => {
try{ const {topic, subject, name, limit, question, answer, host, private} = req.body
  let response = await Lobby.create({topic, subject, name, limit, question, answer, private})
  console.log(response, 'This is your Lobby');
  res.status(200).json(response);
} catch (error){
  res.status(500).json(error)
}
});

router.get('/allLobbies', async (req, res) =>{
try{ let response = await Lobby.find({private: false})
  res.status(200).json(response)
} catch (error){
  res.status(500).json(error)
}
})

router.post('/newUser', async (req, res)=> {
try{ const {username, description} = req.body
  let response = await User.create({username, description})
  res.status(200).json(response)
} catch (error){
    res.status(500).json(error)
}
})

router.get('/lobbies/:name', async (req, res) => {
  const {name} = req.params
  try {
    let response = await Lobby.findOne({name})
    res.status(200).json(response)  
  } catch (error) {
    res.status(500).json(response)
  }
})

router.post("/newMessage", async (req, res, next) => {
  try{ const {topic, subject, name, limit, question, answer, host, private} = req.body
    let response = await Lobby.create({topic, subject, name, limit, question, answer, private})
    console.log(response, 'This is your Lobby');
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error)
  }
  });

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
