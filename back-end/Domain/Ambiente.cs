using System.Collections.Generic;

namespace back_end.Domain
{
    public class Ambiente : BaseEntity
    {
        public string TipoAmbiente { get; set; }
        public int Numero { get; set; }
        public char Bloco { get; set; }
        public string Area { get; set; }
        public string UnidInstitucional { get; set; }
        public int Capacidade { get; set; }
        public int TotalPessoa { get; set; }
        public int TotalComputador { get; set; }
        public string IpCamera { get; set; }
        public List<Acesso> Acessos { get; set; }
    }
}