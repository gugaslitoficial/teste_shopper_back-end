"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const upload_1 = __importDefault(require("./routes/upload"));
const confirm_1 = __importDefault(require("./routes/confirm"));
const list_1 = __importDefault(require("./routes/list"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json({ limit: '10mb' })); //Suporta base64 grandes
app.use('/upload', upload_1.default);
app.use('/confirm', confirm_1.default);
app.use('/list', list_1.default);
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});
