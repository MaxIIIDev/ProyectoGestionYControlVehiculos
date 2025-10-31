

using AutoMapper;
using Backend.Models;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        CreateMap<CreateAuditoriaDto, Auditoria>();
        CreateMap<UpdateAuditoriaDto, Auditoria>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<CreateChecklistDiarioDto, ChecklistDiario>();
        CreateMap<UpdateChecklistDiarioDto, ChecklistDiario>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<CreateDocumentoDto, Documento>();
        CreateMap<UpdateDocumentoDto, Documento>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<CreatePersonaDto, Persona>();
        CreateMap<UpdatePersonaDto, Persona>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
 }
}