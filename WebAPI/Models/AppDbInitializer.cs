using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using WebAPI;
using WebAPI.Models;

namespace RolesIdentityApp.Models

{
    public class AppDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            // создаем две роли
            var role1 = new IdentityRole { Name = "admin" };
            var role2 = new IdentityRole { Name = "user" };
            var role3 = new IdentityRole { Name = "company" };

            // добавляем роли в бд
            roleManager.Create(role1);
            roleManager.Create(role2);
            roleManager.Create(role3);

            // создаем пользователей
            var admin = new ApplicationUser { Email = "admin@mail.ru", UserName = "admin@mail.ru" };
            string password = "Admin@mail.ru1";
            var result = userManager.Create(admin, password);

            var habitant = new ApplicationUser { Email = "habitant@mail.ru", UserName = "habitant@mail.ru" };
            string habitantPassword = "Habitant@mail.ru1";
            var habitantResult = userManager.Create(habitant, habitantPassword);

            var company = new ApplicationUser { Email = "company@mail.ru", UserName = "company@mail.ru" };
            string companyPassword = "Company@mail.ru1";
            var companyResult = userManager.Create(company, companyPassword);

            // если создание пользователя прошло успешно
            if (result.Succeeded && companyResult.Succeeded && habitantResult.Succeeded)
            {
                // добавляем для пользователя роль
                userManager.AddToRole(admin.Id, role1.Name);                
                userManager.AddToRole(habitant.Id, role2.Name);
                userManager.AddToRole(company.Id, role3.Name);
            }

            base.Seed(context);
        }
    }
}