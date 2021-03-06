﻿using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    [AllowAnonymous]
    public class ValuesController : ApiController
    {        
        
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/name
        
        public IHttpActionResult Get(string name)
        {
            //name = "admin@mail.ru";
            var applicationDbContext = Request.GetOwinContext().Get<ApplicationDbContext>();

            var users = from user in applicationDbContext.Users
                        select new
                        {
                            user.Id,
                            user.UserName,
                            Roles = applicationDbContext.Roles.Where(r => user.Roles.Select(ur => ur.RoleId).Contains(r.Id)).Select(r => r.Name)
                        };
            users.ToList();

            var role = users.Where(r => r.UserName == name).Select(u => u.Roles).ToList();

            return Ok(role);
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
