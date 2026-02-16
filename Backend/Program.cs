using System.Net;
using System.Text;
using Backend.Profiles;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var connectionString = builder.Configuration.GetConnectionString("MySqlConnection");
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
        }
    );
});
builder.Services.AddDbContextPool<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings.GetValue<string>("Key")!);
builder
    .Services.AddAuthentication(config =>
    {
        config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(config =>
    {
        config.RequireHttpsMetadata = false;
        config.SaveToken = true;
        config.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ServiceAuditoria>();
builder.Services.AddScoped<ServiceChecklistDiario>();
builder.Services.AddScoped<ServiceDocumento>();
builder.Services.AddScoped<ServiceMatafuego>();
builder.Services.AddScoped<ServiceMensajeChat>();
builder.Services.AddScoped<ServiceNeumatico>();
builder.Services.AddScoped<ServicePersona>();
builder.Services.AddScoped<ServicePosicionNeumatico>();
builder.Services.AddScoped<ServiceRegistroKilometraje>();
builder.Services.AddScoped<ServiceRol>();
builder.Services.AddScoped<ServiceService>();
builder.Services.AddScoped<ServiceUsuario>();
builder.Services.AddScoped<ServiceVehiculo>();
builder.Services.AddScoped<ServicenToken>();
builder.Services.AddScoped<ServicePassword>();
builder.Services.AddScoped<ServiceAuth>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// builder.Services.AddAutoMapper(cfg =>
// {
//     cfg.AddProfile<MappingProfile>();
// });
var app = builder.Build();
app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = "application/json";
        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
        if (exceptionHandlerFeature != null)
        {
            var logger = app.Services.GetRequiredService<ILogger<Program>>();
            var exception = exceptionHandlerFeature.Error;
            var errorSource = exception.TargetSite;
            var sourceClass = errorSource?.DeclaringType?.FullName;
            var sourceMethod = errorSource?.Name;
            var logMessage =
                @$"
                --------------------------------------------------------------------------
                [ ERROR CRÍTICO NO CONTROLADO ]
                Clase : {sourceClass}
                Metodo: {sourceMethod}
                Error : {exception.Message}
                --------------------------------------------------------------------------
                ";
            logger.LogError(exception, logMessage, context.Request.Path, exception.Message);
        }
        await context.Response.WriteAsJsonAsync(
            new
            {
                StatusCode = context.Response.StatusCode,
                Message = "Ocurrio un error interno en el servidor",
            }
        );
    });
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
