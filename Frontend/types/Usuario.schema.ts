import { z } from "zod";

export const RolSchema = z.object({
  idRol: z.number(),
  nombre: z.string(),
  estado: z.boolean(),
});

export const PersonaSchema = z.object({
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
  avatarUrl: z.string().nullable().optional(),
  idRol: z.number(),
  rol: RolSchema.optional().nullable(),
  estado: z.boolean(),
  persona: PersonaSchema.optional(),
});
export const ApiUsuarioSchema = z.object({
  idUsuario: z.number(),
  gmail: z.string(),
  avatarUrl: z.string().nullable(),
  idRol: z.number(),
  rol: RolSchema.optional().nullable(),
  estado: z.boolean(),
  idPersona: z.number().optional(),
  persona: z.object({
    idPersona: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.number(),
    fechaNac: z.string(),
    estado: z.boolean(),
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
export type UsuarioType = z.infer<typeof UsuarioSchema>;
export type RolType = z.infer<typeof RolSchema>;
export type PersonaType = z.infer<typeof PersonaSchema>;
