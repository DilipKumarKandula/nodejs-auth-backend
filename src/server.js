const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 const logger = require("./config/logger");

logger.info(`🚀 Server running on port ${PORT}`);
});
