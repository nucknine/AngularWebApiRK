using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;
using WebAPI.Models;

namespace APM.WebAPI.Models
{
    /// <summary>
    /// Stores the data in a json file so that no database is required for this
    /// sample application
    /// </summary>
    public class ManagementCompanyRepository
    {
        /// <summary>
        /// Creates a new managementCompany with default values
        /// </summary>
        /// <returns></returns>
        internal ManagementCompany ManagementCompanyCreate()
        {
            ManagementCompany managementCompany = new ManagementCompany
            {
                CreateDate = DateTime.Now
            };
            return managementCompany;
        }

        /// <summary>
        /// Retrieves the list of managementCompanies.
        /// </summary>
        /// <returns></returns>
        internal List<ManagementCompany> ManagementCompanyRetrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/companies.json");

            var json = System.IO.File.ReadAllText(filePath);

            var managementCompanies = JsonConvert.DeserializeObject<List<ManagementCompany>>(json);

            return managementCompanies;
        }

        /// <summary>
        /// Retrieves the list of managementCompany's Homes.
        /// </summary>
        /// <returns></returns>
        internal List<Home> ManagementCompanyRetrieve(int companyId)
        {
            var homeFilePath = HostingEnvironment.MapPath(@"~/App_Data/homes.json");
                                
            var homeJson = System.IO.File.ReadAllText(homeFilePath);

            var homes = JsonConvert.DeserializeObject<List<Home>>(homeJson);
            
            var companyHomes = homes.Where(p => p.ManagementCompanyId == companyId).ToList();
            
            return companyHomes;
        }

        /// <summary>
        /// Saves a new managementCompany.
        /// </summary>
        /// <param name="managementCompany"></param>
        /// <returns></returns>
        internal ManagementCompany ManagementCompanySave(ManagementCompany managementCompany)
        {
            // Read in the existing managementCompanies
            var managementCompanies = this.ManagementCompanyRetrieve();

            // Assign a new Id
            var maxId = managementCompanies.Max(p => p.ManagementCompanyId);
            managementCompany.ManagementCompanyId = maxId + 1;
            managementCompanies.Add(managementCompany);

            ManagementCompanyWriteData(managementCompanies);
            return managementCompany;
        }

        /// <summary>
        /// Updates an existing managementCompany
        /// </summary>
        /// <param name="id"></param>
        /// <param name="managementCompany"></param>
        /// <returns></returns>
        internal ManagementCompany Save(int id, ManagementCompany managementCompany)
        {
            // Read in the existing managementCompanies
            var managementCompanies = this.ManagementCompanyRetrieve();

            // Locate and replace the item
            var itemIndex = managementCompanies.FindIndex(p => p.ManagementCompanyId == managementCompany.ManagementCompanyId);
            if (itemIndex > 0)
            {
                managementCompanies[itemIndex] = managementCompany;
            }
            else
            {
                return null;
            }

            ManagementCompanyWriteData(managementCompanies);
            return managementCompany;
        }


        private bool ManagementCompanyWriteData(List<ManagementCompany> managementCompanies)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/managementCompanies.json");

            var json = JsonConvert.SerializeObject(managementCompanies, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

    }
}