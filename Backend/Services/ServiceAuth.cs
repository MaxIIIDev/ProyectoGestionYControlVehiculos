using AutoMapper;
using Backend.Models;
using Backend.Services;

public class ServiceAuth
{
    private readonly ServicePersona _servicePersona;
    private readonly ServiceUsuario _serviceUsuario;
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly ServicePassword _servicePassword;
    private readonly ServicenToken _servicenToken;

    public ServiceAuth(
        ServicePersona servicePersona,
        ServiceUsuario serviceUsuario,
        AppDbContext context,
        IMapper mapper,
        ServicePassword servicePassword,
        ServicenToken servicenToken
    )
    {
        _servicePersona = servicePersona;
        _serviceUsuario = serviceUsuario;
        _context = context;
        _mapper = mapper;
        _servicePassword = servicePassword;
        _servicenToken = servicenToken;
    }

    public async Task<bool> Register(RegisterDto dto)
    {
        if (await _serviceUsuario.getUsuarioByEmailAsync(dto.Gmail!) is not null)
            throw new Exception("El correo ya esta registrado");
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            Persona? persona = await _servicePersona.GetByDniAsync(dto.Dni!.Value);
            if (persona is null)
            {
                persona = await _servicePersona.AddAsync(_mapper.Map<Persona>(dto));
            }
            if (await _serviceUsuario.getUsuarioByIdPersonaAsync(persona.IdPersona) is not null)
                throw new Exception("El usuario ya esta registrado");
            Usuario usuario = _mapper.Map<Usuario>(dto);
            usuario.Contrasena = _servicePassword.HashPassword(dto.Contrasena!);
            usuario.IdPersona = persona.IdPersona;
            usuario.IdRol = 2;
            Usuario? userCreated = await _serviceUsuario.AddAsync(usuario);
            if (userCreated is null)
                throw new Exception("Error al registrar usuario");
            await transaction.CommitAsync();
            return true;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<string> Login(LoginDto dto)
    {
        Usuario? usuario = await _serviceUsuario.getUsuarioByEmailAsync(dto.Gmail!);
        if (usuario is null)
            throw new KeyNotFoundException("Usuario no encontrado");
        if (!_servicePassword.VerifyPassword(dto.Contrasena!, usuario.Contrasena))
            throw new Exception("Contraseña incorrecta");
        return _servicenToken.GenerateToken(usuario);
    }
}
