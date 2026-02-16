using AutoMapper;
using Backend.Models;

namespace Backend.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDto, Persona>().ConstructUsing(x => new Persona());
            CreateMap<RegisterDto, Usuario>().ConstructUsing(x => new Usuario());
            CreateMap<CreateAuditoriaDto, Auditoria>();
            CreateMap<UpdateAuditoriaDto, Auditoria>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateChecklistDiarioDto, ChecklistDiario>();
            CreateMap<UpdateChecklistDiarioDto, ChecklistDiario>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateDocumentoDto, Documento>();
            CreateMap<UpdateDocumentoDto, Documento>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreatePersonaDto, Persona>();
            CreateMap<UpdatePersonaDto, Persona>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateMatafuegoDto, Matafuego>();
            CreateMap<UpdateMatafuegoDto, Matafuego>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreatePosicionNeumaticoDto, PosicionNeumatico>();
            CreateMap<UpdatePosicionNeumaticoDto, PosicionNeumatico>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateRegistroKilometrajeDto, RegistroKilometraje>();
            CreateMap<UpdateRegistroKilometrajeDto, RegistroKilometraje>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateRolDto, Rol>();
            CreateMap<UpdateRolDto, Rol>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateServiceDto, Service>();
            CreateMap<UpdateServiceDto, Service>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateUsuarioDto, Usuario>();
            CreateMap<UpdateUsuarioDto, Usuario>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateVehiculoDto, Vehiculo>();
            CreateMap<UpdateVehiculoDto, Vehiculo>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<CreateNeumaticoDto, Neumatico>();
            CreateMap<UpdateNeumaticoDto, Neumatico>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
