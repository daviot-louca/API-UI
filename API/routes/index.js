const express = require("express")
const router = express.Router()

router.use("/tickets",require("./ticket.route"))
router.use("/categories",require("./categories.routes"))
router.use("/messages",require("./messages.routes"))
router.use("/activites",require("./activites.route"))
router.use("/tags",require("./tags.route"))
router.use("/connaissances",require("./baseConnaissances.route"))
router.use("/",require("./auth.route"))

module.exports = router