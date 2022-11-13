"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const clog_1 = require("./middleware/clog");
const index_1 = require("./routes/index");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Import custom middleware, "cLog"
app.use(clog_1.clog);
// Middleware for parsing JSON and urlencoded form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', index_1.router);
console.log(`Environment is ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'prod') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
}
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
// Wildcard route to direct users to a 404 page
app.get('*', (req, res) => res.status(404).send('Not Found'));
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
