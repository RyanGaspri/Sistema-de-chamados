using Microsoft.AspNetCore.Mvc;
using Sistema_Chamados.Models;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Sistema_Chamados.Controllers
{
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Substituir por consulta ao banco de dados
            var user = GetUserFromDatabase(request.Username, request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Credenciais inválidasGRG !" });
            }

            // TODO: Implementar geração de token JWT
            return Ok(new
            {
                user.Id,
                user.Name,
                user.Username,
                user.Email,
                user.Role,
                user.Sector
            });
        }

        [HttpPost]
        public IActionResult RecoverPassword([FromBody] PasswordRecoveryRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Substituir por consulta ao banco de dados
            var user = GetUserByEmail(request.Email);

            if (user == null)
            {
                return NotFound(new { message = "E-mail não encontrado" });
            }

            // TODO: Implementar envio de e-mail com instruções de recuperação
            return Ok(new { message = "Instruções de recuperação enviadas para seu e-mail" });
        }

        // Métodos temporários para simulação
        private User GetUserFromDatabase(string username, string password)
        {
            // TODO: Substituir por consulta ao banco de dados
            var mockUsers = new[]
            {
                new User { Id = 1, Username = "operador", Password = "op123", Name = "João Operador", Role = "operator", Sector = "Produção", Email = "joao@empresa.com" },
                new User { Id = 2, Username = "gestor", Password = "ges123", Name = "Maria Gestora", Role = "manager", Sector = "Gerência", Email = "maria@empresa.com" },
                new User { Id = 3, Username = "tecnico", Password = "tec123", Name = "Pedro Técnico", Role = "technician", Sector = "Automação", Email = "pedro@empresa.com" },
                new User { Id = 4, Username = "adm", Password = "adm123", Name = "Administrador", Role = "manager", Sector = "Administração", Email = "admin@empresa.com" }
            };

            return mockUsers.FirstOrDefault(u => u.Username == username && u.Password == password);
        }

        private User GetUserByEmail(string email)
        {
            // TODO: Substituir por consulta ao banco de dados
            var mockUsers = new[]
            {
                new User { Id = 1, Username = "operador", Password = "op123", Name = "João Operador", Role = "operator", Sector = "Produção", Email = "joao@empresa.com" },
                new User { Id = 2, Username = "gestor", Password = "ges123", Name = "Maria Gestora", Role = "manager", Sector = "Gerência", Email = "maria@empresa.com" },
                new User { Id = 3, Username = "tecnico", Password = "tec123", Name = "Pedro Técnico", Role = "technician", Sector = "Automação", Email = "pedro@empresa.com" },
                new User { Id = 4, Username = "adm", Password = "adm123", Name = "Administrador", Role = "manager", Sector = "Administração", Email = "admin@empresa.com" }
            };

            return mockUsers.FirstOrDefault(u => u.Email == email);
        }
    }

    public class LoginRequest
    {
        [Required(ErrorMessage = "O nome de usuário é obrigatório")]
        public string Username { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Password { get; set; }
    }

    public class PasswordRecoveryRequest
    {
        [Required(ErrorMessage = "O e-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }
    }
} 