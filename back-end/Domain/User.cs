using System.Collections.Generic;

namespace back_end.Domain
{
    public class User : BaseEntity
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Password { get; set; }
        public string CodeRFID { get; set; }
        public string Token { get; set; }
        public bool StatusConta { get; set; }
        public string Foto {get; set; }
        public List<Acesso> Acessos { get; set; }
    }
}