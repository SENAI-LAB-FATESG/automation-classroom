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
    public class AmbienteController : ControllerBase
    {
        private readonly AmbienteRepository _ambienteRepository;

        public AmbienteController(AmbienteRepository ambienteRepository)
        {
            _ambienteRepository = ambienteRepository;
        }

        // GET: api/Ambiente
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<Ambiente>> GetAmbiente()
        {
            return await _ambienteRepository.ResearchAll();
        }

        // GET: api/Ambiente/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Ambiente>> GetAmbiente(Guid id)
        {
            var ambiente = await _ambienteRepository.ResearchID(id);

            if (ambiente == null)
            {
                return NotFound();
            }

            return ambiente;
        }

        // PUT: api/Ambiente/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAmbiente(Guid id, Ambiente ambiente)
        {
            if (id != ambiente.Id)
            {
                return BadRequest();
            }

            await _ambienteRepository.Update(ambiente);

            return Accepted();
        }

        // POST: api/Ambiente
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ambiente>> PostAmbiente(Ambiente ambiente)
        {
            await _ambienteRepository.Create(ambiente);

            return CreatedAtAction("GetAmbiente", new { id = ambiente.Id }, ambiente);
        }

        // DELETE: api/Ambiente/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Ambiente>> DeleteAmbiente(Guid id)
        {
            var ambiente = await _ambienteRepository.ResearchID(id);

            if (ambiente == null)
            {
                return NotFound();
            }

            await _ambienteRepository.Delete(id);

            return ambiente;
        }

        private async Task<bool> AmbienteExists(Guid id)
        {
            return await _ambienteRepository.Exists(id);
        }
    }
}