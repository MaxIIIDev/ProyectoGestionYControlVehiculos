using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ServiceMensajeChat
    {
        private readonly AppDbContext _context;

        public ServiceMensajeChat(AppDbContext context)
        {
            _context = context;
        }

        // GET TODO MENSAJES CHAT
        public async Task<List<MensajeChat>> GetAllAsync()
        {
            try
            {
                return await _context.MensajesChats.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los mensajes de chat: " + ex.Message);

            }
        }
        // MENSAJE CHAT POR ID
        public async Task<MensajeChat?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.MensajesChats.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el mensaje de chat: " + ex.Message);
            }
        }
        // NUEVO MENSAJE CHAT
        public async Task<MensajeChat> AddAsync(MensajeChat mensajeChat)
        {
            try
            {
                _context.MensajesChats.Add(mensajeChat);
                await _context.SaveChangesAsync();
                return mensajeChat;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el mensaje de chat: " + ex.Message);
            }
        }
        // UPDATE MENSAJE CHAT
        public async Task<bool> UpdateAsync(MensajeChat mensajeChat)
        {
            try
            {
                _context.MensajesChats.Update(mensajeChat);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el mensaje de chat: " + ex.Message);
            }
        }
        // ELIMINAR MENSAJE CHAT
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var mensajeChat = await _context.MensajesChats.FindAsync(id);
                if (mensajeChat == null)
                    return false;

                _context.MensajesChats.Remove(mensajeChat);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el mensaje de chat: " + ex.Message);
            }
        }
        // BAJA LOGICA MENSAJE CHAT
        public async Task<bool> SoftDeleteAsync(int id)
        {
            try
            {
                var mensajeChat = await _context.MensajesChats.FindAsync(id);
                if (mensajeChat == null)
                    return false;

                mensajeChat.Estado = false;
                _context.MensajesChats.Update(mensajeChat);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al dar de baja el mensaje de chat: " + ex.Message);
            }
        }
        // ALTA LOGICA MENSAJE CHAT
        public async Task<bool> RestoreAsync(int id)
        {
            try
            {
                var mensajeChat = await _context.MensajesChats.FindAsync(id);
                if (mensajeChat == null)
                    return false;

                mensajeChat.Estado = true;
                _context.MensajesChats.Update(mensajeChat);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al restaurar el mensaje de chat: " + ex.Message);
            }
        }
    }
}