using APM.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Security;
using WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    //[Authorize()]
    [EnableCorsAttribute("*", "*", "*")]
    public class ManagementCompaniesController : ApiController
    {

        [Route("GetRole")]
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole()
        {

            string[] rolesArray;
            var roles = new Role();
            
            //rolesArray = Roles.GetRolesForUser();
            //var role = rolesArray.FirstOrDefault().ToString();
            //var id = User.Identity.GetUserId();
            //var role = UserManager.GetRoles(id).ToString();

            return Ok(new Role
            {
                UserRole = "dssdds"
            });
        }

        // GET: api/ManagementCompanies

        [EnableQuery()]
        [ResponseType(typeof(ManagementCompany))]
        public IHttpActionResult Get()
        {
            try
            {
                var managementCompanyRepository = new ManagementCompanyRepository();
                return Ok(managementCompanyRepository.Retrieve().AsQueryable());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // GET: api/ManagementCompanies/5
        [ResponseType(typeof(ManagementCompany))]        
        public IHttpActionResult Get(int id)
        {
            try
            {
                ManagementCompany managementCompany;
                var managementCompanyRepository = new ManagementCompanyRepository();

                if (id > 0)
                {
                    var managementCompanys = managementCompanyRepository.Retrieve();
                    managementCompany = managementCompanys.FirstOrDefault(p => p.ManagementCompanyId == id);
                    if (managementCompany == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    managementCompany = managementCompanyRepository.Create();
                }
                return Ok(managementCompany);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // Get: api/ManagementCompanies/id/flag
        [ResponseType(typeof(List<Home>))]
        public IHttpActionResult Get(int id, bool flag)
        {
            
            try
            {
                var managementCompanyRepository = new ManagementCompanyRepository();

                var managementCompanies = managementCompanyRepository.Retrieve(id);

                if (managementCompanies == null)
                {
                    return NotFound();
                }

                return Ok(managementCompanies);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/ManagementCompanies
        [Authorize(Roles = "admin, company")]
        [ResponseType(typeof(ManagementCompany))]
        public IHttpActionResult Post([FromBody]ManagementCompany managementCompany)
        {
            try
            {
                if (managementCompany == null)
                {
                    return BadRequest("ManagementCompany cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var managementCompanyRepository = new Models.ManagementCompanyRepository();
                var newManagementCompany = managementCompanyRepository.Save(managementCompany);
                if (newManagementCompany == null)
                {
                    return Conflict();
                }
                return Created<ManagementCompany>(Request.RequestUri + newManagementCompany.ManagementCompanyId.ToString(),
                    newManagementCompany);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // PUT: api/ManagementCompanies/5
        [Authorize(Roles = "admin, company")]
        public IHttpActionResult Put(int id, [FromBody]ManagementCompany managementCompany)
        {
            try
            {
                if (managementCompany == null)
                {
                    return BadRequest("ManagementCompany cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var managementCompanyRepository = new Models.ManagementCompanyRepository();
                var updatedManagementCompany = managementCompanyRepository.Save(id, managementCompany);
                if (updatedManagementCompany == null)
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

        // DELETE: api/ManagementCompanies/5
        [Authorize(Roles = "admin")]
        public void Delete(int id)
        {
        }
    }
}
