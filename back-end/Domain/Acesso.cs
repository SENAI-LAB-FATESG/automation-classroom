using System;

namespace back_end.Domain
{
    public class Acesso : BaseEntity
    {
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
        public User User { get; set; }
        public Ambiente Ambiente { get; set; }
    }
}