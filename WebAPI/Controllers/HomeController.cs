using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {            
            return View();
            
        }

        public IList<string> GetRoles()
        {
            IList<string> roles = new List<string> { "Роль не определена" };

            ApplicationUserManager userManager = HttpContext.GetOwinContext()
                                                    .GetUserManager<ApplicationUserManager>();

            ApplicationUser user = userManager.FindByEmail(User.Identity.Name);

            if (user != null)
                roles = userManager.GetRoles(user.Id);

            return roles;
        }
    }
}
