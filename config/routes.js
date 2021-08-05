const router = require("express").Router();
const Lobby = require('../models/lobby')
const User = require('../models/user')
const Message = require('../models/message');
const { response } = require("express");

router.post("/newLobby", async (req, res, next) => {
try{ const {topic, subject, name, limit, question, answer, private} = req.body
  // let sessionId = req.session.loggedInUser._id
  let lobby = await Lobby.create({topic, subject, name, limit, question, answer, private})
  // host: sessionId, users: [sessionId]
  console.log(lobby, 'This is your Lobby');
  res.status(200).json(lobby);
} catch (error){
  console.log('Invalid Lobby 14');
  res.status(500).json(error)
}
});

router.post('/newHost', async (req, res)=>{
  let {roomId, hostId} = req.body
  let response = await Lobby.findByIdAndUpdate(roomId, {host: hostId}, {new: true})
  res.status(200).json(response)
})

router.post('/allLobbies', async (req, res) =>{
  try{ const {topic} = req.body 
    let response = await Lobby.find({$and:[{private: false},{topic}]})
  res.status(200).json(response)
} catch (error){
  res.status(500).json(error)
}
})

router.post('/newUser', async (req, res)=> {
try{ const {username, description} = req.body
let response = await User.create({username, description})
req.session.loggedInUser = response
console.log('created a new user', response);
res.status(200).json(response)
} catch (error){
    res.status(500).json(error)
}
})

router.get('/lobby/:name', async (req, res) => {
  const {name} = req.params
  try {
    let response = await Lobby.findOne({name}).populate('users')
    res.status(200).json(response)  
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/lobby/:lobbyId', async (req, res)=> {
  const {lobbyId} = req.params
  try{
  let response = await Lobby.findOne({lobbyId}).populate('users')
  res.status(200).json(response)
}catch (error) {
  res.status(500).json(error)
}
})

router.get('/allLobbyMessages/:room', async (req, res)=> {
try { const {room} = req.params
  let response = await Lobby.findOne({name: room})
  res.status(200).json(response)
}
catch(error) {
  res.status(500).json(error)
}
})

router.post('/userJoinedRoom', async (req, res)=>{
  try {const {_id} = req.session.loggedInUser
  const {roomId} = req.body                             /* pushing new users to array */
  let response = await Lobby.findByIdAndUpdate(roomId, {$push: {users: _id}},{new: true})
  res.status(200).json(response)
}
catch(error) {
  res.status(500).json(error)
}
})

router.post('/userLeavesRoom', async (req, res)=>{
  try {const {_id} = req.session.loggedInUser
  const {roomId} = req.body
  let response = await Lobby.findByIdAndUpdate(roomId, {$pull: {users: _id}},{new: true})
  let deletedUser = await User.findByIdAndDelete(_id)
  req.session.destroy()
  res.status(200).json(response)
}
catch(error) {
  res.status(500).json(error)
}
})

module.exports = router;