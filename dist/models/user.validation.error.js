"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError {
    constructor(name, message, path, status) {
        this.name = name;
        this.message = message;
        this.path = path;
        this.status = status;
        this.message = message;
        this.name = name;
        this.status = status;
        this.path = path; //error.path;
    }
    toJson() {
        if (this.path) {
            return {
                name: this.name,
                status: this.status,
                message: this.message,
                path: this.path,
            };
        }
        else {
            return {
                name: this.name,
                status: this.status,
                message: this.message,
            };
        }
    }
}
exports.ValidationError = ValidationError;
//module.exports = ValidationError;
