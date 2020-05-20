using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Data;
using back_end.Domain;
using back_end.Services;
using Microsoft.AspNetCore.Authorization;
using Fare;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _repository;
        private readonly EmailSender _emailSender;

        public UserController(UserRepository userRepository)
        {
            _repository = userRepository;
        }

        // POST: api/User/login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] User model)
        {
            // Recupera o usuário
            var user = _repository.Get(model.Email, model.Password);

            // Verifica se o usuário existe
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            // Verifica se o e-mail já foi confirmado
            if (user.EmailConfirmed == false)
                return NotFound(new { message = "E-mail não confirmado" });

            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Oculta a senha
            user.Password = "";

            // Retorna os dados
            return new
            {
                user = user,
                token = token
            };
        }

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        // GET: api/User
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<User>> GetUser()
        {
            return await _repository.ResearchAll();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _repository.ResearchID(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            await _repository.Update(user);

            return Accepted();
        }

        // POST: api/User
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.EmailConfirmed = false;
            user.Token = Guid.NewGuid().ToString();
            await _repository.Create(user);

            string link = "http://localhost:4200/confirma-email?token=" + user.Token;

            string message = "Clique neste link para confirmar o e-mail: \n" + link;

            await new EmailSender().SendEmailAsync(user.Email, "Confirmação de e-mail", message);

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // GET: api/User/ConfirmEmail/5/XXX
        [HttpGet("ConfirmEmail/{token}")]
        public async Task<ActionResult<User>> ConfirmEmail(string token)
        {
            Console.Write(token);
            var user = _repository.ResearchToken(token);

            if (user == null)
            {
                return NotFound();
            }

            user.EmailConfirmed = true;
            user.Token = null;
            return await _repository.Update(user);
        }

        //GET: api/User/RecoverPassword/email
        [HttpGet("RecoverPassword/{email}")]
        public async Task<ActionResult<User>> RecoverPassword(string email)
        {
            var user = _repository.ResearchToken(email);

            if (email == user.Email)
            {
                const string Regex = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$";
                var xeger = new Xeger(Regex);
                var generatedString = xeger.Generate();

                string message = "Sua senha foi resetada para : \n" + generatedString + "\nTente logar novamente com essa credencial.";

                user.Password = generatedString;

                await new EmailSender().SendEmailAsync(user.Email, "Esqueci minha senha", message);

                return await _repository.Update(user);
            }
            else
                return NotFound();
        }

        //PUT: api/User/ChangePassword/id/XXX
        [HttpPut("ChangePassword/{id}/{password}")]
        [Authorize]
        public async Task<ActionResult<User>> ChangePassword(Guid id, string password)
        {
            var user = await _repository.ResearchID(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Password = password;

            return await _repository.Update(user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> DeleteUser(Guid id)
        {
            var user = await _repository.ResearchID(id);

            if (user == null)
            {
                return NotFound();
            }

            await _repository.Delete(id);

            return user;
        }

        private async Task<bool> UserExists(Guid id)
        {
            return await _repository.Exists(id);
        }
    }
}