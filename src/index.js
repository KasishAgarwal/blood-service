const app = require('./middleware/startup.middleware');
const port = 7000;
app.listen(port, () => {
    console.info(`myApplication runs on ${port}`);
})
module.exports = app;



