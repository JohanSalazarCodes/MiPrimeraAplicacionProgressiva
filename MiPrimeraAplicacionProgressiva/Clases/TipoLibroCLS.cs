namespace MiPrimeraAplicacionProgressiva.Clases
{
    public class TipoLibroCLS
    {
        public int iidtipoLibro { get; set; }
        public int iidautor { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }

        public byte[] foto { get; set; }
        public string nombreFoto { get; set; }
        public string base64 { get; set; }
    }
}
