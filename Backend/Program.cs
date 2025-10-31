using System.Net;
using Backend.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var connectionString = builder.Configuration.GetConnectionString("MySqlConnection");
builder.Services.AddControllers();
builder.Services.AddDbContextPool<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    )
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
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
builder.Services.AddAutoMapper(typeof(Program));
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
            var logMessage = @$"
                --------------------------------------------------------------------------
                [ ERROR CRÍTICO NO CONTROLADO ]
                Clase : {sourceClass}
                Metodo: {sourceMethod}
                Error : {exception.Message}
                --------------------------------------------------------------------------
                ";
            logger.LogError(
                exception,
                logMessage,
                context.Request.Path,
                exception.Message
            );
        }
        await context.Response.WriteAsJsonAsync(new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Ocurrio un error interno en el servidor",
        });
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
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


