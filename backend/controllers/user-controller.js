import * as userService from "../services/user-service.js";
import { getConnection } from "../utils/db-connection.js";

export async function getEmailById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID parameter is required" });
  }

  try {
    const connection = await getConnection();
    const email = await userService.getEmailById(connection, id);

    if (!email) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
