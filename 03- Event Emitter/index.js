const logEvents = require("./logEvents");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

// Initialize the emitter
const myEmitter = new Emitter();

// Add a listener for the "log" event
myEmitter.on("log", (msg) => logEvents(msg));

// Emit the "log" event
myEmitter.emit("log", "This is a log message.");
