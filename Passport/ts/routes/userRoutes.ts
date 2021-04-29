import express, { Request, Response } from "express";
import { Session, User } from "../database/mongo.db"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const router = express.Router()

const validatePassword = (user: any, password: any) => {
  return bcrypt.compareSync(password, user.password)
}

const createHash = (password: any) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

passport.use(
  "login",
  new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, cb) => {
    User.findOne({username: username}, (err: any, user: any) => {
      if(err) return cb(err)
      if(!user) {
        console.log("User not found: ", username)
        return cb(null, false);
      } 
      if(!validatePassword(user, password)) {
        console.log("Invalid pass")
        return cb(null, false)
      }
      return cb(null, user)
    })
  })
)

passport.use(
  "register",
  new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, cb){
    const findOrCreateUser = function() {
      User.findOne({username: username}, function(err: any, user: any){
        if(err){
          console.log("Error", err)
          return cb(err)
        }
        if(user){
          console.log("User already exists")
          return cb(null, false)
        } else {
          let newUser = new User();
          newUser.username = username
          newUser.password = createHash(password)
          newUser.save((err: any) => {
            if(err) {
              console.log("Error saving user", err)
              throw err
            }
            console.log("User Registration succesful")
            return cb(null, newUser)
          })
        }
      })
    }
    process.nextTick(findOrCreateUser)
  })
)

passport.serializeUser((user: any, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, function(err: any, user: any){
    done(err, user)
  })
})

router.post('/login',
  passport.authenticate("login"),
  async (req: Request, res: Response) => {

  try {

    const { username } = req.query
    req.session.user = {'username': username}
    req.session.cookie.expires = new Date(Date.now() + 10000 * 60)
    res.cookie('username', req.session.user, {expires  : new Date(Date.now() + 10000 * 60), httpOnly: false}).send(`Usuario ${username} loggeado`)
    console.log(req.session)
  } catch(err) {
    console.log(err)
  }
  
})

router.post('/register', passport.authenticate('register'),
async (req: Request, res: Response) => {

try {

  const { username } = req.query
  req.session.user = {'username': username}
  req.session.cookie.expires = new Date(Date.now() + 10000 * 60)
  res.cookie('username', req.session.user, {expires  : new Date(Date.now() + 10000 * 60), httpOnly: false}).send(`Usuario ${username} loggeado`)
  console.log(req.session)
} catch(err) {
  console.log(err)
}
})
router.post('/logout', async (req: Request, res: Response) => {

  try {

    res.clearCookie('name')
    req.logOut()
    req.session.destroy(err => {
      if(err){
          console.log(err);
      } else {
          res.send(`Hasta luego`)
      }
  })
  } catch(err) {
    console.log(err)
  }
  
})

router.get('/session', async (req: Request, res: Response) => {

  try {

    const {id} = req.query;
    const data = await Session.find({id: id})
    res.send(data)
  } catch(err) {
    console.log(err)
  }
  
})

export {router}