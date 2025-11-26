// src/routes/solicitudes.js
import express from "express";
import { body, validationResult } from "express-validator";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post(
    "/",
    [
        body("nombre").isString().trim().notEmpty(),
        body("correo").isEmail(),
        body("descripcion").isString().trim().notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { nombre, correo, descripcion } = req.body;

        const { data, error } = await supabase
        .from("solicitudes")
        .insert([{ nombre, correo, descripcion }])
        .select()
        .single();

        if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    }
);

router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("solicitudes")
        .select("*")
        .order("fecha", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

export default router;
