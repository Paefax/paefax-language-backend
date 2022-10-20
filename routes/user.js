const express = require('express')
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require('bcrypt');

router.get('/user', (req, res) => {
    let select = "SELECT * FROM users";

    rowData = [];

    userDB.all(select, (error, rows) =>{

        if(error){
            console.log(error)
            res.status(500).send();
        } else{
        rows.forEach((row) => {
        rowData.push(row);
        })
            console.log(rowData);
        }
    })

    res.status(200).send();
});

router.post('/user/create', async (req, res) => {

    const rowData = []

    const findUser = rowData.find(user => user.username === req.body.name)

    console.log(findUser)
      if(findUser){
        throw new Error('already exists');
      }
       try{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.name, password: hashedPassword };
    
        let insert = "INSERT INTO users (username, password) VALUES (?,?)";
        userDB.run(insert,[user.username, user.password]);

        res.status(201).send();
        console.log(rowData);
    
    } catch (e){
      res.status(500).send();
    }
})
  
router.post('/user/login', async (req, res) => {

    rowData = [];

    let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");

    findUser.each(req.body.name, async (error,row) => {

        rowData.push(row);

        const user = rowData.find(user => user.username === req.body.name)
    
        if (user === null) {
          return res.status(400).send('Cannot find user')
        }
        try {
          if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
            console.log(rowData)
          } else {
            res.send('Not Allowed')
          }
        } catch {
          res.status(500).send()
        }

     }, (error,row) => {
        findUser.finalize();
     })

    
});
  
module.exports = router;

