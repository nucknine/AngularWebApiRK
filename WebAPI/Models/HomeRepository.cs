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
    public class HomeRepository
    {
        /// <summary>
        /// Creates a new product with default values
        /// </summary>
        /// <returns></returns>
        internal Home HomeCreate()
        {
            Home home = new Home
            {
                CreateDate = DateTime.Now
            };
            return home;
        }

        /// <summary>
        /// Retrieves the list of products.
        /// </summary>
        /// <returns></returns>
        internal List<Home> HomeRetrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/homes.json");

            var json = System.IO.File.ReadAllText(filePath);

            var homes = JsonConvert.DeserializeObject<List<Home>>(json);

            return homes;
        }

        /// <summary>
        /// Saves a new product.
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        internal Home HomeSave(Home home)
        {
            // Read in the existing products
            var homes = this.HomeRetrieve();

            // Assign a new Id
            var maxId = homes.Max(p => p.HomeId);
            home.HomeId = maxId + 1;
            homes.Add(home);

            HomeWriteData(homes);
            return home;
        }

        /// <summary>
        /// Updates an existing product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns></returns>
        internal Home Save(int id, Home home)
        {
            // Read in the existing products
            var homes = this.HomeRetrieve();

            // Locate and replace the item
            var itemIndex = homes.FindIndex(p => p.HomeId == home.HomeId);
            if (itemIndex > 0)
            {
                homes[itemIndex] = home;
            }
            else
            {
                return null;
            }

            HomeWriteData(homes);
            return home;
        }


        private bool HomeWriteData(List<Home> homes)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/homes.json");

            var json = JsonConvert.SerializeObject(homes, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

    }
}