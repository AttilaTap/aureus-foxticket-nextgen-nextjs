import * as userService from "../services/user-service.js";
import DB from "../utils/db-connection.js";

export class UserController {
  async getEmailById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID parameter is required" });
    }

    let db = new DB();
    try {
      await db.init();
      const email = await userService.getEmailById(db.getConnection(), id);

      if (!email) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }
}
