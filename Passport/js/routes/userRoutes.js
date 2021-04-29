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
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.router = router;
const validatePassword = (user, password) => {
    return bcrypt_1.default.compareSync(password, user.password);
};
const createHash = (password) => {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
};
passport_1.default.use("login", new passport_local_1.Strategy({
    passReqToCallback: true
}, (req, username, password, cb) => {
    mongo_db_1.User.findOne({ username: username }, (err, user) => {
        if (err)
            return cb(err);
        if (!user) {
            console.log("User not found: ", username);
            return cb(null, false);
        }
        if (!validatePassword(user, password)) {
            console.log("Invalid pass");
            return cb(null, false);
        }
        return cb(null, user);
    });
}));
passport_1.default.use("register", new passport_local_1.Strategy({
    passReqToCallback: true
}, function (req, username, password, cb) {
    const findOrCreateUser = function () {
        mongo_db_1.User.findOne({ username: username }, function (err, user) {
            if (err) {
                console.log("Error", err);
                return cb(err);
            }
            if (user) {
                console.log("User already exists");
                return cb(null, false);
            }
            else {
                let newUser = new mongo_db_1.User();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.save((err) => {
                    if (err) {
                        console.log("Error saving user", err);
                        throw err;
                    }
                    console.log("User Registration succesful");
                    return cb(null, newUser);
                });
            }
        });
    };
    process.nextTick(findOrCreateUser);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    mongo_db_1.User.findById(id, function (err, user) {
        done(err, user);
    });
});
router.post('/login', passport_1.default.authenticate("login"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        req.session.user = { 'username': username };
        req.session.cookie.expires = new Date(Date.now() + 10000 * 60);
        res.cookie('username', req.session.user, { expires: new Date(Date.now() + 10000 * 60), httpOnly: false }).send(`Usuario ${username} loggeado`);
        console.log(req.session);
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
        console.log(req.session);
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
