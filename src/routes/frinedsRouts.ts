import express from "express";
const router = express.Router();

import facade from "../facades/DummyDB-Facade";
import { IFriend } from "../interfaces/IFriend";

router.get("/all", async (req, res) => {
  const friends = await facade.getAllFriends();
  res.json(friends.map(f=>{
    
   /*   const friend={
    name:f.firstName+' '+f.lastName,
   email: f.email}*/
  
  const {firstName, lastName}= f
return {firstName:firstName,lastName:lastName}}));
});

router.post("/addnew", async (req, res) => {
  const friend = req.body;
  const newFriend = await facade.addFriend(friend);
  
  res.json(newFriend);
});

router.delete("/:email", async (req, res) => {
    const deletedFriend = await facade.deleteFriend(req.params.email)
    res.json(deletedFriend);
  });

export default router;
