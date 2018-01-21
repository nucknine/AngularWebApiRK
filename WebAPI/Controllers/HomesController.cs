using APM.WebAPI.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Security;
using WebAPI;
using WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class HomesController : ApiController
    {
        // GET: api/homes
        [EnableQuery()]
        [ResponseType(typeof(Home))]
        public IHttpActionResult Get()
        {
            try
            {
                var homeRepository = new HomeRepository();
                return Ok(homeRepository.Retrieve().AsQueryable());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: api/homes/5
        //[ResponseType(typeof(Home))]
        //[Authorize()]
        public IHttpActionResult Get(int id)
        {
            
            try
            {
                Home home;
                var homeRepository = new HomeRepository();

                if (id > 0)
                {
                    var homes = homeRepository.Retrieve();
                    home = homes.FirstOrDefault(p => p.HomeId == id);
                    if (home == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    home = homeRepository.Create();
                }
                return Ok(home);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }





        // POST: api/homes
        [ResponseType(typeof(Home))]
        public IHttpActionResult Post([FromBody]Home home)
        {
            try
            {
                if (home == null)
                {
                    return BadRequest("Home cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var homeRepository = new Models.HomeRepository();
                var newHome = homeRepository.Save(home);
                if (newHome == null)
                {
                    return Conflict();
                }
                return Created<Home>(Request.RequestUri + newHome.HomeId.ToString(),
                    newHome);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/homes/5
        public IHttpActionResult Put(int id, [FromBody]Home home)
        {
            try
            {
                if (home == null)
                {
                    return BadRequest("Home cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var homeRepository = new Models.HomeRepository();
                var updatedHome = homeRepository.Save(id, home);
                if (updatedHome == null)
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

        // DELETE: api/homes/5
        public void Delete(int id)
        {
        }
    }
}
