import express, { Request, Response } from "express";
import { Session, User } from "../database/mongo.db"
import passport from "passport";
import { Profile, Strategy as FacebookStrategy } from "passport-facebook";
import bcrypt from "bcrypt";

const router = express.Router()

passport.serializeUser((user: any, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, function(err: any, user: any){
    done(err, user)
  })
})

passport.use(new FacebookStrategy({
  clientID: "557785638017570",
  clientSecret: "7d8fde91afab0c3565a51ff220130d38",
  callbackURL: "http://localhost:8080/api/login",
  profileFields: ['id', 'displayName', 'name', 'emails', 'gender', 'photos']
},
function(accessToken, refreshToken, profile: any, cb){
  const findOrCreateUser = function() {
    User.findOne({ facebookId: profile.id }, function (err: any, user: any) {
      if(err){
        console.log("Error in SignUp: " + err)
        return cb(err)
      }
      if(user){
        console.log("User already exists")
        return cb(null, user)
      } else {
        let newUser = new User();
        newUser.facebookId = profile.id
        newUser.username = profile.displayName
        newUser.email = profile.emails[0].value
        newUser.photo = profile.photos[0].value
        newUser.save((err: any) => {
          if(err){
            console.log("Error in saving User: " + err)
            throw err
          }
          console.log("User Registration successful")
          return cb(null, newUser)
        })
      }
    })
  }
  process.nextTick(findOrCreateUser)
}))

router.get('/auth/facebook', passport.authenticate("facebook"))

router.get('/login',
  passport.authenticate("facebook"),
  async (req: Request, res: any) => {

  try {

    const { username, email, photo } = res.req?.user
    req.session.user = {'username': username, email, photo }
    req.session.cookie.expires = new Date(Date.now() + 10000 * 60)
    res.cookie('username', username, {expires  : new Date(Date.now() + 10000 * 60), httpOnly: false})
    console.log(req.session)
    res.redirect('http://localhost:3000/list')
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