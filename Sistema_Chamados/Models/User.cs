using System.ComponentModel.DataAnnotations;

namespace Sistema_Chamados.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome de usuário é obrigatório")]
        public string Username { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Password { get; set; }

        [Required(ErrorMessage = "O nome completo é obrigatório")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A função é obrigatória")]
        public string Role { get; set; }

        [Required(ErrorMessage = "O setor é obrigatório")]
        public string Sector { get; set; }
    }
} 