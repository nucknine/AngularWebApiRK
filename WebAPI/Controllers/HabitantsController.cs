using APM.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using WebAPI.Models;

namespace APM.WebAPI.Controllers
{

    public class HabitantsController : ApiController
    {
        // GET: api/Habitants
        [EnableQuery()]
        [ResponseType(typeof(Habitant))]
        public IHttpActionResult Get()
        {
            try
            {
                var habitantRepository = new HabitantRepository();
                return Ok(habitantRepository.Retrieve().AsQueryable());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // GET: api/Habitants/email
        //[ResponseType(typeof(Habitant))]
        //public IHttpActionResult Get(string email)
        //{
        //    try
        //    {
        //        Habitant habitant;
        //        var habitantRepository = new HabitantRepository();

        //        var habitants = habitantRepository.Retrieve();
        //        habitant = habitants.FirstOrDefault(p => p.Email == email);
        //        if (habitant == null)
        //        {
        //            habitant = habitantRepository.Create();
        //        }
        //        return Ok(habitant);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}


        // GET: api/Habitants/5
        [ResponseType(typeof(Habitant))]        
        public IHttpActionResult Get(int id)
        {
            try
            {
                Habitant habitant;
                var habitantRepository = new HabitantRepository();

                if (id > 0)
                {
                    var habitants = habitantRepository.Retrieve();
                    habitant = habitants.FirstOrDefault(p => p.HabitantId == id);
                    if (habitant == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    habitant = habitantRepository.Create();
                }
                return Ok(habitant);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }





        // POST: api/Habitants
        [ResponseType(typeof(Habitant))]
        public IHttpActionResult Post([FromBody]Habitant habitant)
        {
            try
            {
                if (habitant == null)
                {
                    return BadRequest("Habitant cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var habitantRepository = new Models.HabitantRepository();
                var newHabitant = habitantRepository.Save(habitant);
                if (newHabitant == null)
                {
                    return Conflict();
                }
                return Created<Habitant>(Request.RequestUri + newHabitant.HabitantId.ToString(),
                    newHabitant);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Habitants/5
        public IHttpActionResult Put(int id, [FromBody]Habitant habitant)
        {
            try
            {
                if (habitant == null)
                {
                    return BadRequest("Habitant cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var habitantRepository = new Models.HabitantRepository();
                var updatedHabitant = habitantRepository.Save(id, habitant);
                if (updatedHabitant == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Habitants/5
        public void Delete(int id)
        {
        }
    }
}
