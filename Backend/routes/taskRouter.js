const router = require("express").Router();
const ensureAuthenticatedUser = require("../middlewares/authMiddleware"); 
const {getTasks, createTasks, editTasks, toggleTaskStatus, deleteTasks} = require("../controllers/taskController"); 


router.get("/", ensureAuthenticatedUser,  getTasks);
router.post("/", ensureAuthenticatedUser, createTasks);
router.patch("/:id", ensureAuthenticatedUser, toggleTaskStatus );
router.put("/:id", ensureAuthenticatedUser, editTasks);
router.delete("/:id", ensureAuthenticatedUser, deleteTasks);

module.exports = router;