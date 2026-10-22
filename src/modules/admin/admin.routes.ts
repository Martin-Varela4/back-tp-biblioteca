import { Router } from "express";
import { AppDataSource } from "../../config/data-source.js";
import { Admin } from "../admin/admin.entity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRouter = Router();


adminRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminRepository = AppDataSource.getRepository(Admin);
        const admin = await adminRepository.findOneBy({ email });

        if (!admin) {
            res.status(401).json({ error: "Credenciales incorrectas" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
        if (!isValidPassword) {
            res.status(401).json({ error: "Credenciales incorrectas" });
            return;
        }

        const token = jwt.sign(
            { adminId: admin.id },
            process.env.JWT_SECRET || "secreto_por_defecto",
            { expiresIn: "1d" }
        );

        res.json({ token, message: "Login exitoso" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

export default adminRouter;
