public class PagedResponse<T>
{
    public List<T> Items { get; set; }

    public int PaginaActual { get; set; }
    public int TamanoPaginas { get; set; }
    public int TotalRegistrosBd { get; set; }
    public int TotalPaginasCalculadas { get; set; }

    //PARA USAR EN EL FRONT
    public bool HasPreviousPage => PaginaActual > 1;
    public bool HasNextPage => PaginaActual < TotalRegistrosBd;

    public PagedResponse(List<T> items, int TotalRegistrosBd, int paginaActual, int tamanoPaginas)
    {
        this.Items = items;
        this.TotalRegistrosBd = TotalRegistrosBd;
        this.PaginaActual = paginaActual;
        this.TamanoPaginas = tamanoPaginas;
        TotalPaginasCalculadas = (int)Math.Ceiling(TotalRegistrosBd / (double)tamanoPaginas);
    }
}
