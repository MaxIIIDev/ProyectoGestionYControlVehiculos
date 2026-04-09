import { z } from "zod";

const PersonaSchema = z.object({
  idPersona: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  dni: z.number(),
  fechaNac: z.coerce.date(),
  estado: z.boolean(),
});

export const UsuarioSchema = z.object({
  idUsuario: z.number(),
  gmail: z.string().email(),
  contrasena: z.string(),
  avatarUrl: z.string().nullable().optional(),
  idRol: z.number(),
  estado: z.boolean(),
  persona: PersonaSchema.optional(),
});

export type UsuarioType = z.infer<typeof UsuarioSchema>;

export const ApiUsuarioSchema = z.object({
  idUsuario: z.number(),
  gmail: z.string(),
  avatarUrl: z.string().nullable(),
  idRol: z.number(),
  estado: z.boolean(),
  persona: z.object({
    idPersona: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.number(),
    fechaNac: z.string(),
  }),
});

export const UsuarioApiParser = ApiUsuarioSchema.transform((data) => ({
  ...data,
  persona: {
    ...data.persona,
    fechaNac: new Date(data.persona.fechaNac),
  },
}));

export type ApiUsuarioType = z.infer<typeof ApiUsuarioSchema>;
