"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mongo_db_1 = require("../database/mongo.db");
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const router = express_1.default.Router();
exports.router = router;
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    mongo_db_1.User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: "557785638017570",
    clientSecret: "7d8fde91afab0c3565a51ff220130d38",
    callbackURL: "http://localhost:8080/api/login",
    profileFields: ['id', 'displayName', 'name', 'emails', 'gender', 'photos']
}, function (accessToken, refreshToken, profile, cb) {
    const findOrCreateUser = function () {
        mongo_db_1.User.findOne({ facebookId: profile.id }, function (err, user) {
            if (err) {
                console.log("Error in SignUp: " + err);
                return cb(err);
            }
            if (user) {
                console.log("User already exists");
                return cb(null, user);
            }
            else {
                let newUser = new mongo_db_1.User();
                newUser.facebookId = profile.id;
                newUser.username = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.photo = profile.photos[0].value;
                newUser.save((err) => {
                    if (err) {
                        console.log("Error in saving User: " + err);
                        throw err;
                    }
                    console.log("User Registration successful");
                    return cb(null, newUser);
                });
            }
        });
    };
    process.nextTick(findOrCreateUser);
}));
router.get('/auth/facebook', passport_1.default.authenticate("facebook"));
router.get('/login', passport_1.default.authenticate("facebook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, photo } = (_a = res.req) === null || _a === void 0 ? void 0 : _a.user;
        req.session.user = { 'username': username, email, photo };
        req.session.cookie.expires = new Date(Date.now() + 10000 * 60);
        res.cookie('username', username, { expires: new Date(Date.now() + 10000 * 60), httpOnly: false });
        console.log(req.session);
        res.redirect('http://localhost:3000/list');
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/register', passport_1.default.authenticate('register'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        req.session.user = { 'username': username };
        req.session.cookie.expires = new Date(Date.now() + 10000 * 60);
        res.cookie('username', req.session.user, { expires: new Date(Date.now() + 10000 * 60), httpOnly: false }).send(`Usuario ${username} loggeado`);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('name');
        req.logOut();
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(`Hasta luego`);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const data = yield mongo_db_1.Session.find({ id: id });
        res.send(data);
    }
    catch (err) {
        console.log(err);
    }
}));
