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
            return await _context.MensajesChats.ToListAsync();
        }
        // MENSAJE CHAT POR ID
        public async Task<MensajeChat?> GetByIdAsync(int id)
        {
            return await _context.MensajesChats.FindAsync(id);
        }
        // NUEVO MENSAJE CHAT
        public async Task<MensajeChat> AddAsync(MensajeChat mensajeChat)
        {
            _context.MensajesChats.Add(mensajeChat);
            await _context.SaveChangesAsync();
            return mensajeChat;
        }
        // UPDATE MENSAJE CHAT
        public async Task<bool> UpdateAsync(MensajeChat mensajeChat)
        {
            _context.MensajesChats.Update(mensajeChat);
            return await _context.SaveChangesAsync() > 0;
        }
        // ELIMINAR MENSAJE CHAT
        public async Task<bool> DeleteAsync(int id)
        {
            var mensajeChat = await _context.MensajesChats.FindAsync(id);
            if (mensajeChat == null)
                return false;

            _context.MensajesChats.Remove(mensajeChat);
            return await _context.SaveChangesAsync() > 0;
        }
        // BAJA LOGICA MENSAJE CHAT
        public async Task<bool> SoftDeleteAsync(int id)
        {
            var mensajeChat = await _context.MensajesChats.FindAsync(id);
            if (mensajeChat == null)
                return false;

            mensajeChat.Estado = false;
            _context.MensajesChats.Update(mensajeChat);
            return await _context.SaveChangesAsync() > 0;
        }
        // ALTA LOGICA MENSAJE CHAT
        public async Task<bool> RestoreAsync(int id)
        {
            var mensajeChat = await _context.MensajesChats.FindAsync(id);
            if (mensajeChat == null)
                return false;

            mensajeChat.Estado = true;
            _context.MensajesChats.Update(mensajeChat);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}